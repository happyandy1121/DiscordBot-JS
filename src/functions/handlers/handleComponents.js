const { readdirSync } = require('fs');

module.exports = (client) => {
	client.handleComponents = async () => {
		const componentFolders = readdirSync(`./src/components`);
		for (const folder of componentFolders) {
			const componentItems = readdirSync(`./src/components/${folder}`)
			const { buttons, modals } = client;
			for (const item of componentItems) {
				const componentFiles = readdirSync(`./src/components/${folder}/${item}`)

				switch (item) {
					case "buttons":
						for (const file of componentFiles) {
							const button = require(`../../components/${folder}/${item}/${file}`);
							for (i = 0; i < button.data.name.length; i++) {
								buttons.set(button.data.name[i], button);
							}
						}
						break;

					case "modals":
						for (const file of componentFiles) {
							const modal = require(`../../components/${folder}/${item}/${file}`);
							for (i = 0; i < modal.data.name.length; i++) {
								modals.set(modal.data.name[i], modal);
							}
						}
						break;

					default:
						break;
				}
			};
		}
	}
}