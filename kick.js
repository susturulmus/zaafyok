const Discord = require('discord.js');

exports.run = (client,message,args) => {

var kisi = message.mentions.users.first();
if(!kisi) return message.reply('Lütfen Atacağınız Kişiyi Belirtiniz \n Veya Bu Kişi Sunucuda Yok');
if(!message.guild.member(kisi).kickable)return message.reply('Bu Kişiyi Kickleyemem Nedenleri Şunlar Olabilir  \n Bunu Yapmak İçin **İznin Yok** \n Bunu Yapmak İçin **iznim yok**');
var reason = args.slice(1).join(" ");
message.guild.member(kisi).kick(reason);
var reasonsebeb = reason ? reason : "Neden Belirtilmemiş";

var kickmesaj = new Discord.RichEmbed()
.setColor("RANDOM")
.setThumbnail(message.author.avatarURL)
.setImage("https://media.discordapp.net/attachments/798799586985902137/805066481024106536/standard_6.gif")
.setTitle("<a:uyari:773449389708279808> KİCK BİLGİLENDİRME <a:uyari:773449389708279808> ")
.setDescription(`<a:raingowamngs:785735300172349441> \`Kick atılan kişi:\` ${kisi} \n <a:rainbowboost:773448580932960276> \`Kick sebebi:\` ${reasonsebeb}`)

return message.channel.send(kickmesaj);

};


exports.conf = {
aliases: ['kick'],
permlevel: 2
};

exports.help = {
    name:'kick',
    description: 'kullanıcıları sunucudan atar',
    usage: 'kick @kişi [sebeb]'
}