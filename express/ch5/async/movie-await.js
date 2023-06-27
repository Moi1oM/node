const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

async function getTop20Movies() {
    try {
        const result = await axios.get(url);
        const {data} = result;
        if(!data.articleList || data.articleList.size===0) {
            throw new Error('no data');
        }

        const movieInfos = data.articleList.map((article, idx)=> {
            return {title: article.title, rank: idx+1};
        });

        for (let movieInfo of movieInfos) {
            console.log(movieInfo);
        }
    } catch (err) {
        throw new Error(err);
    }
}

getTop20Movies();