module.exports = function (RED) {

	const http = require('http');

	function YamahaMusicCastFeatures(config) {
		RED.nodes.createNode(this, config, '');
		const node = this;

		// Retrieve the config node
		node.address = RED.nodes.getNode(config.device).address;

		node.on('input', function (msg) {
			http.get("http://" + node.address + "/YamahaExtendedControl/v1/" + "system/getFeatures",
				(resp) => {
					msg.payload = '';

					resp.on('data', (chunk) => {
						msg.payload += chunk;
					});

					resp.on('end', () => {
						msg.payload = JSON.parse(msg.payload);
						node.send(msg);
					})

				});

		});
	}

	RED.nodes.registerType("musiccast-features", YamahaMusicCastFeatures);
}
