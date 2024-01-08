const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Embed } = require('discord.js');
const { cpe } = require('../../../data/cpe')
const { mao, all } = require('../../../data/roles')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cpe_1')
        .setDescription('題號1-25')
        .addIntegerOption(option =>
            option.setName('題號')
                .setDescription('UVA')
                .setRequired(true)
                .addChoices(
                    { name: '100', value: 100 },
                    { name: '118', value: 118 },
                    { name: '272', value: 272 },
                    { name: '299', value: 299 },
                    { name: '490', value: 490 },
                    { name: '948', value: 948 },
                    { name: '10008', value: 10008 },
                    { name: '10019', value: 10019 },
                    { name: '10035', value: 10035 },
                    { name: '10038', value: 10038 },
                    { name: '10041', value: 10041 },
                    { name: '10050', value: 10050 },
                    { name: '10055', value: 10055 },
                    { name: '10056', value: 10056 },
                    { name: '10057', value: 10057 },
                    { name: '10062', value: 10062 },
                    { name: '10071', value: 10071 },
                    { name: '10093', value: 10093 },
                    { name: '10101', value: 10101 },
                    { name: '10170', value: 10170 },
                    { name: '10189', value: 10189 },
                    { name: '10190', value: 10190 },
                    { name: '10193', value: 10193 },
                    { name: '10221', value: 10221 },
                    { name: '10222', value: 10222 }
                )
            )
        .addStringOption(option =>
            option.setName('程式語言')
                .setDescription('選語言')
                .setRequired(true)
                .addChoices(
                    { name: 'python', value: "python" },
                    { name: 'c++', value: "cpp" }
                ),
            ),

    async execute(interaction, client) {
        const result = interaction.options.getInteger('題號');
        let allow = false
        all.forEach(function(element) {
            let hasRole = interaction.member.roles.cache.get(element);
            if (hasRole) {
                allow = true
            }
        });
        if (allow === false) {
            await interaction.reply({
                content: '請先註冊會員',
                ephemeral: true
            })
            return;
        }
        const embed = new EmbedBuilder()
            .setTitle(`UVA${result}`)
            .setDescription('呼叫CPE')
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setColor(0x00ffff)

        const button = new ButtonBuilder()
            .setCustomId('report')
            .setLabel('問題回報')
            .setStyle(ButtonStyle.Success)
            
        const language = interaction.options.getString('程式語言');
        const code = "```" + `${language}\n`+ cpe[result][language] + "```";
        
        try {
            const explain = cpe[result]["explain"];
            await interaction.reply({
                content: `UVA${result}\n程式碼:\n` + code,
                ephemeral: true
            })
            await interaction.followUp({
                content: `UVA${result}\n` + explain,
                components: [new ActionRowBuilder().addComponents(button)],
                ephemeral: true
            });
            await client.users.fetch(mao).then((user) => {
                user.send({
                    embeds: [embed],
                });
            });
        } catch (error) {
            await interaction.reply({
                content: `There is no code for this question.\nYour donate will accelerate production!`,
                ephemeral: true
            });
        }
    }
}