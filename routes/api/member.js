const express = require('express');
const { check, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
const bycrypt = require('bcryptjs')
const Member = require('../../models/member');
const db = require('../../db')

db.main();
const SecKey = "Hello"

const routes = express.Router()


routes.post("/register",[check('m_fullname','Enter your name').not().isEmpty()],
[check('m_add','Enter your Address').not().isEmpty()],
[check('m_ph','Enter your Phone').not().isEmpty()],
[check('m_email','Enter your Email').not().isEmpty()],
[check('m_pass','Enter your Password').not().isEmpty()],

  
  
async(req,res)=>{

    

const results = validationResult(req)
console.log(results)


const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



      

    const{m_fullname, m_add,m_ph,m_email,m_pass} = req.body
   
    //conditions
    const emailmember = await Member.findOne({m_email:m_email}) 
    if(emailmember == emailmember) {
        res.send("Email exists, try to register with another email")

    }
    // const alreadyregistered = await Member.findOne({m_fullname, m_add,m_ph,m_email,m_pass}) 
    // if(alreadyregistered === alreadyregistered){
    //     res.send("Already Registered")

    // } 
  
    const bycrptedpassword = await bycrypt.hash(m_pass, 10)
    console.log(req.body)
    try{
        const Result = await member.create({m_fullname:m_fullname, m_add:m_add,m_ph:m_ph,m_email:m_email,m_pass:bycrptedpassword})
     
      
       
        const ob = {
            id:Result['_id'],
            
        }
        
      
        const Token = JWT.sign(ob,SecKey)
        res.cookie("Tokenization", Token)
        res.send("Member Registered!")
        res.send(Result)
    } catch(e){
            // res.status(400).send("Already Registered!")
            // res.status(400).send("Try!")
        

    }
})


routes.put("/member/editprofile/:id",async(req,res)=>{

    try {
        const id = req.params.id;
        const updates = req.body;
        const options = {new: true};
         
        const result = await Member.findByIdAndUpdate(id,updates,options);
    
        res.send(result);   
        console.log(result);
    
    } catch (error) {
        console.log(error.message);
    }
    });
    





module.exports = routes