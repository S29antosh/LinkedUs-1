const  mongoose =require('mongoose');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const multer=require('multer')

let SECRETE_KEY='asdfghjklqwertyuiopzxcvbnmqwerrttyuioasdfghjjkl';

//schema is the structure of json document 
//newschema is instance 
const newSchema =new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        }
        ,email:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true,
            unique:true
        },
        repassword:
        {
            type:String,
            required:true,
            unique:true
        }
        ,
        // //buffer -binary data
        // image: {
        //     data: {
        //         type: String,
        //         required: true
        //     }},
        tokens:[
            {
                token:
                {
                    type:String,
                    required:true
                }
            }
        ]
       
    }
)




//we are hashing the password 
newSchema.pre('save',async function(next)
{
   if (this.isModified('password'))
   {
    this.password= await bcrypt.hash(this.password,12);
   }
   next();
});


//we are genetrating a token 
//normal arrow as it doesnt work with this
newSchema.methods.generateAuthToken =async function ()
{
    try
    {
        //finally genetrating a token 
        //payload-unique,secretkey
        //here this._id is referreing to the email of login 
        let token =jwt.sign({_id:this._id},SECRETE_KEY)
        //to add the token in database from token
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token ;

       
        

    }

    catch(err)
    {
        console.log(err);
    }
}


//define a collection of data and export and model is a keyboard to define our collection
const User = mongoose.model("User ",newSchema)
module.exports =User ;




