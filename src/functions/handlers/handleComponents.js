const { readdirSync } = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolders = readdirSync(`./src/components`);
        for (const folder of componentFolders) {
            const componentFiles = readdirSync(`./src/components/${folder}`).filter(
                (file) => file.endsWith('.js')
            )

            const { buttons, modals } = client;

            switch (folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${file}`);
                        for (i=0;i<button.data.name.length;i++) {
                            buttons.set(button.data.name[i], button);
                        }
                    }
                    break;
                
                case "modals":
                    for (const file of componentFiles) {
                        const modal = require(`../../components/${folder}/${file}`);
                        for (i=0;i<modal.data.name.length;i++) {
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