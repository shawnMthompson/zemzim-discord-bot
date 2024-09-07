import { buildEmbed } from "../utilities/buildEmbed.js";

// This command is fairly unnecessary with Discord's official poll feature, but there isn't much harm in leaving the command here regardless.
export async function poll(interaction) {
  const question = interaction.options.getString("question");
  const choices = interaction.options.getString("choices");
  const options = choices.split(",");

  const embed = buildEmbed(
    question,
    options.map((option, index) => `${index + 1}️⃣ ${option}`).join("\n"),
  );

  await interaction.deferReply();
  const message = await interaction.editReply({ embeds: [embed] });
  for (let i = 0; i < options.length; i++) {
    await message.react(`${i + 1}️⃣`);
  }
}
