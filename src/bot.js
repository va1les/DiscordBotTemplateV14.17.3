const { Client, Partials, Collection, ActivityType, PermissionsBitField } = require("discord.js");
const Mongo = require("./handlers/Mongo");
const Event = require("./handlers/Event");
const Command = require("./handlers/Command");
const Component = require("./handlers/Component");
const SlashUpdate = require("./handlers/SlashUpdate");
const Functions = require("./handlers/Functions");
const { token } = require("../config.json");

require("colors");

const client = new Client({
    failIfNotExists: false,
    allowedMentions: { parse: ["roles", "users", "everyone"] },
    intents: [53608447], // All Intents
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    ws: { large_threshold: 100 },
    presence: {
        activities: [{
            name: "custom",
            state: "t.me/s0bakennn",
            type: ActivityType.Custom,
        }]
    }
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.components = new Collection();

// anticrash
process.on("unhandledRejection", async (err) => {
    console.log(err);
});

process.on("uncaughtException", async (err) => {
    console.log(err);
});

process.on("rejectionHandled", async (err) => {
    console.log(err);
});

process.on("warning", async (err) => {
    console.log(err);
});

(async () => {
    await Functions(client);
    await Event(client);
    await Command(client);
    await Component(client);
    await SlashUpdate(client);
})()

client.login(token).then(_ => {
    Mongo(client);
});

module.exports = client;