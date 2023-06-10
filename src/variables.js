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

	variables.push({ variableId: 'input_format', name: 'Video input format' })
	variables.push({ variableId: 'input_resolution', name: 'Video input resolution' })
	variables.push({ variableId: 'input_framerate', name: 'Video input framerate' })

	variables.push({ variableId: 'network_interface', name: 'Current network interface' })
	variables.push({ variableId: 'network_ip', name: 'Network IP address' })
	variables.push({ variableId: 'network_status', name: 'Network status' })

	return variables
}
