const client = require("../../bot");

async function updateOne(type, filter, data, options = {}, old = false) {
    if (old) {
        old = await client.functions.findOne(type, filter);
    };

    const new_data = await client.db[type].findOneAndUpdate(
        filter,
        data,
        { returnDocument: "after", upsert: true, setDefaultsOnInsert: true, ...options },
    );

    new_data.old = old;

    return new_data
};

module.exports = updateOne;