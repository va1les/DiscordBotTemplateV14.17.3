const { ShardingManager } = require("discord.js");
const { token } = require("./config.json")

const colors = require("colors");
colors.enable();

console.log(`Ошибки? Вопросы? Связь: @s0bakennn_connect (Telegram)`.blue.bold);
console.log(`[${new Date().toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', timeStyle: 'short' })}] The system is running!`.yellow.bold);

const Manager = new ShardingManager('./src/bot.js', {
  token: token,
  totalShards: "auto",
  shardList: 'auto',
  mode: 'process',
  respawn: true
});

Manager.on("shardCreate", (shard) => {
  console.log(`[${new Date().toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', timeStyle: 'short' })}] Shard[${shard.id}]: Launched shard ${shard.id}`.green.bold);
});

Manager.spawn();