
const express = require('express');
const bodyParser = require("body-parser");

const Activity = require('../../models/activity')

const db = require('../../db')



const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'uploads')
        // cb(null, './uploads/');
    },
    filename: function(req,file, cb){
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, Date.now() + file.originalname);
  
    }
})





const upload = multer({storage: storage});

db.main();
const routes = express.Router()
routes.use('/uploads', express.static('uploads'));
routes.use(bodyParser.urlencoded({extended: false}));
routes.use(bodyParser.json());

routes.post("/member/exercise_activity",upload.single('exe_ac_img'),async(req,res)=>{
    
   
    try{
    const Result = await Activity.create({
            memberID: req.Another.id,
            exe_ac_name:req.body.exe_ac_name,
            exe_ac_desc:req.body.exe_ac_desc,
            exe_ac_type:req.body.exe_ac_type,
            exe_ac_dur:req.body.exe_ac_dur,
            exe_ac_date:req.body.exe_ac_date,
            exe_ac_img:req.file.path
          

         
          

        

    })
                const ch = await Result.save();
                 return res.send(ch);

         
            } catch(e){
                res.status(400).send(e.message)
            }
        }) 


        routes.post("/member/exercise_activities/display", async(req,res)=>{
         const displayed_activities = await Activity.find({_id:req.body.memberID}).populate('memberID');

         res.send(displayed_activities);
            
        })

        routes.delete("/member/exercise_activity/delete/:id",async(req,res)=>{
            try {
                const id = req.params.id;
                await Activity.deleteOne({_id:id});
                res.status(200).send({success:true,msg:"Activity deleted"});
                res.json({ msg: 'Activity removed' });
            } catch (err) {
                console.error(err.message);
                res.status(400).send('Not Deleted, try again');
            }
        
        })


        routes.put("/member/edit_exercise_activity/:id",async(req,res)=>{

            try {
                const id = req.params.id;
                const updates = req.body;
                const options = {new: true};
                 
                const result = await Activity.findByIdAndUpdate(id,updates,options);
            
                res.send(result);   
                console.log(result);
            
            } catch (error) {
                console.log(error.message);
            }
            });

            module.exports = routes