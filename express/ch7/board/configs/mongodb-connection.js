const {MongoClient} = require("mongodb")
const uri = "mongodb+srv://moimoi:12344321@cluster0.adnqfac.mongodb.net/?retryWrites=true&w=majority";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
}