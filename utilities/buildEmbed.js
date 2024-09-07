import { EmbedBuilder } from "discord.js";

export function buildEmbed(title, description) {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor("#b200ed")
    .setTimestamp();
}
