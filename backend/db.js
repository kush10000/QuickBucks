const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://kushag786:H5K2okHM6qWEOfws@cluster0.p1ixp3r.mongodb.net/paytm")

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