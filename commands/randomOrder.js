import { EmbedBuilder } from "discord.js";

export async function randomorder(interaction){
    await interaction.guild.members.fetch();
    const members = Array.from(interaction.guild.members.cache.values());

    const nonBotMembers = members.filter(member => !member.user.bot)
    const usernames = nonBotMembers.map(member => member.user.username);

    console.log('Number of members:', nonBotMembers.length);
    console.log('Member usernames:', usernames);

    const randomOrder = usernames.sort(() => Math.random() - 0.5);

    let order = 1;
    let response = '';
    for (const friend of randomOrder) {
    response += `Order ${order}: ${friend}\n`;
    order++;
    }

    const embed = new EmbedBuilder()
    .setTitle('Random Order')
    .setDescription(response)
    .setColor('#b200ed')
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}