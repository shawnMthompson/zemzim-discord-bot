import { REST, Routes } from 'discord.js';
import { config } from './config.js';

// ----------- COMMANDS ----------- //
const commands = [
  {
    name: 'randomorder',
    description: 'Generates a Random Order of All Users within the Discord (excluding Bots).',
  },
  {
    name: 'coinflip',
    description: 'Returns heads or tails.',
    options: [
      {
        name: 'side',
        description: 'Choose a side of the coin (heads or tails)',
        type: 3,
        required: true
      }
    ]
  }
];

// ----------- UNIQUE KEYS ----------- //
const { TOKEN, CLIENT_ID } = config;
const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

// ----------- IMPORTS ----------- //
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ], 
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// ----------- COMMAND FUNCTIONS ----------- //
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // ----------- RANDOM ORDER ----------- //
  if (interaction.commandName === 'randomorder') {
    await interaction.guild.members.fetch();
    const members = Array.from(interaction.guild.members.cache.values());

    const nonBotMembers = members.filter(member => !member.user.bot)
    const usernames = nonBotMembers.map(member => member.user.username);

    console.log('Number of members:', nonBotMembers.length);
    console.log('Member usernames:', usernames);

    const randomOrder = usernames.sort(() => Math.random() - 0.5);

    let order = 1;
    let response = '';
    for (const friend of randomOrder) {
    response += `Order ${order}: ${friend}\n`;
    order++;
    }

    const embed = new EmbedBuilder()
    .setTitle('Random Order')
    .setDescription(response)
    .setColor('#b200ed')
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
  
  // ----------- COIN FLIP ----------- //
  else if (interaction.commandName === 'coinflip') {
    const sides = ['It\'s Heads!', 'It\'s Tails!'];
    let flipResult = Math.random() < 0.5 ? sides[0] : sides[1];
    const userChoice = interaction.options.getString('side').toLowerCase();
    console.log(`'${interaction.user.username}' chose ['${userChoice}'] and flipped the coin with the result of [${flipResult}].`);
    let outcome;
    if ((flipResult === 'It\'s Heads!' && userChoice === 'heads') || (flipResult === 'It\'s Tails!' && userChoice === 'tails')) {
      outcome = 'You\'ve Won :D';
      console.log(`'${interaction.user.username}' won the coin flip.`)  
    }
    else {
      outcome = 'You\'ve Lost D:';
      console.log(`'${interaction.user.username}' lost the coin flip.`)  
    }
    

    const embed = new EmbedBuilder()
    .setTitle('Coin Flip')
    .setDescription(`${flipResult}\n\n${outcome}`)
    .setColor('#b200ed')
    .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(TOKEN);

