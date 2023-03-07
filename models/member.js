const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Schema = mongoose.Schema;

const Memberschema = new Schema({
    m_fullname: {
        type: String,
        maxLength: [12, "Please enter less than 12 characters"],
        required: [true, 'Enter your Name'],
        
    },
  
    m_add: {
        type: String,
        required: true
        
    },

    m_ph: {
        type: String,
        max:[11, 'please enter 11 digits number'],
        required: true  
    },

    m_email: {
        type: String,
        required: true,   
        unique:true
    },
    m_pass: {
        type: String,
        required: true   
    },

    since: {
        type: Date,
        default: Date.now
      }
    
});


module.exports = member = mongoose.model('member', Memberschema);


