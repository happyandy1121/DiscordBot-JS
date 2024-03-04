const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed, time } = require('discord.js');
const { playerMessage } = require('../../../commands/RPG/play')
const { townEmbed, townButton } = require('../../../../data/RPG/town')
const Daily = require('../../../models/daily')
const Member = require('../../../models/member')

function difference(date1, date2) {
  const date1utc =
    Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2utc =
    Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  day = 1000 * 60 * 60 * 24;
  return (date2utc - date1utc) / day
}

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

const Button = {
	"button1": [
		'move', '移動', ButtonStyle.Danger, false,
	]
}

module.exports = {
  data: {
    name: [`daily`],
  },
  async execute(interaction, client) {
    const playerID = interaction.user.id
    const row1 = button_creater(Button["button1"])
    const user = await Daily.findOne({ where: { id: playerID } })
    const member = await Member.findOne({ where: { id: playerID } })

    if (user) {
      const lastDailyDate = user.lastDaily
      const currentDate = new Date()

      const time_difference = difference(lastDailyDate, currentDate)
      if (time_difference === 0) {
        var message = await interaction.update({
          content: `你今天已經簽到過了，簽到累積**${user.continued}**天`,
          embeds: [],
          components: [row1],
          fetchReply: true
        })
      }
      else if (time_difference === 1) {
        user.update({ 
          continued: user.continued + 1,
          lastDaily: new Date()
        })
        member.update({ money: member.money + 100 })
        var message = await interaction.update({
          content: `簽到成功，簽到累積**${user.continued}**天`,
          embeds: [],
          components: [row1],
          fetchReply: true
        })
      }
      else if (time_difference > 1) {
        user.update({ 
          continued: 1,
          lastDaily: new Date()
        })
        member.update({ money: member.money + 100 })
        var message = await interaction.update({
          content: `簽到成功，距離上次簽到超過一天，天數重新累積`,
          embeds: [],
          components: [row1],
          fetchReply: true
        })
      }
    }
    else {
      Daily.create({
        id: interaction.user.id,
        continued: 1,
        lastDaily: new Date()
      })
    }
    
    const collectorFilter = i => i.user.id === interaction.user.id;
    try {
      const confirmation = await message.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
      if (confirmation) return
    } catch (e) {
      row1.components.forEach(function (a) { a.setDisabled(true) })
      await interaction.message.edit({
        embeds: [],
        components: [row1],
        fetchReply: true
      })
      playerMessage[playerID] = ''
    }
  }
}