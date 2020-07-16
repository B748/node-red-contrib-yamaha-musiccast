module.exports = function (RED) {

	const http = require('http');

	function YamahaMusicCastPresetPlay(config) {
		RED.nodes.createNode(this, config, '');
		const node = this;

		// Retrieve the config node
		node.address = RED.nodes.getNode(config.device).address;

		node.on('input', function (msg) {
			const presetNo = msg.payload;

			http.get("http://" + node.address + "/YamahaExtendedControl/v1/" + "netusb/recallPreset?zone=main&num=" + presetNo,
				(resp) => {
					msg.payload = '';

					resp.on('data', (chunk) => {
						msg.payload += chunk;
					});

					resp.on('end', () => {
						msg.payload = JSON.parse(msg.payload).response_code;
						node.send(msg);
					})

				});

		});
	}

	RED.nodes.registerType("musiccast-preset-play", YamahaMusicCastPresetPlay);
}
