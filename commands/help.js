import { EmbedBuilder } from "discord.js";

export async function help(interaction){
    const embed = new EmbedBuilder()
    .setTitle('Zemzim Commands')
    .setDescription('/coinflip [sides]\n\n/randomorder [scope]')
    .setColor('#b200ed')
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}
