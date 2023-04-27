const  express =require('express');
const cors=require("cors");
const  app =express();
const  mongoose =require('mongoose');
const  multer=require('multer');
app.use(cors())

//importing a image model
const User=require('./model/UserSchema.cjs')

const DB ="mongodb+srv://krishita:kiskid123@cluster0.ygfl7qi.mongodb.net/Linkedin?retryWrites=true&w=majority";
 

//to convert json into object
app.use(express.json());

//connected the router files
app.use(require('./router/auth.cjs'));

mongoose.connect(DB, { useNewUrlParser: true,
     useUnifiedTopology: true
     }).then (()=>
{
  console.log("connect")
}).catch((err)=>console.log('no connection'));


// //to use this model we use 

// const User=require('./model/Schema')



//while hosting we need separste port name 
const port =process.env.PORT||3800;



// Storage for images in db
const Storage = multer.diskStorage({
    destination: "upload",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: Storage,
    limits: { fileSize: 1024 * 1024 * 2 }, // Add limits for file size, if needed
    fileFilter: (req, file, callback) => {
        // Add fileFilter function to filter allowed file types, if needed
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            callback(null, true);
        } else {
            console.log('Only jpg and png files are supported');
            callback(null, false);
        }
    }
}).single('image'); // Update field name to match client-side form or request

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const newImage = new User({
                email: req.body.email,
                password: req.body.password,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            });
            newImage
                .save()
                .then(() => res.send("Successfully uploaded image"))
                .catch((err) => console.log(err));
        }
    });
});

//Middleware --checks whether we are done before thing to get that pages 
const middleware=(req,res,next)=>
{
    console.log("middleware");
    next();
}


app.get("/",(req,res)=>
{
    res.send("HomePage");
})

app.get("/login",middleware,(req,res)=>
{
    console.log("middleware1");
    res.send("login")
})

app.get("/signin",(req,res)=>
{
    res.send("signin ")
})
app.get("/upload",(req,res)=>
{
    res.send("upload ")
})

// if the user put url of the page which is not then this will show

app.get("*",(req,res)=>
{
    res.send("404 error page  ")
})


//making the server responds after they enter the url 

app.listen(port,()=>
{
    console.log(`Listening to port at ${port}`);
})