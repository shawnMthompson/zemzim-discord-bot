import { EmbedBuilder } from "discord.js";

export async function displayHelp(interaction) {
  let description = "";

  description += "`● coinflip [sides]`";
  description += "\n`● randomorder [scope]`";
  description += "\n`● teamsof [scope] [num]`";
  description += "\n`● poll [question] [choice1, choice2, ...]`";

  const embed = new EmbedBuilder()
    .setTitle("Zemzim Commands")
    .setDescription(description)
    .setColor("#b200ed")
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
