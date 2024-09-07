import { buildEmbed } from "../utilities/buildEmbed.js";

export async function coinflip(interaction) {
  const sides = ["It's Heads!", "It's Tails!"];
  let flipResult = Math.random() < 0.5 ? sides[0] : sides[1];
  const userChoice = interaction.options.getString("side").toLowerCase();

  let outcome;
  if (
    (flipResult === sides[0] && userChoice === "heads") ||
    (flipResult === sides[1] && userChoice === "tails")
  ) {
    outcome = `${interaction.user.username} won :D`;
  } else {
    outcome = `${interaction.user.username} lost D:`;
  }

  const embed = buildEmbed("Coin Flip", `${flipResult}\n\n${outcome}`);

  await interaction.reply({ embeds: [embed] });
}
