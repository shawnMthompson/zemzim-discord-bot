import { EmbedBuilder } from "discord.js";

export async function coinflip(interaction){
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