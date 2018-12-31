const Discord = require('discord.js');
const Listing = require('./../modules/Listing');
 
const fs = require('fs');
 
module.exports.run = async (bot,message,args) => {
    let snipeChannel = message.channel;
    const filter = m => !m.author.bot;
    let game = new Listing();
    
    let raw = fs.readFileSync('./roles.json');
        let allowedRoles = JSON.parse(raw);
    let validation = function(serverRoles, userRoles){
        let val = false;
        serverRoles.forEach((role) => {
            userRoles.forEach((usr) => {
                if (role == usr){
                    val = true;
                }
            });
        });
        return val;
    }



    let editLast3 = null;
 
    let starMessage = new Discord.RichEmbed()
        .setTitle("Scrim de Fortnite")
        .setDescription("@here Escreva os últimos três digitos do código do seu servidor")
        .setColor("#ff00ff")
        .setFooter("@Josney121#3228");
 
    message.channel.send({embed: starMessage});
 
    let time = 20;
    let editTime = "";
 
    let timeEmbed = new Discord.RichEmbed()
        .setTitle ("Próxima partida em aproximadamente...")
        .setDescription(time + " minutos")
        .setColor("#00ff40");
 
    setTimeout(async () => {
        editTime = await message.channel.send({embed: timeEmbed}).catch( (err) => {
            console.log("Não pode editar mensagem deletada");
        });
    }, 10)
 
    let timeInterval = setInterval(() => {
        if (time === 1){
            time -= 1;
            timeEmbed.setDescription(time + " minutos");
            clearInterval(timeInterval);
        }else {
            time -= 1;
            timeEmbed.setDescription(time + " minutos")
        }
 
        editTime.edit({embed: timeEmbed}).catch ( (err)  =>{
            console.log("Não se pode editar");
            clearInterval(timeInterval);
        });
    },60000);
 
    let last3 = new Discord.RichEmbed()
        .setTitle ("Últimos 3 digitos")
        .setColor("#000099");
 
    setTimeout(async () => {
        editLast3 = await message.channel.send({embed: last3});
    }, 10);
 
    const collector = snipeChannel.createMessageCollector(filter, {max: 200, maxMatches: 200, time: 180000});
 
    collector.on('collect', m =>{
        console.log(`Collected $(m.content) | ${m.author.username}`);

        if (validation(allowedRoles.roles,m.member.roles.array())){
            if (m.content === "!start"){
                collector.stop();
                console.log("Colector stopped");
                return;
            }
        }
 
        if (game.data.length === 0 && m.content.length === 3){
            game.addID(m.content.toUpperCase(), m.author.username);
        }else if(m.content.length === 3){
            if (game.userPresent(m.author.username)){
                game.deleteUserEntry(m.author.username);
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author.username);
                }else {
                    game.addID(m.content.toUpperCase(), m.author.username);
                }
            }  else {
                if(game.idPresent(m.content.toUpperCase())){
                    game.addUser(message.content.toUpperCase(), message.author.username);
                } else {
                    game.addID(m.content.toUpperCase(), m.author.username);
                }
            }
            }
            
            game.sort();

            let str = "";
            last3 = new Discord.RichEmbed()
                .setTitle("Últimos três digitos")
                .setColor("#000099");

            

            for (var i = 0; i < game.data.length; i++){
                str = "";
                for (var j = 0; j < game.data[i].users.length; j++){
                    str += game.data[i].users[j] + ".\n";
                }
                last3.addField(`${game.data[i].id.toUpperCase()} - ${game.data[i].users.length} PLAYERS`, str, true);
            }
       
            editLast3.edit({embed: last3}).catch ((err) => {
                console.log ("Caught eddit error");
            });

            if (m.deletable){
                m.delete().catch((err) =>{
                    console.log ("Can't delete");
                    console.log ("err")
                })
            }

        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
 
 
 
 
}
 
 
module.exports.help = {
    name : "start"
}


