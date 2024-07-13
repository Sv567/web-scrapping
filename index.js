const axios = require('axios');
const xlsx = require('xlsx');
const Cheerio = require('cheerio');
const fs = require('fs');
const { title } = require('process');

// const url = 'https://www.shopsy.in/search?q=mobile' ;
// const url = 'https://99bookstores.com/search?q=book&options%5Bprefix%5D=last' ;

// const getData = async () => {
//     try {
//         const response = await axios.get(url);
//         const data = response.data ;
//         // fs.writeFileSync('data.txt' , data , {encoding : 'utf8'});
//         fs.writeFileSync('pagedata.txt' , data , {encoding : 'utf8'});
//         console.log('data written to data.txt file')
//     }catch(error) {
//         console.log("Error :-- ",error);
//     }
// } 

// getData();

const readData = fs.readFileSync('amazonData.txt');
// console.log(readData);

const $ = Cheerio.load(readData.toString());
// console.log('Data ::: ---  ' , $)

const titles = $('.a-size-medium.a-color-base.a-text-normal');
// loop by cheerio -

const titleData = [] ;

titles.each((index, element) => {
    // console.log(element);
    const title = $(element).text();

    titleData.push(title);
})
// console.log(titles);
// console.log(products);

const pricesData = [] ;

const prices = $('.a-price-whole');
prices.each((index , element) => {
    const price = $(element).text();
    // console.log(price);

    pricesData.push(price)
})

const ratingData = [] ;
const ratings = $('.a-icon-alt');

ratings.each((index , element) => {
    const rating = $(element).text();
    // console.log(rating);
    ratingData.push(rating);
}) 
// console.log(ratingData);


const productJson = titleData.map((title , index) => {
    return {
        title,
        price:pricesData[index],
        rating:ratingData[index],
    }
})

// console.log(productJson);
// console.log(productJson.length);



// fs.writeFileSync("products.json" , JSON.stringify(productJson));

// const workbook = xlsx.utils.book_new();
// const sheet = xlsx.utils.json_to_sheet(productJson);

// // connect workbook to sheet -

// xlsx.utils.book_append_sheet(workbook , sheet, "Products");

// xlsx.writeFile(workbook , 'products.xlsx');

// console.log("File hase been saved successfully");