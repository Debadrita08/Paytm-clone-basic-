
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { HeadingComponent } from "../components/HeadingComponent"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{
    const navigate = useNavigate();
    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
       
    <div className=" flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <HeadingComponent label={"Signup"}></HeadingComponent>
    <SubHeading text={"Enter your information to create an account"}></SubHeading>
    <Inputbox onPress={(e)=>{
        setfirstname(e.target.value);
    }}text={"FirstName"} placeholder={"John"}></Inputbox>
    <Inputbox onPress={(e)=>{
        setlastname(e.target.value);
    }} text={"LastName"} placeholder={"Doe"}></Inputbox>
    <Inputbox onPress={(e)=>{
        setusername(e.target.value);
    }} text={"Username"} placeholder={"abc@gmail.com"}></Inputbox>
    <Inputbox onPress={(e)=>{
        setpassword(e.target.value);
    }} text={"Password"} placeholder={"123456"}></Inputbox>
    <Button onclick={
        async ()=>{
          const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstname,
                lastname,
                password
            })
            localStorage.setItem("authtoken",response.data.token);

            navigate("/signin");
            
        }
        

    } label={"Signup"}></Button>
    <BottomWarning label={"Already signed in?"} to={"/signin"} buttonText={"Signin"} ></BottomWarning>
    
    </div>
    </div>
    </div>
}