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

    //const embed = buildEmbed('Teams of # (Server)', response);   # Replace '#' with user-input teams of # and use `

    await interaction.reply({ embeds: [embed] });
}
export async function teamsOfChannel(interaction){
    const membersPerTeam = interaction.options.getString('#');

    //const embed = buildEmbed('Teams of # (Channel)', response);   # Replace '#' with user-input teams of # and use `

    await interaction.reply({ embeds: [embed] });
}