const Discord = require("discord.js");
exports.run = (client, message, args) => { let every = message.guild.roles.cache.find(r => r.name === "@everyone"); 
message.channel.createOverwrite(every, {
    SEND_MESSAGES: false
  });

  message.channel.send("Sohbet Kapatıldı. Açmak İçin (botun prefixi) sohbet-aç");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sohbet-kapat"],
  kategori: "sohbet",
  permLevel: 3
};

exports.help = {
  name: "sohbet-kapat",
  description: "Sohbetinizi kapatmaya yarar.",
  usage: "sohbet-kapat"
};