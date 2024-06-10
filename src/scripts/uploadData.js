const fs = require('fs');
const { MongoClient } = require('mongodb');
const winston = require('winston');
const schedule = require('node-schedule');

const mongoUrl = 'mongodb+srv://shivanipatil786:root@<cluster>/<dbname>?retryWrites=true&w=majority';
const dbName = 'myDatabase';
const collectionName = 'records';


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' }),
    ],
});

async function uploadData() {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const dataFile = 'data/data.json';
        let rawData;

        try {
            rawData = fs.readFileSync(dataFile);
        } catch (err) {
            logger.error('Error reading data file', err);
            await client.close();
            return;
        }

        const data = JSON.parse(rawData);

        for (const record of data) {
            try {
                const existingRecord = await collection.findOne({ id: record.id });
                if (!existingRecord) {
                    await collection.insertOne(record);
                    logger.info(`Successfully inserted record with id: ${record.id}`);
                }
            } catch (err) {
                logger.error('Error inserting record', err);
            }
        }
    } catch (err) {
        logger.error('Error connecting to MongoDB', err);
    } finally {
        await client.close();
        logger.info('Data upload complete');
    }
}

schedule.scheduleJob('0 0,12 * * *', uploadData);

module.exports = uploadData;
