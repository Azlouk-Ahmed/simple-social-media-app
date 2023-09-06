const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator")

const userSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    surname : {
        type : String,
        required : true
    },
    img : {
        type : String,
    },
    coverImg : {
        type : String,
    },
    bio : {
        type : String,
    },
    country : {
        type : String,
    },
    education : {
        type : String,
    },
    followers : []
}, { timestamps: true })

userSchema.statics.signup = async function(email, password, name, surname, img ){
    if(!email || !password) {
        throw Error("email or password cannot be empty !")
    }
    if(!validator.isEmail(email)){
        throw Error("cannot accept unvalid emails")
    }
    // if(!validator.isStrongPassword(password)){
    //     throw Error("use stronger password")
    // }
    const exist = await this.findOne({email});
    if(exist){
        throw Error("email already used")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash, name, surname, img})
    return user;
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error("email or password cannot be empty !")
    }
    if(!validator.isEmail(email)){
        throw Error("cannot accept unvalid emails")
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error("no user found")
    }

    const match = await bcrypt.compare(password, user.password);
    
    if(!match){
        throw Error("incorrect password")
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);