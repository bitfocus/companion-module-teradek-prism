export function getActions() {
	let actions = {}

	actions.recordingControl = {
		name: 'Recording Control',
		options: [
			{
				type: 'dropdown',
				label: 'Command',
				id: 'command',
				default: 'start',
				choices: [
					{ id: 'start', label: 'Start' },
					{ id: 'stop', label: 'Stop' },
				],
			},
		],
		callback: (action) => {
			this.sendCommand(
				`${this.data?.mode === 'Low-Latency' ? this.prefix.recordLL : this.prefix.record}/${action.options.command}`,
				{},
			)
		},
	}

	actions.setRecordingName = {
		name: 'Set Recording Name',
		options: [
			{
				type: 'textinput',
				label: 'File Name',
				id: 'command',
			},
		],
		callback: (action) => {
			this.sendCommand(
				`${this.data?.mode === 'Low-Latency' ? this.prefix.recordLL : this.prefix.record}/RECUpload/set`,
				{ name: action.options.command },
			)
		},
	}

	actions.recordWithName = {
		name: 'Record With Name',
		options: [
			{
				type: 'textinput',
				label: 'File Name',
				id: 'command',
			},
		],
		callback: (action) => {
			this.sendCommand(
				`${this.data?.mode === 'Low-Latency' ? this.prefix.recordLL : this.prefix.record}/RECUpload/set`,
				{ name: action.options.command },
			)
			this.sendCommand(`${this.data?.mode === 'Low-Latency' ? this.prefix.recordLL : this.prefix.record}/start`, {})
		},
	}

	actions.setStreamingInfo = {
		name: 'Set RTMP Streaming Info',
		options: [
			{
				type: 'textinput',
				label: 'Stream Name',
				id: 'streamName',
			},
			{
				type: 'textinput',
				label: 'Username',
				id: 'username',
			},
			{
				type: 'textinput',
				label: 'Password',
				id: 'password',
			},
			{
				type: 'textinput',
				label: 'Stream URL',
				id: 'streamURL',
			},
			{
				type: 'textinput',
				label: 'Stream Key',
				id: 'streamKey',
			},
		],
		callback: (action) => {
			this.sendCommand(`${this.data?.mode === 'Low-Latency' ? this.prefix.streamLL : this.prefix.stream}/RTMP/set`, {
				password: action.options.password,
				channel_name: action.options.streamName,
				username: action.options.username,
				url: action.options.streamURL,
				stream: action.options.streamKey,
			})
		},
	}

	actions.streamingControl = {
		name: 'Streaming Control',
		options: [
			{
				type: 'dropdown',
				label: 'Command',
				id: 'command',
				default: 'publish',
				choices: [
					{ id: 'publish', label: 'Publish' },
					{ id: 'unpublish', label: 'Unpublish' },
					{ id: 'Sharelink/publish', label: 'Sharelink Publish' },
					{ id: 'Sharelink/unpublish', label: 'Sharelink Unpublish' },
					{ id: 'broadcast', label: 'Broadcast' },
					{ id: 'halt', label: 'Halt' },
					{ id: 'cancel', label: 'Cancel' },
					{ id: 'preview', label: 'Preview' },
					{ id: 'endpreview', label: 'End Preview' },
					{ id: 'complete', label: 'Complete' },
				],
			},
		],
		callback: (action) => {
			this.sendCommand(
				`${this.data?.mode === 'Low-Latency' ? this.prefix.streamLL : this.prefix.stream}/${action.options.command}`,
				{},
			)
		},
	}

	return actions
}
