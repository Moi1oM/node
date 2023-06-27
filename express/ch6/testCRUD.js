const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = "mongodb+srv://id:pwd@cluster0.adnqfac.mongodb.net/?retryWrites=true&w=majority";
// Connect to your Atlas cluster
const client = new MongoClient(url, {useNewUrlParser : true});

async function main() {
    try {
        await client.connect();
        console.log('successfully connected');

        const collection = client.db("test").collection('person');

        await collection.insertOne({name:'Andy', age:30})

        const documents = await collection.find({name:'Andy'}).toArray();

        await collection.updateOne({name: 'Andy'}, {$set:{age:31}});
        console.log('update')

        const updateDocument = await collection.find({name:'Andy'}).toArray();
        console.log('updated', updateDocument);

        await client.close();
    } catch (e) {
        console.error(e);
    }
}

main();