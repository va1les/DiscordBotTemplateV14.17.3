const { RESTEvents } = require('discord.js');

module.exports = {
	name: RESTEvents.RateLimited,
	execute(rateLimitInfo) {
		console.log(`
Global: ${rateLimitInfo.global}
Hash: ${rateLimitInfo.hash}
Limit: ${rateLimitInfo.limit}
MajorParameter: ${rateLimitInfo.majorParameter}
Method: ${rateLimitInfo.method}
Route: ${rateLimitInfo.route}
TimeToReset: ${rateLimitInfo.timeToReset}
URL: ${rateLimitInfo.url}
		`);
	},
};
