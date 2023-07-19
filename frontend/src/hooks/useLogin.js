import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(null)
    const {dispatch} =  useAuthContext();

    const login = async (email, password) => {
        setloading(true);
        seterror(null);
        const response =await fetch('api/user/login',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email,password})
        });
        const json = await response.json();
        if(!response.ok){
            setloading(false);
            seterror(json.error);

        }
        if(response.ok) {
            localStorage.setItem("user",JSON.stringify(json));
            setloading(false);
            dispatch({type: "LOGIN",payload: json})
        }

    }
    return {login,loading,error};
}