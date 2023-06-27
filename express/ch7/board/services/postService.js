const paginator = require("../utils/paginator")
const {ObjectId} = require("mongodb");

const projectionOption = {
    projection: {
        password: 0,
        "comment.password": 0,
    },
};

async function writePost(collection, post) {
    post.hit = 0;
    post.createdDt = new Date().toISOString();
    return await collection.insertOne(post);
}

async function list(collection, page, search) {
    const perPage = 10;
    const query = { title: new RegExp(search, "i") };
    const cursor = collection
        .find(query, { limit: perPage, skip: (page - 1) * perPage })
        .sort({
            createdDt: -1,
        });
    const totalCount = await collection.count(query);
    const posts = await cursor.toArray();
    const paginatorObj = paginator({ totalCount, page, perPage: perPage });
    return [posts, paginatorObj];
}

async function getDetailPost(collection, id) {
    return await collection.findOneAndUpdate({ _id: ObjectId(id) }, {$inc: {hits:1}}, projectionOption)
}

module.exports = {
    writePost,
    list,
    getDetailPost
};