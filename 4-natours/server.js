const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });// it will be availble in every file // it must writte before app
const app = require('./app');



// console.log(app.get('env'));///======> environment variables ===> this one is development whci set by express
//console.log(process.env);// =====>bunch of  difrenet variable ===> they are global so available every where

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})