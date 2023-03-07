require('dotenv').config({path: './config/key.env'})
const express = require('express')
const bodyParser = require("body-parser");
const multer = require('multer');
const cookieParser = require('cookie-parser')
// const storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req,file, cb){
//         cb(null, Date.now() + file.originalname);
  
//     }
// })
// const upload = multer({storage: storage});





const app = express()
// app.use(express.json())
app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
const MyDB = require('./db')
const routes = require('./routes/api/member')
const routesactivity = require('./routes/api/activity')
const routesauth = require('./routes/api/auth')
const Auth = require('./middleware/authentication')



// const Member = require('./routes/apis/member')
const cors = require("cors");
app.use(cors({origin:"",method:""}))
 app.use(["/api/activity/member/exercise_activity","/api/member/exercise_activities/display","/api/member/exercise_activity/delete/:id","/api/member/edit_exercise_activity/:id"],Auth)
MyDB.main();

app.use('/api/member', routes);
app.use('/api/activity', routesactivity);
app.use('/api/auth', routesauth);




app.get("/",(req,res) =>{
    console.log(req.cookies)
    console.log(req.headers["cookie"])
    res.send("Allowed")
})




app.use(cors({origin:"",method:""}))





const PORT = 8000
app.listen(PORT, console.log(`server running in`));



