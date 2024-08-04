import { buildEmbed } from "../functions/buildEmbed.js";
import { shuffle } from "../functions/shuffle.js";

export async function teamsof(interaction) {
  const scope = interaction.options.getString("scope");

  switch (scope) {
    case "server":
      await teamsOfServer(interaction);
      break;
    case "channel":
      await teamsOfChannel(interaction);
      break;
    default:
      await interaction.reply({
        content: "Invalid Scope Provided.",
        ephemeral: true,
      });
  }
}

export async function teamsOfServer(interaction) {
  const membersPerTeam = interaction.options.getString("num");
  if (membersPerTeam < 1) {
    await interaction.reply({
      content: "Please provide a number greater than 0.",
      ephemeral: true,
    });
    return;
  }

  await interaction.guild.members.fetch();
  const members = Array.from(interaction.guild.members.cache.values());

  const nonBotMembers = members.filter((member) => !member.user.bot);
  const usernames = nonBotMembers.map((member) => member.user.username);

  const randomOrder = shuffle(usernames);

  const teams = [];
  const teamSize = parseInt(membersPerTeam);
  const numTeams = Math.ceil(nonBotMembers.length / teamSize);

  for (let i = 0; i < numTeams; i++) {
    const teamMembers = randomOrder.slice(i * teamSize, (i + 1) * teamSize);
    teams.push(teamMembers);
  }

  const response = teams
    .map((team, index) => `Team ${index + 1}: ${team.join(", ")}`)
    .join("\n");

  const embed = buildEmbed(`Teams of ${membersPerTeam} (Server)`, response);

  await interaction.reply({ embeds: [embed] });
}
export async function teamsOfChannel(interaction) {
  const channel = interaction.channel;
  const membersPerTeam = interaction.options.getString("num");
  if (membersPerTeam < 1) {
    await interaction.reply({
      content: "Please provide a number greater than 0.",
      ephemeral: true,
    });
    return;
  }

  await channel.guild.members.fetch();
  const members = channel.members.filter((member) => !member.user.bot);
  const usernames = members.map((member) => member.user.username);

  const randomOrder = shuffle(usernames);

  const teams = [];
  const teamSize = parseInt(membersPerTeam);
  const numTeams = Math.ceil(usernames.length / teamSize);

  for (let i = 0; i < numTeams; i++) {
    const teamMembers = randomOrder.slice(i * teamSize, (i + 1) * teamSize);
    teams.push(teamMembers);
  }

  let response = teams
    .map((team, index) => `Team ${index + 1}: ${team.join(", ")}`)
    .join("\n");

  const embed = buildEmbed(`Teams of ${membersPerTeam} (Channel)`, response);

  await interaction.reply({ embeds: [embed] });
}
