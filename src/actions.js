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

	actions.setSCTE = {
		name: 'Set SCTE 35 Message Settings',
		options: [
			{
				type: 'multidropdown',
				label: 'Properties',
				id: 'properties',
				tooltip: 'Select properties to change. Properties not selected will be left at their existing values.',
				choices: [
					{ id: 'splice_type', label: 'Splice Type' },
					{ id: 'pre_roll', label: 'Pre-Roll' },
					{ id: 'event_id', label: 'Event ID (Hex)' },
					{ id: 'network_event', label: 'Network Event' },
					{ id: 'break_duration', label: 'Break Duration' },
					{ id: 'program_id', label: 'Unique Program ID' },
					{ id: 'avail_num', label: 'Available Num' },
					{ id: 'avail_expect', label: 'Avails Expected' },
				],
				default: ['break_duration'],
			},
			{
				type: 'dropdown',
				label: 'Splice Type',
				id: 'splice_type',
				min: 0,
				choices: [
					{ id: 'normal', label: 'Normal' },
					{ id: 'immediate', label: 'Immediate' },
				],
				default: 'normal',
				isVisibleExpression: 'arrayIncludes($(options:properties), "splice_type")',
			},
			{
				type: 'number',
				label: 'Pre-Roll (milliseconds)',
				id: 'pre_roll',
				min: 0,
				default: 0,
				isVisibleExpression: 'arrayIncludes($(options:properties), "pre_roll")',
			},
			{
				type: 'textinput',
				label: 'Event ID (Hex)',
				id: 'event_id',
				default: '',
				isVisibleExpression: 'arrayIncludes($(options:properties), "event_id")',
			},
			{
				type: 'dropdown',
				label: 'Network Event',
				id: 'network_event',
				min: 0,
				choices: [
					{ id: 'out-of-network', label: 'Out of Network' },
					{ id: 'return-to-network', label: 'Return to Network' },
				],
				default: 'out-of-network',
				isVisibleExpression: 'arrayIncludes($(options:properties), "network_event")',
			},
			{
				type: 'number',
				label: 'Break Duration (milliseconds)',
				id: 'break_duration',
				min: 0,
				default: 10000,
				isVisibleExpression: 'arrayIncludes($(options:properties), "break_duration")',
			},
			{
				type: 'number',
				label: 'Unique Program ID',
				id: 'program_id',
				min: 0,
				default: 0,
				isVisibleExpression: 'arrayIncludes($(options:properties), "program_id")',
			},
			{
				type: 'number',
				label: 'Available Num',
				id: 'avail_num',
				min: 0,
				default: 0,
				isVisibleExpression: 'arrayIncludes($(options:properties), "avail_num")',
			},
			{
				type: 'number',
				label: 'Available Expected',
				id: 'avail_expect',
				min: 0,
				default: 0,
				isVisibleExpression: 'arrayIncludes($(options:properties), "avail_expect")',
			},
		],
		callback: (action) => {
			const properties = {}
			if (action.options.properties?.includes('splice_type') && action.options.splice_type) {
				properties.splice_type = action.options.splice_type
			}
			if (action.options.properties?.includes('pre_roll') && action.options.pre_roll) {
				properties.pre_roll = action.options.pre_roll
			}
			if (action.options.properties.includes('event_id') && action.options.event_id) {
				properties.event_id = action.options.event_id
			}
			if (action.options.properties?.includes('network_event') && action.options.network_event) {
				properties.network_event = action.options.network_event
			}
			if (action.options.properties?.includes('break_duration') && action.options.break_duration) {
				properties.break_duration = action.options.break_duration
			}
			if (action.options.properties?.includes('program_id') && action.options.program_id) {
				properties.program_id = action.options.program_id
			}
			if (action.options.properties?.includes('avail_num') && action.options.avail_num) {
				properties.avail_num = action.options.avail_num
			}
			if (action.options.properties?.includes('avail_expect') && action.options.avail_expect) {
				properties.avail_expect = action.options.avail_expect
			}
			if (Object.keys(properties).length === 0) {
				this.log('error', 'No properties selected for SCTE message')
				return
			}
			this.sendCommand(`SessionLL/VideoEncoders/0/Metadata/set`, properties)
		},
	}

	actions.sendSCTE = {
		name: 'Send SCTE 35 Message',
		options: [],
		callback: () => {
			this.sendCommand(`SessionLL/VideoEncoders/0/Metadata/send`, {})
		},
	}

	return actions
}
