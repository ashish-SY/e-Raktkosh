const mongoose=require('mongoose');

const DB= process.env.DATABASE;

let db;

mongoose.connect(DB).then(()=> {
    console.log(`Connection Successful`);
    
}).catch((err)=> console.log('no Connection'));