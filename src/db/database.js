const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://shivanipatil786:root@<cluster>/<dbname>?retryWrites=true&w=majority';
const dbName = 'monitoring';

const connectDB = async () => {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
};

module.exports = connectDB;
