const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const { LocPicDIC, LocNameDIC, playerMessage } = require('../../../commands/RPG/play')
const { farm, farmButton } = require('../../../../data/RPG/farm')

const createButton = (customId, label, ButtonStyle, vaule) => {
    return new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(ButtonStyle)
        .setDisabled(vaule);
};

const button_creater = (args) => {
    let buttons = []

    for (let i = 0; i < args.length; i += 4) {
        buttons.push(createButton(args[i], args[i + 1], args[i + 2], args[i + 3]));
    }
    return new ActionRowBuilder().addComponents(buttons)
}

const locDIC = {
    //'townLoc': townButton,
    'farmLoc': farmButton,
    //'mineLoc': mineButton,
    //'logLoc': logButton,
    //'fishLoc': fishButton,
}

module.exports = {
    data: {
        name: [`townLoc`, `farmLoc`, `mineLoc`, `logLoc`, `fishLoc`],
    },
    async execute(interaction, client) {
        const playerID = interaction.user.id
        const customID = interaction.customId
        const row1 = button_creater(locDIC[customID]["button1"])
        const row2 = button_creater(locDIC[customID]["button2"])

        if (customID === 'townLoc') {
            var ans = town()
        }
        else if (customID === 'farmLoc') {
            var ans = farm()
        }
        else if (customID === 'mineLoc') {
            var ans = mine()
        }
        else if (customID === 'logLoc') {
            var ans = log()
        }
        else if (customID === 'fishLoc') {
            var ans = fish()
        }

        const embed = new EmbedBuilder()
            .setTitle(`還沒想到.w.`)
            .setAuthor({
                name: LocNameDIC[customID],
                //iconURL: interaction.user.displayAvatarURL(),
            })
            .setThumbnail(LocPicDIC[customID])
            .addFields({ name: ans[0], value: ans[2], inline: true })
            .addFields({ name: ans[1], value: ans[3], inline: true })
            .addFields({ name: '還沒想到.w.', value: '3', inline: true })
            .setColor(0x00ffff)

        const message = await interaction.update({ 
            embeds: [embed],
            components: [
                row1,
                row2,
            ],
            fetchReply: true
        })

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
        	const confirmation = await message.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
            if (confirmation) return
        } catch (e) {
        	row1.components.forEach(function(a) { a.setDisabled(true) })
            row2.components.forEach(function(b) { b.setDisabled(true) })
            await interaction.update({ 
                embeds: [embed],
                components: [row1, row2],
                fetchReply: true
            })
            playerMessage[playerID] = ''
        }
    }
}