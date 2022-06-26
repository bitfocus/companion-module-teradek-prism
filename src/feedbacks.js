module.exports = {
	// ##########################
	// #### Define Feedbacks ####
	// ##########################
	setFeedbacks: function (i) {
		let self = i;
		let feedbacks = {};

		const foregroundColor = self.rgb(255, 255, 255); // White
		const foregroundColorBlack = self.rgb(0, 0, 0); // Black
		const backgroundColorRed = self.rgb(255, 0, 0); // Red
		const backgroundColorGreen = self.rgb(0, 255, 0); // Green
		const backgroundColorOrange = self.rgb(255, 102, 0); // Orange
		const backgroundColorBlue = self.rgb(0, 0, 255); // Blue
		const backgroundColorGray = self.rgb(128, 128, 128); // Gray

		
		feedbacks.recordingState = {
			type: 'boolean',
			label: 'Recording',
			description: 'Indicate Device Recording State',
			style: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'option',
					default: 'recording',
					choices: [
						{ id: 'Recording', label: 'Recording' },
						{ id: 'Ready', label: 'Ready' },
						{ id: 'Invalid', label: 'Invalid' },
						{ id: 'Not Ready', label: 'Not Ready' },
						{ id: 'Preparing', label: 'Preparing' },
						{ id: 'Offline', label: 'Offline' }
					],
				},
			],
			callback: function (feedback, bank) {
				var opt = feedback.options

				if (self.data.recordingState === opt.option) {
					return true;
				}

				return false;
			}
		};

		feedbacks.streamingState = {
			type: 'boolean',
			label: 'Streaming',
			description: 'Indicate Device Streaming State',
			style: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X State',
					id: 'option',
					default: 'broadcasting',
					choices: [
						{ id: 'Live', label: 'Live' },
						{ id: 'Ready', label: 'Ready' },
						{ id: 'Playing', label: 'Playing' },
						{ id: 'Invalid', label: 'Invalid' }
					],
				},
			],
			callback: function (feedback, bank) {
				var opt = feedback.options

				if (self.data.streamingState === opt.option) {
					return true;
				}

				return false;
			}
		};

		return feedbacks;
	}
}
