const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'gp4amej65e1dogmg7onxcr4faz7nyjwn6yi5wsajzdmj8sili7x4n9ue1vqywdbz51a47mfqcrx';
const crypto = require('crypto');
const brcypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    },
    password : {
        type: String,
        required: true,
        minlength: 8,
    },
    sessions : [{
        token : {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

//overwrite toJSON function to omit passsword and session fields
UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    return _.omit(userObject, ['password', 'sessions']);
}
//generating access Auth Token
UserSchema.methods.generateAccessAuthToken = function(){
    const user = this;
    return new Promise((resolve, reject) => {
        //create new Json web token and return
        jwt.sign({ _id : user._id.toHexString() }, jwtSecretKey, { expiresIn: '15m' }, (err, token) => {
            if(!err){
                return resolve(token);
            }
            else{
                reject();
            }
        })
    })
}
//generating refresh auth token
UserSchema.methods.generateRefreshAuthToken = function(){
    //generates 64byte hex string, does not save to database
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buff) => {
            if(!err){
                //i dont know if using const will work same way
                let token = buff.toString('hex');
                return resolve(token);
            }
            else{
                return reject(err);
            }
        })
    })
}
UserSchema.methods.createSession = (() => {
    let user = this;

    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        // saved to database successfully
        // now return the refresh token
        return refreshToken;
    }).catch((e) => {
        return  (e);
    })
})

//Model methods (static methods)
UserSchema.statics.findByIdAndToken = function(id, token){
    const User = this;
    return User.findOne({
        '_id' : id,
        'session.token' : token
    })
}
UserSchema.statics.findByCredentials = function(username, password){
    const user = this;
    return user.findOne({
        'email' : email
    })
    .then((user) => {
        if(!user) return Promise.reject();
        return new Promise((resolve, reject) => {
            brcypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                }
                else{
                    reject();
                }
            })
        })
    })
}
UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if(expiresAt > secondsSinceEpoch) {
        return true;
    }
    else{
        return false;
    }
}
//middlware to hash the password
UserSchema.pre('save', function(next){
    const User = this;
    let costFactor = 10;
    if(User.isModified('password')){
        brcypt.genSalt(costFactor, (err, salt) => {
            brcypt.hash(User.password, salt,(err, hash) => {
                User.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
})


//Below methods are classfied as HELPER Methods
let saveSessionToDatabase = (user, refreshToken) => {
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime(); 

        user.sessions.push({ 'token' : refreshToken, 'expiresAt' : expiresAt });
        user.save().then(() => {
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        })
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpired = '10';
    let secondsUntilExpired = ((daysUntilExpired * 24) * 60) * 60;
    return (Date.now() / 1000 ) + secondsUntilExpired;
}

const user = mongoose.model('User', UserSchema);
module.exports = user;