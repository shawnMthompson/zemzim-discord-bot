import { REST, Routes } from "discord.js";
import { config } from "./config.js";
import { coinflip } from "./commands/coinflip.js";
import { randomorder } from "./commands/randomOrder.js";
import { displayHelp } from "./commands/displayHelp.js";
import { teamsof } from "./commands/teamsOf.js";
import { poll } from "./commands/poll.js";

const commands = [
  {
    name: "randomorder",
    description:
      "Generates a random order of members within a server or a specific channel (excluding Bots).",
    options: [
      {
        name: "scope",
        description: "Specify the scope of random ordering.",
        type: 3,
        required: true,
        choices: [
          {
            name: "Server",
            value: "server",
          },
          {
            name: "Channel",
            value: "channel",
          },
        ],
      },
    ],
  },
  {
    name: "teamsof",
    description:
      "Generates a random pairing of members within a specific server or a specific channel.",
    options: [
      {
        name: "scope",
        description: "Specify the scope of random ordering.",
        type: 3,
        required: true,
        choices: [
          {
            name: "Server",
            value: "server",
          },
          {
            name: "Channel",
            value: "channel",
          },
        ],
      },
      {
        name: "num",
        description: "Specify the # of members per team.",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "coinflip",
    description: "Returns heads or tails.",
    options: [
      {
        name: "side",
        description: "Choose a side of the coin.",
        type: 3,
        required: true,
        choices: [
          {
            name: "Heads",
            value: "heads",
          },
          {
            name: "Tails",
            value: "tails",
          },
        ],
      },
    ],
  },
  {
    name: "poll",
    description: "Create a poll with a question and choices.",
    options: [
      {
        name: "question",
        description: "Enter the question for the poll.",
        type: 3,
        required: true,
      },
      {
        name: "choices",
        description:
          "Enter the choices for the poll. (Seperated by commas (e.g. Choice 1, Choice 2))",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "help",
    description: "View a list of all commands.",
  },
];

const { TOKEN, CLIENT_ID } = config;
const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "randomorder":
      await randomorder(interaction);
      break;
    case "coinflip":
      await coinflip(interaction);
      break;
    case "teamsof":
      await teamsof(interaction);
      break;
    case "poll":
      await poll(interaction);
      break;
    case "help":
      await displayHelp(interaction);
      break;
    default:
      await interaction.reply({
        content: "The command was not recognized or received.",
        ephemeral: true,
      });
      break;
  }
});

client.login(TOKEN);
