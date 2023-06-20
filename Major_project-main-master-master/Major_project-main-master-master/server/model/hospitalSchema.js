const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const hospitalSchema =new mongoose.Schema({
    pincode:{
        type: String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    hospitals_name:{
        type:String,
        required:true
    }
    
});
 

const Hospital=mongoose.model('HOSPITALS',hospitalSchema);
module.exports=Hospital;