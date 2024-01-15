const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const { robot, guildId } = require('../../../data/roles')

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync(`./src/commands`);
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been passed through the handler`);
            }
        }
        const rest = new REST({ version: '10' }).setToken(process.env.token);
        try {
            console.log('正在更新 (/) 指令');
            
            await rest.put(Routes.applicationGuildCommands(robot, guildId[0]), { 
                body: client.commandArray,
            });
            await rest.put(Routes.applicationGuildCommands(robot, guildId[1]), { 
                body: client.commandArray,
            });
            
            console.log('更新完成 (/) 指令');
        } catch (error) {
            console.error(error);
        }
    }
}