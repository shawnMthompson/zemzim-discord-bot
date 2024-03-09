import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { coinflip } from './commands/coinflip.js';
import { randomorder } from './commands/randomOrder.js';

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

  switch (interaction.commandName){
    case 'randomorder':
      await randomorder(interaction);
      break;
    case 'coinflip':
      await coinflip(interaction);
      break;
    default:
      console.log("The command was not recognized.")
      break;
  }
});

client.login(TOKEN);

