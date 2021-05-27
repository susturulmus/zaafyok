const Discord = require('discord.js')
const ayar = require('../ayarlar.json')
const db = require('quick.db')
const ms = require('ms')
const moment = require('moment')
const momentt = require("moment-duration-format")
exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.get(ayar.MuteYetkilisi) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Bu komut için yetkin yetersiz.')

    let member = message.mentions.users.first()
    let py = message.guild.member(member)
    if(!member) return message.channel.send('Bir kişi etiketle.')
    if(py.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Kullanıcının sizden daha fazla yetkisi var veya sizden daha üstte.')

    let zaman = args[1]
    .replace('sn', 's')
    .replace('dk', 'm')
    .replace('sa', 'h')
    .replace('gün', 'd')

    var vakit = zaman
    .replace('s', 'saniye')
    .replace('m', 'dakika')
    .replace('h', 'saat')
    .replace('d', 'd')

    let sebep = args.slice(2).join(' ')
    if(!sebep) sebep = 'Belirtilmedi'
    //------------------------------//
   db.set(`muteli_${message.guild.id + py.id}`, 'muteli')
   db.set(`süre_${message.mentions.users.first().id + message.guild.id}`, zaman)
   db.add(`mute.${message.author.id}`, 1)
   db.add(`toplam.${message.author.id}`, 1)
   //----------------------------------//
    try {
      py.roles.add(ayar.MuteRol)
   client.channels.cache.get(ayar.MuteKanal).send(
       new Discord.MessageEmbed()
       .setTitle(`${client.user.username} Mute`)
       .setAuthor(message.author.username, message.author.avatarURL ({dynamic: true}))
       .setDescription(`<@${py.id}>, adlı kullanıcı susturuldu.
       
    Mute Atan Yetkili: <@${message.author.id}> / **${message.author.id}>**

    Mute Atılan Şahıs: <@${py.id}> / **${py.id}**

    Mute Sebebi: **${sebep}**

    Mute Süresi: **${zaman}**`)
       .setTimestamp()
       );
       
       //--------------------------------------//
    } catch (e) {
        console.log(e);
    }
       setTimeout(async function() {
        py.roles.remove(ayar.MuteRol)
          client.channels.cache.get(ayar.MuteKanal).send(
              new Discord.MessageEmbed()
              .setTitle(`${client.user.username} - Mute`)
              .setAuthor(message.author.username, message.author.avatarURL ({dynamic: true}))
              .setDescription(`<@${py.id}>, adlı kullanıcı susturulması kaldırıldı.
              
             Mute Atan Yetkili: <@${message.author.id}> / **${message.author.id}**
              
             Mute Kalkan Kullanıcı: <@${py.id}> / **${py.id}**
              
             Mute Sebebi: **${sebep}**
              
             Mute Süresi: **${zaman}**`)
              .setFooter('')
              .setTimestamp())
    }, ms(zaman));
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sustur'],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description: 'mute atar',
  usage: 'mute'
};