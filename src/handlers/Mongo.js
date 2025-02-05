const mongoose = require("mongoose");
const { mongoURL } = require("../../config.json")

const fs = require('fs');
const path = require('path');

const models = {};

module.exports = async (client) => {
	mongoose.Promise = Promise;
	mongoose.connect(mongoURL);

	mongoose.connection.on('error', (error) => {
		console.error(`Error connecting to MongoDB: ${error.message}`);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB has been disabled.');
	});

	mongoose.connection.on('connected', () => {
		fs.readdirSync(path.join(__dirname, '../models')).forEach(file => {
			const modelName = file.split('.')[0].toLowerCase();
			models[modelName] = require(`../models/${file}`);
		});

		client.db = models;

		console.log(`[${client.functions.getById(`time.msk`)}] MongoDB successfully connected to the cluster ${mongoose.connection.name}`.blue.bold);
	});

	// Closing processing
	process.on('SIGINT', async () => {
		await mongoose.connection.close();
		process.exit(0);
	});
};