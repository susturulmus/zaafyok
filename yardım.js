const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor('GREEN')
.setAuthor(message.member.user.username)
.setDescription(`
   GENEL YARDIM MENÜSÜ

 <a:elmas:773531208830418965> **?avatar** \n **belirttiğiniz kişinin avatarını gösterir** \n <a:elmas:773531208830418965> **?anime-gif** \n **nime pp leri atar** \n <a:elmas:773531208830418965> **?capslock-engel** \n **büyük harf yazmayı engeller** \n <a:elmas:773531208830418965> **?ban** \n **birisini sunucudan atar ve girmesine engel olur** \n <a:elmas:773531208830418965>  **?unban** \n **ban atılan kişinin sunucuya girebilmesini sağlar** \n <a:elmas:773531208830418965> **?kick** \n **birisini sunucudan atar** \n <a:elmas:773531208830418965> **?mute** \n **birisini susturur** \n <a:elmas:773531208830418965> **?unmute** \n **mute atılan kişinin mutesini kaldırır** \n <a:elmas:773531208830418965> **?reklam-engel** \n **sunucuya link atan kişileri uyarır ve mesajı siler** \n <a:elmas:773531208830418965> **?sa-as (aç/kapa)** \n selamın aleyküm yazanlara aleyküm selam yazar \n <a:elmas:773531208830418965> **?sohbet-(aç/kapa)** \n sohbete yazı yazmayı kapar veya açar \n

`)
.setImage("https://cdn.glitch.com/e319ac68-c611-41b6-9e24-481ba9d32f15%2Fstandard.gif?v=1622104720871")
message.channel.send(yardım)

  
 };

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['help'], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
 category: "yardım",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'yardım'
};