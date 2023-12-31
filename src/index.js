import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { getActions } from './actions.js'
import { getPresets } from './presets.js'
import { getVariables } from './variables.js'
import { getFeedbacks } from './feedbacks.js'

import mqtt from 'mqtt'

class TeradekPrismInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.mqttClient = null
		this.recPrefix = 'Session/0/Record'
		this.streamPrefix = 'Session/0/Stream/0'

		this.data = {
			deviceName: '',
			streaming: {},
			recording: { active: false },
			network: {},
			encoder: {},
			service: {},
		}
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Connecting)
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
				tooltip: 'If there is not a username field on your Prism device, the username of "admin" is still required.',
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

		this.updateStatus(InstanceStatus.Connecting)
		this.init(config)
	}

	async destroy() {
		if (this.mqttClient) {
			this.mqttClient.end()
		}
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

	initMqtt() {
		if (this.mqttClient) {
			this.mqttClient.end()
		}

		if (this.config.host) {
			const brokerUrl = `ws://${this.config.host}/mqtt`

			this.mqttClient = mqtt.connect(brokerUrl, {
				username: this.config.username,
				password: this.config.password,
			})

			this.mqttClient.on('connect', () => {
				this.updateStatus(InstanceStatus.Ok)

				this.initialSubscribe()
			})

			this.mqttClient.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure)
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
				this.updateStatus(InstanceStatus.Disconnected)
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
		//this.subscribeToTopic('#', '{}')

		let initialRequests = [
			'System/Product',
			this.recPrefix,
			`${this.recPrefix}/Info`,
			this.streamPrefix,
			`${this.streamPrefix}/Info`,
			`${this.streamPrefix}/RTMP`,
			`${this.streamPrefix}/Info/stream/stream_identity_0`,
			'Session/0/VideoEncoder',
			'Session/0/AudioEncoder',
			'Input/Video/Info',
			'Network/Info',
		]

		initialRequests.forEach((topic) => {
			this.subscribeToTopic(topic, '{}')
		})
	}

	handleMqttMessage(topic, message) {
		//console.log(topic)
		//console.log(message)
		try {
			message = JSON.parse(message)
			switch (topic) {
				case 'System/Product':
					this.data.deviceName = message.name
					this.setVariableValues({
						device_name: this.data.deviceName,
					})
					break
				case this.recPrefix:
					if (this.data.recording.active === false && message.mode !== 'Disabled') {
						this.data.recording.active = true
						this.initVariables()
						this.initPresets()
					} else {
						this.data.recording.active = false
						this.initVariables()
						this.initPresets()
					}
					break
				case this.recPrefix + '/Info':
					this.data.recording = {
						active: true,
						state: message.State,
						percentUsed: message['Percent Used'],
						size: message.Size,
						used: message.Used,
						available: message.Available,
						uptime: message.Uptime,
					}

					if (message['State Details']) {
						this.log('info', message['State Details'])
					}

					this.setVariableValues({
						recording_state: message.State,
						recording_percent: message['Percent Used'],
						recording_size: message.Size,
						recording_used: message.Used,
						recording_available: message.Available,
						recording_uptime: message.Uptime,
					})
					this.checkFeedbacks('recordingState')
					break
				case this.streamPrefix + '/Info':
					this.data.streaming = {
						state: message.State,
						uptime: message.Uptime,
					}

					if (message['State Details']) {
						this.log('info', message['State Details'])
					}

					this.setVariableValues({
						streaming_state: message.State,
						streaming_uptime: message.Uptime,
					})
					this.checkFeedbacks('streamingState')
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
						source: message.Source,
					}
					this.setVariableValues({
						input_format: message.Format,
						input_resolution: message.Resolution,
						input_framerate: message.Framerate,
						input_source: message.Source,
					})
					break
				case 'Network/Info':
					this.data.network = {
						interface: message['Interface Name'],
						ip: message['IP Address'],
						status: message.Status,
					}
					this.setVariableValues({
						network_interface: message['Interface Name'],
						network_ip: message['IP Address'],
						network_status: message.Status,
					})
					break
				case 'Session/0/Stream/0/Info/stream/stream_identity_0':
					let bitrate = message.Bitrate ? this.bitsToDisplayValue(message.Bitrate) : '0'

					this.data.encoder = {
						format: message.Format,
						profile: message.Profile,
						bitrate: bitrate,
						codec: message.Codec,
					}
					this.data.streaming.service = message.Codec === 'H.265' ? this.data.service.hevc : this.data.service.h264
					this.setVariableValues({
						encoder_format: message.Format,
						encoder_profile: message.Profile,
						encoder_bitrate: bitrate,
						encoder_codec: message.Codec,
						streaming_service: this.data.streaming.service,
					})
					break
				case 'Session/0/Stream/0':
					this.data.service = {
						hevc: message['mode-hevc'],
						h264: message['mode-h264'],
					}
					break

				case 'Session/0/Stream/0/RTMP':
					this.data.rtmp = {
						url: message.url,
						stream: message.stream,
					}
					this.setVariableValues({
						stream_url: message.url,
						stream_name: message.stream,
					})
					break
				default:
					//console.log(topic)
					//console.log(message)
					break
			}
		} catch (error) {
			this.log('debug', `Unable to parse incoming message from device: ${topic} - ${message}`)
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

		this.mqttClient.publish(topic, payload, { qos: qos, retain: retain }, (err) => {
			if (!err) {
				//this.log('debug', `${err}`)
				return
			}
		})
	}

	sendCommand(topic, payload) {
		topic = topic + '/' + new Date().valueOf().toString()

		this.subscribeToTopic(topic + '/+', {})
		this.publishMessage(topic, JSON.stringify(payload), 2, true)
	}

	bitsToDisplayValue(bits) {
		let precision = 2
		let removeUnitLabel = false

		let kilobits = 1000
		let megabits = kilobits * 1000
		let gigabits = megabits * 1000
		let terabits = gigabits * 1000

		if (bits >= 0 && bits < kilobits) {
			return removeUnitLabel ? bits : bits + ' bps'
		} else if (bits >= kilobits && bits < megabits) {
			return removeUnitLabel ? (bits / kilobits).toFixed(precision) : (bits / kilobits).toFixed(precision) + ' Kbps'
		} else if (bits >= megabits && bits < gigabits) {
			return removeUnitLabel ? (bits / megabits).toFixed(precision) : (bits / megabits).toFixed(precision) + ' Mbps'
		} else if (bits >= gigabits && bits < terabits) {
			return removeUnitLabel ? (bits / gigabits).toFixed(precision) : (bits / gigabits).toFixed(precision) + ' Gbps'
		} else if (bits >= terabits) {
			return removeUnitLabel ? (bits / gigabits).toFixed(precision) : (bits / gigabits).toFixed(precision) + ' Tbps'
		} else {
			return removeUnitLabel ? bits : bits + ' bps'
		}
	}
}

runEntrypoint(TeradekPrismInstance, [])
