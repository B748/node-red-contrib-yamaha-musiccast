module.exports = function (RED) {
	function YamahaMusicCastIP(config) {
		RED.nodes.createNode(this, config, '');

		// Configuration options passed by Node Red
		this.address = config.address;
		this.name = config.name;


	}

	RED.nodes.registerType("musiccast-device", YamahaMusicCastIP);
}
