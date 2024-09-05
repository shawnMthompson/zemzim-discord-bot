import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { REST, Routes } from "discord.js";
import { coinflip } from "./commands/coinflip.js";
import { randomorder } from "./commands/randomOrder.js";
import { displayHelp } from "./commands/displayHelp.js";
import { teamsof } from "./commands/teamsOf.js";
import { poll } from "./commands/poll.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandsFilePath = path.join(__dirname, "commands.json");
const commandsData = fs.readFileSync(commandsFilePath, "utf8");
const commands = JSON.parse(commandsData);

dotenv.config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error reloading application (/) commands:", error);
  }
})();

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

  try {
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
  } catch (error) {
    console.error("Error handling interaction:", error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(TOKEN);
