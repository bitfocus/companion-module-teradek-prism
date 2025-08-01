export function getVariables() {
	const variables = []

	variables.push({ variableId: 'device_name', name: 'Device Name' })

	if (this.data.recording.active) {
		variables.push({ variableId: 'recording_state', name: 'Recording State' })
		variables.push({ variableId: 'recording_percent', name: 'Recording % Used' })
		variables.push({ variableId: 'recording_size', name: 'Recording Drive Size' })
		variables.push({ variableId: 'recording_used', name: 'Recording Drive Used' })
		variables.push({ variableId: 'recording_available', name: 'Recording Drive Available' })
		variables.push({ variableId: 'recording_uptime', name: 'Recording Uptime' })
	}

	variables.push({ variableId: 'streaming_state', name: 'Streaming state' })
	variables.push({ variableId: 'streaming_uptime', name: 'Streaming uptime' })
	variables.push({ variableId: 'streaming_service', name: 'Streaming service' })
	variables.push({ variableId: 'stream_url', name: 'Stream URL' })
	variables.push({ variableId: 'stream_name', name: 'Stream name' })

	variables.push({ variableId: 'input_format', name: 'Video input format' })
	variables.push({ variableId: 'input_resolution', name: 'Video input resolution' })
	variables.push({ variableId: 'input_framerate', name: 'Video input framerate' })
	variables.push({ variableId: 'input_source', name: 'Video input source' })

	variables.push({ variableId: 'network_interface', name: 'Current network interface' })
	variables.push({ variableId: 'network_ip', name: 'Network IP address' })
	variables.push({ variableId: 'network_status', name: 'Network status' })

	variables.push({ variableId: 'encoder_mode', name: 'Encoder mode' })
	variables.push({ variableId: 'encoder_format', name: 'Encoder format' })
	variables.push({ variableId: 'encoder_profile', name: 'Encoder profile' })
	variables.push({ variableId: 'encoder_bitrate', name: 'Encoder bitrate' })
	variables.push({ variableId: 'encoder_codec', name: 'Encoder codec' })

	variables.push({ variableId: 'scte_splice_type', name: 'SCTE 35 Splice Type' })
	variables.push({ variableId: 'scte_pre_roll', name: 'SCTE 35 Pre Roll' })
	variables.push({ variableId: 'scte_event_id', name: 'SCTE 35 Event ID' })
	variables.push({ variableId: 'scte_network_event', name: 'SCTE 35 Network Event' })
	variables.push({ variableId: 'scte_break_duration', name: 'SCTE 35 Break Duration' })
	variables.push({ variableId: 'scte_program_id', name: 'SCTE 35 Program ID' })
	variables.push({ variableId: 'scte_avail_num', name: 'SCTE 35 Avail Num' })
	variables.push({ variableId: 'scte_avail_expect', name: 'SCTE 35 Avail Expected' })

	return variables
}
