module.exports = {
	// ##########################
	// #### Instance Actions ####
	// ##########################

	setActions: function (i) {
		let self = i;
		let actions = {};

		actions.recordingControl = {
			label: 'Recording Control',
			options: [
				{
					type: 'dropdown',
					label: 'Command',
					id: 'command',
					default: 'start',
					choices: [
						{ id: 'start', label: 'Start' },
						{ id: 'stop', label: 'Stop' }
					]
				}
			],
			callback: function (action, bank) {
				self.sendCommand(self.recPrefix + '/' + action.options.command, {});
			}
		};

		actions.setRecordingName = {
			label: 'Set Recording Name',
			options: [
				{
					type: 'textinput',
					label: 'File Name',
					id: 'command'
				}
			],
			callback: function (action, bank) {
				self.sendCommand(self.recPrefix + "/RECUpload/set", {"name": action.options.command});
			}
		};

		actions.recordWithName = {
			label: 'Record With Name',
			options: [
				{
					type: 'textinput',
					label: 'File Name',
					id: 'command'
				}
			],
			callback: function (action, bank) {
				self.sendCommand(self.recPrefix + "/RECUpload/set", {"name": action.options.command});
				self.sendCommand(self.recPrefix + '/start', {});
			}
		};

		actions.setStreamingInfo = {
			label: 'Set RTMP Streaming Info',
			options: [
				{
					type: 'textinput',
					label: 'Stream Name',
					id: 'streamName'
				},{
					type: 'textinput',
					label: 'Username',
					id: 'username'
				},{
					type: 'textinput',
					label: 'Password',
					id: 'password'
				},{
					type: 'textinput',
					label: 'Stream URL',
					id: 'streamURL'
				},{
					type: 'textinput',
					label: 'Stream Key',
					id: 'streamKey'
				},
			],
			callback: function (action, bank) {
				self.sendCommand(self.streamPrefix + "/RTMP/set", {"password": action.options.password,"channel_name": action.options.streamName,"username": action.options.username,"url":action.options.streamURL,"stream":action.options.streamKey});
			}
		};

		//Topic: System/Storage/Network/unmount/1655580712610
		//Message{"id":"nfs1655579335"}

		//Topic: System/Storage/Network/mount/1655580945848
		//Message{"host":"10.254.101.11","share":"C2C_Recordings/Test"}

		//Topic: Session/0/Record/RECUpload/set/1655581073949
		//Message{"drive_id":"nfs1655580944"}

		//Topic: Session/0/Stream/0/set/1655583009171
		//Message{"mode-h264":"RTMP"}

		//Topic: Session/0/Stream/0/RTMP/set/1655583262718
		//Message{"password":"test","channel_name":"hflabTest","username":"test","url":"rtmp://coevirtualevents.com:8835/liveTest","stream":"testTest"}
		


		actions.streamingControl = {
			label: 'Streaming Control',
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
						{ id: 'complete', label: 'Complete' }
					]
				}
			],
			callback: function (action, bank) {
				self.sendCommand(self.streamPrefix + '/' + action.options.command, {});
			}
		};

		return actions;
	}
}
