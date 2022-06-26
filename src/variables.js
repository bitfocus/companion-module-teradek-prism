module.exports = {
	// ##########################
	// #### Define Variables ####
	// ##########################
	setVariables: function (i) {
		let self = i;
		let variables = [];

		variables.push({ name: 'device_name', label: 'Device Name' });

		variables.push({ name: 'recording_state', label: 'Recording State' });
		variables.push({ name: 'recording_percent', label: 'Recording % Used' });
		variables.push({ name: 'recording_size', label: 'Recording Drive Size' });
		variables.push({ name: 'recording_used', label: 'Recording Drive Used' });
		variables.push({ name: 'recording_available', label: 'Recording Drive Available' });
		variables.push({ name: 'recording_uptime', label: 'Recording Uptime' });

		variables.push({ name: 'streaming_state', label: 'Streaming State' });
		variables.push({ name: 'streaming_uptime', label: 'Streaming Uptime' });

		return variables;
	},

	// #########################
	// #### Check Variables ####
	// #########################
	checkVariables: function (i) {
		try {
			let self = i;

			self.setVariable('device_name', self.data.deviceName);

			self.setVariable('recording_state', self.data.recordingState);
			self.setVariable('recording_percent', self.data.recordingPercentUsed);
			self.setVariable('recording_size', self.data.recordingSize);
			self.setVariable('recording_used', self.data.recordingUsed);
			self.setVariable('recording_available', self.data.recordingAvailable);
			self.setVariable('recording_uptime', self.data.recordingUptime);

			self.setVariable('streaming_state', self.data.streamingState);
			self.setVariable('streaming_uptime', self.data.streamingUptime);
		}
		catch(error) {
			self.log('error', 'Error parsing Variables: ' + String(error));
		}
	}
}
