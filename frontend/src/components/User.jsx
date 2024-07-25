import { useState } from "react"
import { Button } from "./Button"
import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const User = ()=>{
    const [users,setusers]=useState([]);
    const[filter,setfilter]=useState(" ");
    
    useEffect( ()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                authorization: "Bearer " + localStorage.getItem("signintoken")
            }
        })
        .then(response => {setusers(response.data.user)})
    },[filter]);
    return <>
    <div className="font-bold flex flex-col my-2 mx-4">Users</div>
    <div className="px-4">
    <input onChange= {(e)=>{
        setfilter(e.target.value);
    }} placeholder = "Search for users" className="w-full border-slate-200 border rounded px-2 py-1 "></input>
    </div>
    <div>{users.map(users => <Users users={users}></Users>)}</div>
    <div></div>
    </>
} 

function Users({users}){
    const navigate = useNavigate();
    return <div className="flex justify-between">
         <div className="flex">
            <div className="bg-slate-200 w-10 h-10 rounded-full flex justify-center mx-4 my-4">
                <div className="flex flex-col justify-center h-full text-lg">
                     {users.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center text-md font-bold">
                {users.firstname} {users.lastname}
            </div>
         </div>
         <div className="flex flex-col justify-center h-full">
            <Button onclick={()=>{
              navigate("/sendmoney?firstname="+users.firstname+"&lastname="+users.lastname+"&id="+users._id);
            }} label={"Send Money"}></Button>
         </div>
    </div>
}