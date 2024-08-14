import { EmbedBuilder } from "discord.js";

export async function displayHelp(interaction) {
  const embed = new EmbedBuilder()
    .setTitle("Zemzim Commands")
    .setDescription(
      "/coinflip [sides]\n/randomorder [scope]\n/teamsof [scope] [num]\n/poll [question] [choice1, choice2, ...]"
    )
    .setColor("#b200ed")
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
