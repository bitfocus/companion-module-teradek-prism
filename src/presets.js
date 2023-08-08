import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const ColorWhite = combineRgb(255, 255, 255)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)
	const ColorYellow = combineRgb(255, 191, 0)
	const ColorBlue = combineRgb(64, 64, 255)
	const ColorGray = combineRgb(110, 110, 110)

	let presets = {}

	//Recording Presets

	if (this.data.recording.active) {
		presets.recordingStart = {
			type: 'button',
			category: 'Recording',
			name: 'Recording Start',
			options: {},
			style: {
				text: 'REC\\nSTART',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'recordingControl',
							options: {
								command: 'start',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Offline',
					},
					style: {
						bgcolor: ColorBlue,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Ready',
					},
					style: {
						bgcolor: ColorGreen,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Not Ready',
					},
					style: {
						bgcolor: ColorGray,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Invalid',
					},
					style: {
						bgcolor: ColorYellow,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Preparing',
					},
					style: {
						bgcolor: ColorOrange,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Recording',
					},
					style: {
						bgcolor: ColorRed,
					},
				},
			],
		}

		presets.recordingStop = {
			type: 'button',
			category: 'Recording',
			name: 'Recording Stop',
			options: {},
			style: {
				text: 'REC\\nSTOP',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [
						{
							actionId: 'recordingControl',
							options: {
								command: 'stop',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Offline',
					},
					style: {
						bgcolor: ColorBlue,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Ready',
					},
					style: {
						bgcolor: ColorGreen,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Not Ready',
					},
					style: {
						bgcolor: ColorGray,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Invalid',
					},
					style: {
						bgcolor: ColorYellow,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Preparing',
					},
					style: {
						bgcolor: ColorOrange,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Recording',
					},
					style: {
						bgcolor: ColorRed,
					},
				},
			],
		}

		presets.recordingState = {
			type: 'button',
			category: 'Recording',
			name: 'Recording State',
			options: {},
			style: {
				text: '$(teradek-prism:recording_state)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Offline',
					},
					style: {
						bgcolor: ColorBlue,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Ready',
					},
					style: {
						bgcolor: ColorGreen,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Not Ready',
					},
					style: {
						bgcolor: ColorGray,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Invalid',
					},
					style: {
						bgcolor: ColorYellow,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Preparing',
					},
					style: {
						bgcolor: ColorOrange,
					},
				},
				{
					feedbackId: 'recordingState',
					options: {
						option: 'Recording',
					},
					style: {
						bgcolor: ColorRed,
					},
				},
			],
		}

		presets.recordingUptime = {
			type: 'button',
			category: 'Recording',
			name: 'Recording Uptime',
			options: {},
			style: {
				text: '$(teradek-prism:recording_uptime)',
				size: '14',
				color: ColorWhite,
				bgcolor: ColorBlack,
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	//Streaming Presets

	presets.streamingStart = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming Start/Publish',
		options: {},
		style: {
			text: 'START\\nSTREAM',
			size: '14',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'streamingControl',
						options: {
							command: 'publish',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets.streamingStop = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming Stop/Unpublish',
		options: {},
		style: {
			text: 'STOP\\nSTREAM',
			size: '14',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'streamingControl',
						options: {
							command: 'unpublish',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets.streamingState = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming State',
		options: {},
		style: {
			text: '$(teradek-prism:streaming_state)',
			size: '14',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Ready',
				},
				style: {
					bgcolor: ColorGreen,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Invalid',
				},
				style: {
					bgcolor: ColorYellow,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Playing',
				},
				style: {
					bgcolor: ColorBlue,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Live',
				},
				style: {
					bgcolor: ColorRed,
				},
			},
		],
	}

	presets.streamingUptime = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming Uptime',
		options: {},
		style: {
			text: '$(teradek-prism:streaming_uptime)',
			size: 'auto',
			color: ColorWhite,
			bgcolor: ColorBlack,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	return presets
}
