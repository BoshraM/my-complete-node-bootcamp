const fs = require('fs');//file system 
const http= require("http")
const url= require("url") //// -----> 11 routing
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
const server = http.createServer((req,res) => {
    const pathName=req.url;

    /////routing ----->11
    if(pathName==='/' || pathName=== '/overview'){
        res.end('This is the OVERVIEW')
    } else if (pathName === '/product'){
        res.end('This is the PRODUCTS')
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>the page is not found<h1>')
    }
});

server.listen(8000, '127.0.0.1'/*this is not need*/ , () => {
    console.log('Listening to requests on port 8000')
});
