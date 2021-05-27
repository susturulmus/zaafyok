const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ayar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  

 if(!message.member.roles.cache.get(ayar.MuteYetkilisi) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.')

  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(`Mutesini Açmam Gereken Kişiyi Belirt.`)
        let mutezaman = args[0]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");

  db.delete(`muteli_${message.guild.id + kişi.id}`, 'muteli')
db.delete(`süre_${message.mentions.users.first().id + message.guild.id}`, mutezaman)
  
          
       
            kişi.roles.remove(ayar.MuteRol);

            const swenlor = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
  .setTimestamp()
  .setDescription(`<@${kişi.id}>, adlı şahısın mutesi sona erdi. 
Mutesini Kaldıran Yetkili: <@${message.author.id}> / **${message.author.id}**

Mutesi Kalkan: <@${kişi.id}> / **${kişi.id}**

Kanal: **${message.channel.name}**`)
client.channels.cache.get(ayar.MuteKanal).send()
  

  

}
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 0,
}

exports.help = {
  name: "unmute"
};