module.exports = function (RED) {

	const http = require('http');

	function YamahaMusicCastPower(config) {
		RED.nodes.createNode(this, config, '');
		const node = this;

		// Retrieve the config node
		node.address = RED.nodes.getNode(config.device).address;

		node.on('input', function (msg) {
			const power = msg.payload ? "on" : "standby";

			http.get("http://" + node.address + "/YamahaExtendedControl/v1/" + "main/setPower?power=" + power,
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

	RED.nodes.registerType("musiccast-power", YamahaMusicCastPower);
}
