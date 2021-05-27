const fs = require('fs');
const qdb = require('quick.db');
const db = require('quick.db')
const wiodb = require('wio.db')
const chalk = require('chalk')
const moment = require('moment')
const ms2 = require('parse-ms')
const ms = require("ms")
const Canvas = require('canvas')//pythonic
const ayarlar = require('./ayarlar.json');//pythonic
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
  process.on('warning', function (err) {
    if ( 'MaxListenersExceededWarning' == err.name ) {
    process.exit(1); 
    }
  }); //pythonic
function foo() {
  return new Promise((resolve, reject) => {
  return resolve();
});
}
async function foobar() {
foobar();
foo().then(() => {}).catch(() => {});
foobar().catch(console.error);
}

var prefix = ayarlar.prefix

const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION']});
Discord.Role.prototype.toString = function() {
return `@${this.name}`
}
const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`); //pythonic
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`); //pythonic
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name); //pythonic
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)]; //pythonic
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name); //pythonic
            });
            resolve();
        } catch (e) {
         reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)]; //pythonic
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
   if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
    return permlvl;
};

client.login(ayarlar.token).then(
  function() {
    console.log("[Token-Log] Token doğru bir şekilde çalışıyor.");
  },
  function(err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err);
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);



//CAPSLOCK
    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`<a:no:773448409340313600> Hop Orada Dur Bakalım! ${msg.author}, Bu Sunucuda Capslock Kullanımı Yasaktır`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});
//reklam
client.on("message", async msg => {
  if (msg.author.bot) return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "https://",
      "http://",
      "discord.gg",
      "glitch.com",
      ".glitch.me"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(10000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
//reklam

client.on("message", async message => {
  const lus = await db.fetch(`reklamengel_${message.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();

          return message
            .reply("Hey! Bu Sunucuda Reklam Yapamassın")
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
client.on("messageUpdate", async message => {
  const lus = await db.fetch(`reklamengel_${message.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();

          return message
            .reply("Hey Dur!Reklam Yapamassın!")
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
//reklam son

//KAYIT
client.on("guildMemberAdd", member => {
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = client.duration(kurulus).format("D");
  var kontrol;
  if (gün < 60) kontrol = "Tehlikeli <a:anti_tik:785549553205116959> ";
  if (gün > 60) kontrol = "Güvenli <a:tik:785549596762832926> ";
  let kanal = kanal;
  if (!kanal) return;
  member.guild.channels
    .get("847390932365737997")
    .send(
      `** <a:nidro:785549862611582986> Hoşgeldin ${member} seninle Beraber ${member
        .guild.memberCount ||
        "DiscordAPI"}  Kişiye Ulaştık <a:muq:787682647165239337> \n **tagımızı alarak sende aramıza katılabilirsin!! tag için ! tag** **\n**Hesabın Kurulduğu Tarih: ${client(
        user.createdAt
      ).format("DD")} ${aylar[client(user.createdAt).format("MM")]} ${client(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
      )}**\n **Bu Kullanıcı: ${kontrol}**`
    )
    .setImage(
      "https://images-ext-1.discordapp.net/external/wZXik4x7hdRuHb2k2BfpXbgkL0MHDqJgDqvcfM_QDRU/https/img0.joyreactor.com/pics/comment/circle-lines-dancing-infinite-1222906.gif"
    );
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

//sa-as 
client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "s.a" ||
      msg.content.toLowerCase() == "selamun aleyküm" ||
      msg.content.toLowerCase() == "sea" ||
      msg.content.toLowerCase() == "selamın aleyküm" ||
      msg.content.toLowerCase() == "selam"
    ) {
      try {
        return msg.reply(
          " <a:freeze_crown:773176911140356109> Aleyküm Selam, Hoşgeldin"
        );
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "!tag") {
    krevzmesaj.channel.send(
      "ZÂÂF YØK 〝"
    );
  }
});


client.login(ayarlar.token);


