const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String
})

const accountSchema = new mongoose.Schema({
	userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    } ,
	balance: {
        type:Number
    }
})

const User = mongoose.model('users',userSchema)
const Account = mongoose.model('accounts',accountSchema)

module.exports = {
    User,
    Account
};