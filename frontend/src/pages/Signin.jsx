import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { HeadingComponent } from "../components/HeadingComponent"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export const Signin = ()=>{
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [token,settoken]=useState("");
    const navigate =useNavigate();
    

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max p-2 px-4"> 
            <HeadingComponent label={"Signin"} ></HeadingComponent>
            <SubHeading text={"Enter your credentials to access your account"}></SubHeading>
            <Inputbox onPress = {(e)=>{
               setemail(e.target.value)
            }} text={"Email"} placeholder={"abcd@gmail.com"}></Inputbox>
            <Inputbox  onPress={(e)=>{
                setpassword(e.target.value)
            }}text={"Password"} placeholder={"123456"}></Inputbox>
            <Button onclick = { 
                async ()=>{
                   try{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username:email,
                    password:password
                })
                localStorage.setItem("signintoken",response.data.token);
            

                try{

                const receive = await axios.post("http://localhost:3000/api/v1/user/me",
                    {},
                    {
                    headers:{
                        authorization: "Bearer "+ localStorage.getItem("signintoken")
                    }
                })

                navigate("/dashboard?firstname="+receive.data.firstname+"&lastname="+receive.data.lastname+"&id="+receive.data.id);

            }
            catch(err){
                console.log(err);
               navigate("/signup")
            }}
            catch(err){
                console.log(err);
                navigate("/signup");
            }
                

                
               
               
            }} label={"Signin"}></Button>
            <BottomWarning  label={"Don't have an account?"} buttonText={"Signup"} to={"/signup"} ></BottomWarning>
            </div>
        </div>

    </div>
}