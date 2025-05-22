import { combineRgb } from '@companion-module/base'

export function getFeedbacks() {
	const feedbacks = {}

	const ColorRed = combineRgb(200, 0, 0)

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
				default: 'Recording',
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

			if (this.data?.recording?.state === opt.option) {
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
				default: 'Live',
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

			if (this.data?.streaming?.state === opt.option) {
				return true
			}

			return false
		},
	}

	return feedbacks
}
