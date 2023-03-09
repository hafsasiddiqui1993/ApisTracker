
const mongoose = require('mongoose')


const url = 'mongodb+srv://hafsasaad:tEseGXSTCayqwfMA@cluster0.ok507yc.mongodb.net/Ex_tracker'
//password tEseGXSTCayqwfMA 


function main () {
    mongoose.connect(url).then(()=>{
        console.log("Connected")
    }).catch(()=>{
        console.log("Not Connected")
 
    })
}
mongoose.set('strictQuery', false);

module.exports.main = main

