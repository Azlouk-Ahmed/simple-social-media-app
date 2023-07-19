import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useSignUp = () => {
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(null)
    const {dispatch} =  useAuthContext();

    const signup = async (email, password,name ,surname ,img) => {
        setloading(true);
        seterror(null);
        const response =await fetch('api/user/signup',{
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email,password,name,surname,img})
        });
        const json = await response.json();
        if(!response.ok){
            setloading(false);
            seterror(json.error);

        }
        if(response.ok) {
            JSON.stringify(JSON.stringify(json))
            localStorage.setItem("user",JSON.stringify(json));
            setloading(false);
            dispatch({type: "LOGIN",payload: json})
        }

    }
    return {signup,loading,error};
}