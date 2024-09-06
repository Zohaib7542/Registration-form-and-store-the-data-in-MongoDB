const mongoose = require("mongoose");
const validator = require("validator");

const submitSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3
    },
        email : {
            type : String,
            require : true,
            unique : [true,"error"],
            validator(value){
                if(validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        },
        phone:{
            type:Number,
            min:10,
            required : true,
            unique :true
        },
        address: {
            type: String,
            require : true
        }
    
})

//creating new collection using model
const Submit = new mongoose.model('Submit',submitSchema);

module.exports = Submit;