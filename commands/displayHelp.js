import { EmbedBuilder } from "discord.js";

export async function displayHelp(interaction){
    const embed = new EmbedBuilder()
    .setTitle('Zemzim Commands')
    .setDescription('/coinflip [sides]\n\n/randomorder [scope]\n\n/teamsof [scope] [num]')
    .setColor('#b200ed')
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}
