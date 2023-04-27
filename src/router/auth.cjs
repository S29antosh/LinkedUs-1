const express =require('express');
const router =express.Router();
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const cors=require("cors");

router.get("/",(req,res)=>
{
    res.send("router");
})

//connecting the database
require('../app.cjs');

//schema
const User=require('../model/UserSchema.cjs');
//const User=require("../model/userSchema.cjs")

//to get the info fill by user 
router.get("/register",cors(),(req,res)=>{});
router.post("/register",(req,res)=>
{
    const{name,email,password,repassword}=req.body;

    //checking if user fill all the info
    if(!name||!email || !password ||!repassword)
    {
        return res.status(422).json({error:"Please fill all info"});
    }

    User.findOne({email:email}).then((userExist) =>
    {//checks whether the user has already made an account or not
           
        //if yes this executes
        if (userExist)
            {
                return res.status(422).json({error:"already existed"});
            } 

            //or else this one

            const user =new User({name,email,password,repassword})
            console.log(user)


            user.save().then(()=>{
                res.status(201).json({message:"user registered"})
            }).catch((err)=>res.status(500).json({error:"failewed"}));
    }).catch (err=>{console.log(err);});

});

//login checking 

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "please fill data" });
        }

        console.log(email);

        const userLogin = await User.findOne({ email: email });
        
        if (!userLogin) {
            res.status(404).json({ error: "wrong email" });
        } else {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(404).json({ error: "wrong password" });
            } else {
                const token = await userLogin.generateAuthToken();
                res.status(200).json({ message: "user login", token: token }); // Include the token in the response
            }
        }

    } catch (err) {
        console.log(err);
    }
});

module.exports =router;