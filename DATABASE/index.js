import cors from "cors"
import mongoose from 'mongoose'
import express from "express"
import CRYPTO from 'crypto'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/LoginSignUpDB",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}, ()=>{
    console.log("DB connected")
})



//schema


const userSchema = new mongoose.Schema({
    name:String,
    id : String,
    email:String,
    password:String,
    address : String
})

const User =new mongoose.model("User", userSchema)

// Routes

app.post("/login",(req,res)=>{
    let {email,password,address}=req.body
    password = CRYPTO.createHash('sha256').update(password).digest('hex')
    User.findOne({address:address},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"login successful",user:true})
            } else{
                res.send({message:"Invalid Credentials"})
            }
        }
        else{
            res.send("user not registered")
        }
    })
})  

app.post("/register",(req,res)=>{
    let {name,id,email,password,address}=req.body
    password = CRYPTO.createHash('sha256').update(password).digest('hex')
    User.findOne({address:address},(err,user)=>{
        if(user){ 
            res.send({user: true})
        }

    else{
        const user = new User ({
        name,
        id,                                      //name=name case we use name,
        email,
        password,
        address
        })

        user.save(err =>{
            if(err) {
                res.send(err)
            } else{
                res.send({message: "successfully reg"})
            }
        })
        }
    })
})


app.listen(9000,()=>{
console.log("BackEnd Running")
})