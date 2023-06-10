export function getVariables() {
	const variables = []

	variables.push({ variableId: 'device_name', name: 'Device Name' })

	variables.push({ variableId: 'recording_state', name: 'Recording State' })
	variables.push({ variableId: 'recording_percent', name: 'Recording % Used' })
	variables.push({ variableId: 'recording_size', name: 'Recording Drive Size' })
	variables.push({ variableId: 'recording_used', name: 'Recording Drive Used' })
	variables.push({ variableId: 'recording_available', name: 'Recording Drive Available' })
	variables.push({ variableId: 'recording_uptime', name: 'Recording Uptime' })

	variables.push({ variableId: 'streaming_state', name: 'Streaming State' })
	variables.push({ variableId: 'streaming_uptime', name: 'Streaming Uptime' })

	return variables
}
