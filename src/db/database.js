const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'monitoring';

const connectDB = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
};

module.exports = connectDB;
