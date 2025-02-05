const client = require("../../bot");

async function findOne(type, filter, create = true) {
    const user_data = await client.db[type].findOne(filter);

    if (user_data) {
        return user_data;
    } else {
        return create ? await client.db[type].create(filter) : null;
    };
};

module.exports = findOne;