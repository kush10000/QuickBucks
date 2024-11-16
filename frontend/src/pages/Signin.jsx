import { useState } from "react"
import { Heading } from "../components/Heading"
import axios, { Axios } from "axios"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import ButtonWarning from "../components/ButtonWarning"
import { useNavigate } from "react-router-dom"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function Signin(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    return <div className=" h-screen bg-gray-600 flex justify-center">
        <div className="flex flex-col justify-center ">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"}/>
                <SubHeading label={"enter your credentials to access your account"} />
                <InputBox label={"Email"} onChange={(e)=>{
                    setEmail(e.target.value)
                }} placeholder={"donjon@gmail.com"}/>
                <InputBox label={"Password"} onChange={(e)=>{
                    setPassword(e.target.value)
                }} placeholder={""}/>
                <Button label={"Sign in"} handleClick={async ()=>{
                    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                        username:email,
                        password
                      });
                      localStorage.setItem("token", response.data.token)
                        navigate("/dashboard");
                    }
                }/>
                <ButtonWarning label={"Don't have an account? "} buttonText={"Sign Up"} to={"/signup"}/>
            </div>

            
        </div>
    </div>
}