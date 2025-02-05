const { readdir } = require("fs/promises");
const path = require("path");

module.exports = async (client) => {
	const utilsBasePath = path.join(__dirname, "../utils");

	for (const folder of await readdir(utilsBasePath)) {
		const folderPath = `${utilsBasePath}/${folder}`;

		for (const file of await readdir(folderPath)) {
			try {
				const functionPath = path.join(folderPath, file);
				const utilFunction = require(functionPath);

				if (typeof utilFunction === 'function') {
					if (!client.functions) client.functions = {};
					client.functions[utilFunction.name] = utilFunction;

					// console.log(`[UtilsHandler] Loaded function: ${utilFunction.name} from file: ${file}`);
				} else {
					console.warn(`[UtilsHandler] ${file} does not export an executable function.`);
				};
			} catch (error) {
				console.error(`[UtilsHandler] Error loading function from file ${file}: ${error.message}`);
			};
		};
	};

	console.log(`[UtilsHandler] Funcitons Handler has been loaded.`.green.bold)
};