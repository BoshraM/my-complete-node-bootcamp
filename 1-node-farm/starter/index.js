const fs = require('fs');//file system 
const http= require("http")
const url= require("url") //// -----> 11 routing
const replaceTemplate = require('./modules/replaceTemplate')
//Blocking, synchronous
// const textIn=fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn)

// const textOut=`this is what we know about avocado: ${textIn}.\ncreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut)

// //unBlocking, asynchronous
// fs.readFile('./txt/start.txt','utf-8',(err,data1) => {
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8' , err => {
//                 console.log('your file has been written')
//             })
//         })
//     })
// })
// console.log('will read file!')
/////11----> ROUTING////
////ROUTING BASICALLY MEANS IMPLEMENTING DIFFERENT ACTION FOR DIFFERENT URL///

//SERVER


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')//=====> we use sync because this code just run once so it wont block
const dataObject = JSON.parse(data);

const server = http.createServer((req,res) => {
    const { query, pathname } = url.parse(req.url, true)
  

    /////routing ----->11
    //OVERVIEW PAGE
    if(pathname==='/' || pathname=== '/overview'){
        res.writeHead(200, { 'Content-Type': 'text/html'})

        const cardHtml = dataObject.map((el) => replaceTemplate(tempCard, el)).join('');
        const output=tempOverview.replace('{%PRODUCT-CARDS%}', cardHtml);
        res.end(output);

    //PRODUCT PAGE
    } else if (pathname === '/product'){
        res.writeHead(200, { 'Content-Type': 'text/html'})
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

    /////API
    } else if (pathname === '/api'){
        res.writeHead(200, { 'Content-Type': 'aplication/json'})
        res.end(data)

    //not found
      } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>the page is not found<h1>')
    }
});

////API =====>IS A SERVICE FROM WHICH WE CAN REQUEST SOME DATA////

server.listen(8000, '127.0.0.1'/*this is not need*/ , () => {
    console.log('Listening to requests on port 8000')
});
