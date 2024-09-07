import { buildEmbed } from "../functions/buildEmbed.js";
import { shuffle } from "../functions/shuffle.js";

export async function randomorder(interaction) {
  const scope = interaction.options.getString("scope");

  switch (scope) {
    case "server":
      await randomOrderServer(interaction);
      break;
    case "channel":
      await randomOrderChannel(interaction);
      break;
    default:
      await interaction.reply({
        content: "Invalid Scope Provided.",
        ephemeral: true,
      });
  }
}

function formatUsernames(randomOrder) {
  let order = 1;
  let response = "";
  for (const username of randomOrder) {
    response += `Order ${order}: ${username}\n`;
    order++;
  }
  return response;
}

// Fetches user information from the entire server and returns all of those users in the reply
export async function randomOrderServer(interaction) {
  await interaction.guild.members.fetch();
  const members = Array.from(interaction.guild.members.cache.values());

  // There is likely a better way to handle this filtering... but it works for now.
  const nonBotMembers = members.filter((member) => !member.user.bot);
  const usernames = nonBotMembers.map((member) => member.user.username);

  const randomOrder = shuffle(usernames);
  let response = formatUsernames(randomOrder);

  const embed = buildEmbed("Random Order (Server)", response);
  await interaction.reply({ embeds: [embed] });
}

// Fetches user information from the channel that the command was used in and returns only those users in the reply
export async function randomOrderChannel(interaction) {
  const channel = interaction.channel;
  await channel.guild.members.fetch();

  const nonBotMembers = channel.members.filter((member) => !member.user.bot);
  const usernames = nonBotMembers.map((member) => member.user.username);

  const randomOrder = shuffle(usernames);
  let response = formatUsernames(randomOrder);

  const embed = buildEmbed("Random Order (Channel)", response);
  await interaction.reply({ embeds: [embed] });
}
