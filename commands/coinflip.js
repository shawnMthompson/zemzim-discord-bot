import { buildEmbed } from "../functions/buildEmbed.js";

export async function coinflip(interaction){
    const sides = ['It\'s Heads!', 'It\'s Tails!'];
    let flipResult = Math.random() < 0.5 ? sides[0] : sides[1];
    const userChoice = interaction.options.getString('side').toLowerCase();
    console.log(`'${interaction.user.username}' chose ['${userChoice}'] and flipped the coin with the result of [${flipResult}].`);
    let outcome;
    if ((flipResult === 'It\'s Heads!' && userChoice === 'heads') || (flipResult === 'It\'s Tails!' && userChoice === 'tails')) {
      outcome = `${interaction.user.username} won :D`;
      console.log(`'${interaction.user.username}' won the coin flip.`)  
    }
    else {
      outcome = `${interaction.user.username} lost D:`;
      console.log(`'${interaction.user.username}' lost the coin flip.`)  
    }
    
    const embed = buildEmbed('Coin Flip', `${flipResult}\n\n${outcome}`);

    await interaction.reply({ embeds: [embed] });
}