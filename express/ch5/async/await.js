function waitOneSecond(msg) {
    return new Promise((resolve, _)=> {
        setTimeout(()=>resolve(`${msg}`), 1000);
    });
}

async function countOneToTen() {
    for (let x of [...Array(10).keys()]) {
        let result = await waitOneSecond(`waiting`);
        console.log(result);
    }
    console.log('fin');
}

countOneToTen();