const express = require('express');
const JWT = require('jsonwebtoken');
const db = require('../../db')
const Member = require('../../models/member')
const bcrypt = require('bcrypt')
db.main();
const SecKey = "Hello"

const routes = express.Router()

routes.post("/login",async(req,res)=>{
    const{m_email, m_pass} = req.body
    // console.log(req.body) 
     try{
        const Result = await Member.findOne({m_email}) 
        if(!Result){
          res.status(400).send('Email not found')
        }

        const isMatch = await bcrypt.compare(m_pass, Result.m_pass)
        if(!isMatch) {
            res.status(400).send('Password not match')
        }
        const ob = {
                    id:Result["_id"],
                }
                const Token = JWT.sign(ob,SecKey) 
                // res.cookie("Tokenization", Token) 
     console.log(Result)
    res.send({
      status:true,
      Token
    })
     }catch(e){
        res.status(400).send(e.message)
     }
    //  if(Result == null) {
    //     res.send("Restricted")
        
    // } else{
    //     const ob = {
    //         id:Result["_id"],
    //     }
        // const Token = JWT.sign(ob,SecKey) 
        // res.cookie("Tokenization", Token) 
        // res.send("Cookie Identified, Member logged in")
    }
  ) 
     
  routes.post("/logout",(req,res)=>{
    res.cookie("Tokenization", null) 
    res.send("Logout")
  }) 
//authentication

  

module.exports = routes