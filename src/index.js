var instance_skel = require('../../../instance_skel');
var actions = require('./actions.js');
var presets = require('./presets.js');
var feedbacks = require('./feedbacks.js');
var variables = require('./variables.js');

const mqtt = require('mqtt');

var debug;

instance.prototype.mqttClient = null;

instance.prototype.recPrefix = 'Session/0/Record';
instance.prototype.streamPrefix = 'Session/0/Stream/0';

instance.prototype.data = {
	deviceName: '',
	recordingState: 'Unknown',
	recordingPercentUsed: 'Unknown %',
	recordingSize: 'Unknown G',
	recordingUsed: 'Unknown G',
	recordingAvailable: 'Unknown G',
	recordingUptime: '00:00:00',
	streamingState: 'Unknown',
	streamingUptime: '00:00:00'
};

// ########################
// #### Instance setup ####
// ########################
function instance(system, id, config) {
	let self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	return self;
};

instance.GetUpgradeScripts = function () {
};

// When module gets deleted
instance.prototype.destroy = function () {
	let self = this;

	self.mqttClient.end();

	debug('destroy', self.id);
}

// Initalize module
instance.prototype.init = function () {
	var self = this;

	debug = self.debug;
	log = self.log;

	self.status(self.STATUS_WARNING, 'connecting');
	self.init_mqtt();
	self.actions(); // export actions
	self.init_presets();
	self.init_variables();
	self.checkVariables();
	self.init_feedbacks();
	self.checkFeedbacks();
}

// Update module after a config change
instance.prototype.updateConfig = function (config) {
	var self = this;
	self.config = config;
	self.status(self.STATUS_UNKNOWN);
	self.init_mqtt();
	self.actions(); // export actions
	self.init_presets();
	self.init_variables();
	self.checkVariables();
	self.init_feedbacks();
	self.checkFeedbacks();
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;

	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls the Teradek Prism Flex.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'IP Address',
			width: 4,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'username',
			label: 'Username',
			default: 'admin',
			width: 4
		},
		{
			type: 'textinput',
			id: 'password',
			label: 'Password',
			default: 'admin',
			width: 4
		}
	]
}

instance.prototype.init_mqtt = function () {
	let self = this;

	if (self.config.host) {
		const brokerUrl = `ws://${self.config.host}/mqtt`;

		self.mqttClient = mqtt.connect(brokerUrl, {
			username: self.config.username,
			password: self.config.password,
		});
	
		self.mqttClient.on('connect', () => {
			self.status(self.STATUS_OK);
	
			self.initialSubscribe();
		});
	
		self.mqttClient.on('error', (err) => {
			self.status(self.STATUS_ERROR);
			let showSpecific = false;
			Object.keys(err).forEach(function(key) {
				if (key === 'code') {
					if (err[key] === 'ECONNREFUSED') {
						self.log('error', 'Connection refused. Is this the right IP address?');
						showSpecific = true;
					}
				}
			});

			if (!showSpecific) {
				self.log('error', err.toString());
			}

			self.mqttClient.end();
		});
	
		self.mqttClient.on('offline', () => {
			self.status(self.STATUS_WARNING, 'Offline');
		});
	
		self.mqttClient.on('message', (topic, message) => {
			try {
				if (topic) {
					self.handleMqttMessage(topic, message ? message.toString() : '');
					console.log("Topic: " + topic.toString());
					console.log("Message" + message.toString());
				}
			} catch (e) {
				self.log('error', `Handle message failed: ${e.toString()}`);
			}
		});
	}	
};

instance.prototype.initialSubscribe = function() {
	let self = this;

	//self.subscribeToTopic('#', '{}');
	self.subscribeToTopic('System/Product', '{}');
	self.subscribeToTopic(self.recPrefix + '/Info', '{}');
	self.subscribeToTopic(self.streamPrefix + '/Info', '{}');
};

instance.prototype.handleMqttMessage = function (topic, message) {
	let self = this;

	try{
		message = JSON.parse(message);

		switch(topic) {
			case 'System/Product':
				self.data.deviceName = message['name'];
				break;
			case self.recPrefix + '/Info':
				self.data.recordingState = message['State'];
				self.data.recordingPercentUsed = message['Percent Used'];
				self.data.recordingSize = message['Size'];
				self.data.recordingUsed = message['Used'];
				self.data.recordingAvailable = message['Available'];
				self.data.recordingUptime = message['Uptime'];
				if (message['State Details']) {
					self.log('info', message['State Details']);
				}
				break;
			case self.streamPrefix + '/Info':
				self.data.streamingState = message['State'];
				self.data.streamingUptime = message['Uptime'];
				if (message['State Details']) {
					self.log('info', message['State Details']);
				}
				break;
			default:
				break;
		}
	
		self.checkFeedbacks();
		self.checkVariables();
	}
	catch(error) {
		self.log('error', `Unable to parse incoming message from device.`);
	}
};

instance.prototype.subscribeToTopic = function(topic, data) {
	let self = this;

	self.mqttClient.subscribe(topic, (err) => {
		if (!err) {
			self.debug(`Successfully subscribed to topic: ${topic}`);
			return;
		}

		self.debug(`Failed to subscribe to topic: ${topic}. Error: ${err}`);
	});
};

instance.prototype.publishMessage = function(topic, payload, qos, retain) {
	let self = this;

	self.debug('Sending MQTT message', [topic, payload]);
	console.log('Sending MQTT message', [topic, payload]);

	self.mqttClient.publish(topic, payload, { qos: qos, retain: retain }, function(err) {
		//console.log(err);
	});
};


// ##########################
// #### Instance Presets ####
// ##########################
instance.prototype.init_presets = function () {
	this.setPresetDefinitions(presets.setPresets(this));
};

// ############################
// #### Instance Variables ####
// ############################
instance.prototype.init_variables = function () {
	this.setVariableDefinitions(variables.setVariables(this));
};

// Setup Initial Values
instance.prototype.checkVariables = function () {
	variables.checkVariables(this);
};

// ############################
// #### Instance Feedbacks ####
// ############################
instance.prototype.init_feedbacks = function (system) {
	this.setFeedbackDefinitions(feedbacks.setFeedbacks(this));
};

// ##########################
// #### Instance Actions ####
// ##########################
instance.prototype.sendCommand = function (topic, payload) {
	let self = this;

	topic = topic + '/' + (new Date()).valueOf().toString();

	self.subscribeToTopic(topic + '/+', {});
	self.publishMessage(topic, JSON.stringify(payload), 2, true);
};

instance.prototype.actions = function (system) {
	this.setActions(actions.setActions(this));
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
