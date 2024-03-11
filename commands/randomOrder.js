import { EmbedBuilder } from "discord.js";

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildEmbed(title, description){
    return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor('#b200ed')
    .setTimestamp();
}


export async function randomOrderServer(interaction){
    await interaction.guild.members.fetch();
    const members = Array.from(interaction.guild.members.cache.values());

    const nonBotMembers = members.filter(member => !member.user.bot)
    const usernames = nonBotMembers.map(member => member.user.username);

    console.log('Number of Members in Server:', usernames.length);
    console.log('Member usernames:', usernames);

    const randomOrder = shuffle(usernames);

    let order = 1;
    let response = '';
    for (const username of randomOrder) {
        response += `Order ${order}: ${username}\n`;
        order++;
    }

    const embed = buildEmbed('Random Order (Server)', response);

    await interaction.reply({ embeds: [embed] });
}
export async function randomOrderChannel(interaction){
    const channel = interaction.channel;

    await channel.guild.members.fetch();
    const members = channel.members.filter(member => !member.user.bot);
    const usernames = members.map(member => member.user.username);

    const randomOrder = shuffle(usernames)

    console.log('Number of Members in Channel:', usernames.length);
    console.log('Member usernames:', usernames);

    let order = 1;
    let response = '';
    for (const username of randomOrder) {
        response += `Order ${order}: ${username}\n`;
        order++;
    }

    const embed = buildEmbed('Random Order (Channel)', response);

    await interaction.reply({ embeds: [embed] });
}

export async function randomorder(interaction){
    const scope = interaction.options.getString('scope');

    switch (scope) {
        case 'server':
            await randomOrderServer(interaction);
            break;
        case 'channel':
            await randomOrderChannel(interaction);
            break;
        default:
            await interaction.reply({ content: 'Invalid Scope Provided.', ephemeral: true});
    }
}