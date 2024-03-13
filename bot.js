import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { coinflip } from './commands/coinflip.js';
import { randomorder } from './commands/randomOrder.js';
import { displayHelp } from './commands/displayHelp.js';

const commands = [
  {
    name: 'randomorder',
    description: 'Generates a random order of users within a server or a specific channel (excluding Bots).',
    options: [
    {
      name: 'scope',
      description: 'Specify the scope of random ordering.',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Server',
          value: 'server'
        },
        {
          name: 'Channel',
          value: 'channel'
        }
      ]
    }
    ]
  },
  {
    name: 'coinflip',
    description: 'Returns heads or tails.',
    options: [
      {
        name: 'side',
        description: 'Choose a side of the coin.',
        type: 3,
        required: true,
        choices: [
          {
            name: 'Heads',
            value: 'heads'
          },
          {
            name: 'Tails',
            value: 'tails'
          }
        ]
      }
    ]
  },
  {
    name: 'help',
    description: 'View a list of all commands.'
  }
];

const { TOKEN, CLIENT_ID } = config;
const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

import { Client, GatewayIntentBits } from 'discord.js';
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

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName){
    case 'randomorder':
      await randomorder(interaction);
      break;
    case 'coinflip':
      await coinflip(interaction);
      break;
    case 'help':
      await displayHelp(interaction);
      break;
    default:
      await interaction.reply({ content: 'The command was not recognized or received.', ephemeral: true});
      break;
  }
});

client.login(TOKEN);

