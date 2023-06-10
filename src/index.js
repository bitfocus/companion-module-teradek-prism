import { InstanceBase, Regex, runEntrypoint } from '@companion-module/base'
import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { getVariables } from './variables.js'
import { getFeedbacks } from './feedbacks.js'

import * as mqtt from 'mqtt'

class TeradekPrismInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.mqttClient = null
		this.recPrefix = 'Session/0/Record'
		this.streamPrefix = 'Session/0/Stream/0'

		this.data = {
			deviceName: '',
			recordingState: 'Unknown',
			recordingPercentUsed: 'Unknown %',
			recordingSize: 'Unknown G',
			recordingUsed: 'Unknown G',
			recordingAvailable: 'Unknown G',
			recordingUptime: '00:00:00',
			streamingState: 'Unknown',
			streamingUptime: '00:00:00',
		}
	}

	async init(config) {
		this.config = config

		this.updateStatus('connecting')
		this.initMqtt()

		this.initActions()
		this.initPresets()
		this.initVariables()
		this.initFeedbacks()
	}

	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls the Teradek Prism and Prism Flex.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 4,
				regex: this.REGEX_IP,
			},
			{
				type: 'textinput',
				id: 'username',
				label: 'Username',
				default: 'admin',
				width: 4,
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				default: 'admin',
				width: 4,
			},
		]
	}

	async configUpdated(config) {
		this.config = config

		this.updateStatus('connecting')
		this.init(config)
	}

	async destroy() {
		this.mqttClient.end()
	}

	initVariables() {
		const variables = getVariables.bind(this)()
		this.setVariableDefinitions(variables)
	}

	initFeedbacks() {
		const feedbacks = getFeedbacks.bind(this)()
		this.setFeedbackDefinitions(feedbacks)
	}

	initPresets() {
		const presets = getPresets.bind(this)()
		this.setPresetDefinitions(presets)
	}

	initActions() {
		const actions = getActions.bind(this)()
		this.setActionDefinitions(actions)
	}

	checkVariables() {
		this.setVariableValues({
			device_name: this.data.deviceName,
			recording_state: this.data.recordingState,
			recording_percent: this.data.recordingPercentUsed,
			recording_size: this.data.recordingSize,
			recording_used: this.data.recordingUsed,
			recording_available: this.data.recordingAvailable,
			recording_uptime: this.data.recordingUptime,
			streaming_state: this.data.streamingState,
			streaming_uptime: this.data.streamingUptime,
		})
	}

	initMqtt() {
		if (this.config.host) {
			const brokerUrl = `ws://${this.config.host}/mqtt`

			this.mqttClient = mqtt.connect(brokerUrl, {
				username: this.config.username,
				password: this.config.password,
			})

			this.mqttClient.on('connect', () => {
				this.updateStatus('ok')

				this.initialSubscribe()
			})

			this.mqttClient.on('error', (err) => {
				this.updateStatus('connection_failure')
				let showSpecific = false
				Object.keys(err).forEach(function (key) {
					if (key === 'code') {
						if (err[key] === 'ECONNREFUSED') {
							this.log('error', 'Connection refused. Is this the right IP address?')
							showSpecific = true
						}
					}
				})

				if (!showSpecific) {
					this.log('error', err.toString())
				}

				this.mqttClient.end()
			})

			this.mqttClient.on('offline', () => {
				this.updateStatus('disconnected')
			})

			this.mqttClient.on('message', (topic, message) => {
				try {
					if (topic) {
						this.handleMqttMessage(topic, message ? message.toString() : '')
						//console.log('Topic: ' + topic.toString())
						//console.log('Message' + message.toString())
					}
				} catch (e) {
					this.log('error', `Handle message failed: ${e.toString()}`)
				}
			})
		}
	}

	initialSubscribe() {
		//this.subscribeToTopic('#', '{}');
		this.subscribeToTopic('System/Product', '{}')
		this.subscribeToTopic(this.recPrefix + '/Info', '{}')
		this.subscribeToTopic(this.streamPrefix + '/Info', '{}')
		this.subscribeToTopic('Session/0/VideoEncoder', '{}')
		this.subscribeToTopic('Session/0/AudioEncoder', '{}')
		this.subscribeToTopic('Input/Video/Info', '{}')
		this.subscribeToTopic('Network/Info', '{}')
		this.subscribeToTopic('Session/0/Stream/0/Info/stream/0', '{}')
	}

	handleMqttMessage(topic, message) {
		try {
			message = JSON.parse(message)
			switch (topic) {
				case 'System/Product':
					this.data.deviceName = message.name
					break
				case this.recPrefix + '/Info':
					this.data.recordingState = message['State']
					this.data.recordingPercentUsed = message['Percent Used']
					this.data.recordingSize = message['Size']
					this.data.recordingUsed = message['Used']
					this.data.recordingAvailable = message['Available']
					this.data.recordingUptime = message['Uptime']
					if (message['State Details']) {
						this.log('info', message['State Details'])
					}
					break
				case this.streamPrefix + '/Info':
					this.data.streamingState = message['State']
					this.data.streamingUptime = message['Uptime']
					if (message['State Details']) {
						this.log('info', message['State Details'])
					}
					break
				case 'Session/0/VideoEncoder':
					break
				case 'Session/0/AudioEncoder':
					break
				case 'Input/Video/Info':
					this.data.inputVideo = {
						format: message.Format,
						resolution: message.Resolution,
						framerate: message.Framerate,
					}
					this.setVariableValues({
						input_format: message.Format,
						input_resolution: message.Resolution,
						input_framerate: message.Framerate,
					})
					break
				case 'Network/Info':
					console.log(message)
					this.data.network = {
						networkInterface: message['Interface Name'],
						networkIp: message['IP Address'],
						networkStatus: message.Status,
					}
					this.setVariableValues({
						network_interface: message['Interface Name'],
						network_ip: message['IP Address'],
						network_status: message.Status,
					})
					break
				case 'Session/0/Stream/0/Info/stream/0':
					//console.log(message)
					break
				default:
					console.log(message)
					break
			}

			this.checkFeedbacks()
			this.checkVariables()
		} catch (error) {
			this.log('debug', `Unable to parse incoming message from device.`)
		}
	}

	subscribeToTopic(topic, data) {
		this.mqttClient.subscribe(topic, (err) => {
			if (!err) {
				this.log('debug', `Successfully subscribed to topic: ${topic}`)
				return
			}

			this.log('debug', `Failed to subscribe to topic: ${topic}. Error: ${err}`)
		})
	}

	publishMessage(topic, payload, qos, retain) {
		this.log('debug', 'Sending MQTT message', [topic, payload])

		this.mqttClient.publish(topic, payload, { qos: qos, retain: retain }, function (err) {
			this.log('debug', err)
		})
	}

	sendCommand(topic, payload) {
		topic = topic + '/' + new Date().valueOf().toString()

		this.subscribeToTopic(topic + '/+', {})
		this.publishMessage(topic, JSON.stringify(payload), 2, true)
	}
}

runEntrypoint(TeradekPrismInstance, [])
