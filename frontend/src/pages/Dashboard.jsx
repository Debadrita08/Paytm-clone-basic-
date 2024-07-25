import { useSearchParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { User } from "../components/User"
import { useEffect,useState } from "react"
import axios from "axios"

export const Dashboard = ()=>{
    const [searchParams] = useSearchParams();
    const fname = searchParams.get("firstname");
    const lname = searchParams.get("lastname");
    const id = searchParams.get("id");
    const [balance,setbalance]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                authorization: "Bearer " + localStorage.getItem("signintoken")
            }
        }).then(response=> {setbalance((response.data.balance).toFixed(2))})
        //console.log(id);
    },[])
    return <div> 
        
        <Appbar name={fname}></Appbar>
        <Balance balance={"Rs "+balance}></Balance>
        <User ></User>
    
    </div>

}