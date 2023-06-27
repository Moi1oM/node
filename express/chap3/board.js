const express = require("express");
const app = express();
let posts = [];

app.use(express.json()); // req.body를 사용하기 위해서
app.use(express.urlencoded({ extended : true })) // key-value 값이 조합된 형태의 데이터를 파싱해준다.

app.get("/", (req, res)=> {
    res.json(posts);
})

app.post("/posts", (req, res) => {
    const {title, name, text} = req.body;

    posts.push({id: posts.length + 1, title, name, text, createdDt: Date()});
    res.json({title, name, text});
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPost = posts.filter((post)=> post.id !== +id);
    const isLengthChanged = posts.length !== filteredPost.length;
    posts = filteredPost;
    if (isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
})

app.listen(3000, ()=>{
    console.log("posts api!")
})