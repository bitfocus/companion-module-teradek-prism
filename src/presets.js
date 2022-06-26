module.exports = {
	setPresets: function (i) {
		let self = i;
		let presets = [];

		const foregroundColor = self.rgb(255, 255, 255); // White
		const foregroundColorBlack = self.rgb(0, 0, 0); // Black
		const backgroundColorRed = self.rgb(255, 0, 0); // Red
		const backgroundColorGreen = self.rgb(0, 255, 0); // Green
		const backgroundColorYellow = self.rgb(255, 191, 0); // Yellow
		const backgroundColorOrange = self.rgb(255, 102, 0); // Orange
		const backgroundColorBlue = self.rgb(0, 0, 255); // Blue
		const backgroundColorGray = self.rgb(128, 128, 128); // Gray

		// ########################
		// #### System Presets ####
		// ########################

		presets.push({
			category: 'Recording',
			label: 'Recording Start',
			bank: {
				style: 'text',
				text: 'REC\\nSTART',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'recordingControl',
					options: {
						command: 'start'
					}
				}
			],
			feedbacks: [
				{
					type: 'recordingState',
					options: {
						option: 'Offline',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorBlue
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Ready',
					},
					style: {
						color: foregroundColorBlack,
						bgcolor: backgroundColorGreen
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Not Ready',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorGray
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Invalid',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorYellow
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Preparing',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorOrange
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Recording',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Recording',
			label: 'Recording Stop',
			bank: {
				style: 'text',
				text: 'REC\\nSTOP',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'recordingControl',
					options: {
						command: 'stop'
					}
				}
			],
			feedbacks: [
				{
					type: 'recordingState',
					options: {
						option: 'Offline',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorBlue
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Ready',
					},
					style: {
						color: foregroundColorBlack,
						bgcolor: backgroundColorGreen
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Not Ready',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorGray
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Invalid',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorYellow
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Preparing',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorOrange
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Recording',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Recording',
			label: 'Recording State',
			bank: {
				style: 'text',
				text: '$(teradek-vidiux:recording_state)',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			feedbacks: [
				{
					type: 'recordingState',
					options: {
						option: 'Offline',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorBlue
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Ready',
					},
					style: {
						color: foregroundColorBlack,
						bgcolor: backgroundColorGreen
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Not Ready',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorGray
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Invalid',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorYellow
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Preparing',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorOrange
					}
				},
				{
					type: 'recordingState',
					options: {
						option: 'Recording',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Recording',
			label: 'Recording Uptime',
			bank: {
				style: 'text',
				text: '$(teradek-vidiux:recording_uptime)',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			}
		});

		presets.push({
			category: 'Streaming',
			label: 'Streaming Start/Publish',
			bank: {
				style: 'text',
				text: 'STREAM\\nSTART',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'streamingControl',
					options: {
						command: 'publish'
					}
				}
			],
			feedbacks: [
				{
					type: 'streamingState',
					options: {
						option: 'Ready',
					},
					style: {
						color: foregroundColorBlack,
						bgcolor: backgroundColorGreen
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Invalid',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorYellow
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Playing',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorBlue
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Live',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Streaming',
			label: 'Streaming Stop/Unpublish',
			bank: {
				style: 'text',
				text: 'STREAM\\nSTOP',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			actions: [
				{
					action: 'streamingControl',
					options: {
						command: 'unpublish'
					}
				}
			],
			feedbacks: [
				{
					type: 'streamingState',
					options: {
						option: 'Ready',
					},
					style: {
						color: foregroundColorBlack,
						bgcolor: backgroundColorGreen
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Invalid',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorYellow
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Playing',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorBlue
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Live',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Streaming',
			label: 'Streaming State',
			bank: {
				style: 'text',
				text: '$(teradek-vidiux:streaming_state)',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			},
			feedbacks: [
				{
					type: 'streamingState',
					options: {
						option: 'Ready',
					},
					style: {
						color: foregroundColorBlack,
						bgcolor: backgroundColorGreen
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Invalid',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorYellow
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Playing',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorBlue
					}
				},
				{
					type: 'streamingState',
					options: {
						option: 'Live',
					},
					style: {
						color: foregroundColor,
						bgcolor: backgroundColorRed
					}
				}
			]
		});

		presets.push({
			category: 'Streaming',
			label: 'Streaming Uptime',
			bank: {
				style: 'text',
				text: '$(teradek-vidiux:streaming_uptime)',
				size: '14',
				color: '16777215',
				bgcolor: self.rgb(0, 0, 0),
			}
		});

		return presets;
	}
}
