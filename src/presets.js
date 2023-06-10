import { combineRgb } from '@companion-module/base'

export function getPresets() {
	const foregroundColor = combineRgb(255, 255, 255) // White
	const foregroundColorBlack = combineRgb(0, 0, 0) // Black
	const backgroundColorRed = combineRgb(255, 0, 0) // Red
	const backgroundColorGreen = combineRgb(0, 255, 0) // Green
	const backgroundColorYellow = combineRgb(255, 191, 0) // Yellow
	const backgroundColorOrange = combineRgb(255, 102, 0) // Orange
	const backgroundColorBlue = combineRgb(0, 0, 255) // Blue
	const backgroundColorGray = combineRgb(128, 128, 128) // Gray

	let presets = {}

	presets.recordingStart = {
		type: 'button',
		category: 'Recording',
		name: 'Recording Start',
		options: {},
		style: {
			text: 'REC\\nSTART',
			size: '14',
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
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
					color: foregroundColor,
					bgcolor: backgroundColorBlue,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Ready',
				},
				style: {
					color: foregroundColorBlack,
					bgcolor: backgroundColorGreen,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Not Ready',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorGray,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Invalid',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorYellow,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Preparing',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorOrange,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Recording',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
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
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
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
					color: foregroundColor,
					bgcolor: backgroundColorBlue,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Ready',
				},
				style: {
					color: foregroundColorBlack,
					bgcolor: backgroundColorGreen,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Not Ready',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorGray,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Invalid',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorYellow,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Preparing',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorOrange,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Recording',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
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
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
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
					color: foregroundColor,
					bgcolor: backgroundColorBlue,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Ready',
				},
				style: {
					color: foregroundColorBlack,
					bgcolor: backgroundColorGreen,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Not Ready',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorGray,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Invalid',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorYellow,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Preparing',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorOrange,
				},
			},
			{
				feedbackId: 'recordingState',
				options: {
					option: 'Recording',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
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
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets.streamingStart = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming Start/Publish',
		options: {},
		style: {
			text: 'STREAM\\nSTART',
			size: '14',
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
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
		feedbacks: [
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Ready',
				},
				style: {
					color: foregroundColorBlack,
					bgcolor: backgroundColorGreen,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Invalid',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorYellow,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Playing',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorBlue,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Live',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
			},
		],
	}

	presets.streamingStop = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming Stop/Unpublish',
		options: {},
		style: {
			text: 'STREAM\\nSTOP',
			size: '14',
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
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
		feedbacks: [
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Ready',
				},
				style: {
					color: foregroundColorBlack,
					bgcolor: backgroundColorGreen,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Invalid',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorYellow,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Playing',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorBlue,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Live',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
				},
			},
		],
	}

	presets.streamingState = {
		type: 'button',
		category: 'Streaming',
		name: 'Streaming State',
		options: {},
		style: {
			text: '$(teradek-prism:streaming_state)',
			size: '14',
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
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
					color: foregroundColorBlack,
					bgcolor: backgroundColorGreen,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Invalid',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorYellow,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Playing',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorBlue,
				},
			},
			{
				feedbackId: 'streamingState',
				options: {
					option: 'Live',
				},
				style: {
					color: foregroundColor,
					bgcolor: backgroundColorRed,
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
			size: '14',
			color: '16777215',
			bgcolor: combineRgb(0, 0, 0),
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
