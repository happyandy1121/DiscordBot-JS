const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js'); 

module.exports = {
    data: {
        name: [`hint_1`, `hint_2`, `hint_3`, `hint_4`, `hint_5`, `hint_6`],
    },
    async execute(interaction, client) {
        const hint = {
            hint_1: `等號會把右邊的值放進左邊的字母裡`,
            hint_2: `(2+3)*4=20`,
            hint_3: `range(1,11) = 1~10, 那10到20呢owo`,
            hint_4: `%是取餘數 /是取相除後的值, 例如: 5%2=1 5/2=2.5`,
            hint_5: `6的倍數可以拆成3和什麼的倍數, 這樣中間要用and還是or呢`,
            hint_6: `告訴你一個小秘密, range(n)就是做n次`
        }

        const customId = interaction.customId;

        const modal = new ModalBuilder()
            .setCustomId(`hint`)
            .setTitle(`提示`)

        const Hint = hint[customId]
        const textInput = new TextInputBuilder()
            .setCustomId('hintInput')
            .setLabel(Hint)
            .setRequired(false)
            .setPlaceholder('看完提示後 請按取消')
            .setStyle(TextInputStyle.Short)

        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal)
    }
}