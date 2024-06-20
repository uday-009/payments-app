import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {

    const navigate = useNavigate();

    const defaultUser = {
      username: '',
      password: ''
    }

    const [user, setUser] = useState(defaultUser);

    const handleOnChange = (e) => {
      const {value, name} = e.target;
      setUser(prev => ({
        ...prev,
        [name]: value
      }))
    }

    useEffect(() => {
      const local = localStorage.getItem("token");
      if(local){
        navigate("/dashboard")
      }
    }, [])

    const handleSubmit = async () => {

      
      
      Object.entries(user).map(([l,v],index) => {
        if(v === undefined || v === ""){
         return 
        }
      })

      const res = await axios.post("http://localhost:5000/app/v1/user/signin", user);

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", res.data.user)
      navigate("/dashboard")
    }



  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-120 text-center p-2 h-max px-8">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"udaymaroju9@gmail.com"} name={"username"} onChange={handleOnChange} />
          <InputBox label={"Password"} placeholder={"1234567"} name={"password"} onChange={handleOnChange} />

          <div className="pt-4">
            <Button label={"Sign Up"} onClick={handleSubmit} />
          </div>
          <BottomWarning
            label={" Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
