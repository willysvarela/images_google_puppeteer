const Scraper = require('images-scraper')
const fs = require('fs')
const booksModule = require('./books')

const google = new Scraper({
    puppeteer: {
        headless: true
    }
});


const start = async (books) => {
    let results = [];
    for (const book of books) {
        const newRes = await search(book.title);
        const obj = {...book, imageUrl: newRes[0].url};
        results.push(obj);
    }
    console.log({results});

    write(JSON.stringify(results));
}

const search = async (q) => {
    const res = await google.scrape(q, 1);
    console.log({url: res[0].url});
    return res;
};

const write = (text) => {
    const FILE_URL = "./urls.json";
    fs.writeFileSync(FILE_URL, text);
}


start(booksModule.books);