import React ,{useState}from "react";
import {useNavigate} from 'react-router-dom';
import "../CSS files/Register.css";
import axios from "axios";
import Navigation_Bar from "../Components/Navigation_Bar";

export default function Register() {
  //useState hooks use garne -- input ko value change garna laii
  //axios 
  //cors , json through express


  const navigate=useNavigate();


  //inputs written by the user in frontered is stored 
  //in useStates there goes the inintial value of user
  const [user,setUser]=useState(
    { //key:"value"
      name:"",email:"",password:"",repassword:""  //information is stored in object 
    }
  );


  //let as value changes 
let name , value;
//function on onChange
  //it handles the inputs written by user and store it in variable 
  const handleInputs =(e)=>
  {
    //shows error 
    console.log(e);

    //name will changes into email ,name , password , repas..
    //as e.target.name == focuses on the info stored in attribute on name 
    name=e.target.name; 

    //storing the value stored in name attribute
    value=e.target.value;

    //storing the value in respective name 
    //[name]-dyanamic data 
    //spread syntax ('...')--create a shallow copy of the exisiting 
    //user object and then update a property name with the value 
    //directly value changes nagarna lai spread syntax use gareko 
    setUser({...user,[name]:value});

  }

const PostData =async(e)=>
{
  //to prevent default behavior of the event like reloading of a page 
  e.preventDefault();

  //user holds the value of each properties and storing them in this property
  const {name,email,password,repassword}=user;
 try 
 {

  if(password!==repassword)
  {alert('password and repassword');}

  //axios-makes the http requests on the localhost
    const response= await axios.post("http://localhost:3800/register",
  {
    name,email,password,repassword
  });
  console.log(response.data);
  alert("sucess");
  }
  

 
 catch(e){


console.log(e);

  alert("failed"+e);
 }
}


  return (
    <div>
      <div className="layout">
        <Navigation_Bar
        name="Login"
        />
        <div className="Register_page">
          <h1>Sign Up</h1>
          <form method="POST" onSubmit={PostData}>
            <div className="input">
              <input type="text"  name= "name" placeholder="Full Name"
              value={user.name}
              onChange={handleInputs}></input>
              <input type="email"  name= "email" placeholder=" Email"
              value={user.email}
              onChange={handleInputs}></input>
            </div>
            <div className="input">
              <input type="password" name= "password" placeholder="Password"
              value={user.password}onChange={handleInputs}></input>
              
              <input type="password" name= "repassword" placeholder="Re-enter Password"
              value={user.repassword}onChange={handleInputs}></input>
            </div>
            <button type="submit" onClick={PostData}>Sign Up</button>
          </form >
        </div>
      </div>
    </div>
  );
}
//The onChange event in React detects when the value of an input element changes. 