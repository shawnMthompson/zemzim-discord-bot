import { buildEmbed } from "../functions/buildEmbed.js";

export async function teamsof(interaction){
    const scope = interaction.options.getString('scope');

    switch (scope) {
        case 'server':
            await teamsOfServer(interaction);
            break;
        case 'channel':
            await teamsOfChannel(interaction);
            break;
        default:
            await interaction.reply({ content: 'Invalid Scope Provided.', ephemeral: true});
    }
}

export async function teamsOfServer(interaction){
    const membersPerTeam = interaction.options.getString('#');

    await interaction.guild.members.fetch();
    const members = Array.from(interaction.guild.members.cache.values());

    const nonBotMembers = members.filter(member => !member.user.bot)
    const usernames = nonBotMembers.map(member => member.user.username);

    const randomOrder = shuffle(usernames);

    // Implement Teams Formatting

    //const embed = buildEmbed('Teams of # (Server)', response);   # Replace '#' with user-input teams of # and use `

    await interaction.reply({ embeds: [embed] });
}
export async function teamsOfChannel(interaction){
    const membersPerTeam = interaction.options.getString('#');

    const channel = interaction.channel;

    await channel.guild.members.fetch();
    const members = channel.members.filter(member => !member.user.bot);
    const usernames = members.map(member => member.user.username);

    const randomOrder = shuffle(usernames)

    // Implement Teams Formatting

    //const embed = buildEmbed('Teams of # (Channel)', response);   # Replace '#' with user-input teams of # and use `

    await interaction.reply({ embeds: [embed] });
}