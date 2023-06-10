import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const feedbacks = {}

	const ColorWhite = combineRgb(255, 255, 255)
	const ColorBlack = combineRgb(0, 0, 0)
	const ColorRed = combineRgb(200, 0, 0)
	const ColorGreen = combineRgb(0, 200, 0)
	const ColorOrange = combineRgb(255, 102, 0)

	feedbacks.recordingState = {
		type: 'boolean',
		name: 'Recording State',
		defaultStyle: {
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'State',
				id: 'option',
				default: 'recording',
				choices: [
					{ id: 'Recording', label: 'Recording' },
					{ id: 'Ready', label: 'Ready' },
					{ id: 'Invalid', label: 'Invalid' },
					{ id: 'Not Ready', label: 'Not Ready' },
					{ id: 'Preparing', label: 'Preparing' },
					{ id: 'Offline', label: 'Offline' },
				],
			},
		],
		callback: (feedback) => {
			let opt = feedback.options

			if (this.data.recordingState === opt.option) {
				return true
			}

			return false
		},
	}

	feedbacks.streamingState = {
		type: 'boolean',
		name: 'Streaming State',
		defaultStyle: {
			bgcolor: ColorRed,
		},
		options: [
			{
				type: 'dropdown',
				label: 'State',
				id: 'option',
				default: 'broadcasting',
				choices: [
					{ id: 'Live', label: 'Live' },
					{ id: 'Ready', label: 'Ready' },
					{ id: 'Playing', label: 'Playing' },
					{ id: 'Invalid', label: 'Invalid' },
				],
			},
		],
		callback: (feedback) => {
			let opt = feedback.options

			if (this.data.streamingState === opt.option) {
				return true
			}

			return false
		},
	}

	return feedbacks
}
