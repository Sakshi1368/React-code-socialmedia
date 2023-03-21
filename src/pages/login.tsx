import {auth,provider} from "../config/firebase"; //to get the auth from firebase
import {signInWithPopup} from "firebase/auth";  //there are a lot of methods to signup we used sign up with popup

import {useNavigate} from "react-router-dom";


export const Login=()=>{

    const navigate=useNavigate();

    const signInWithGoogle=async()=>{
       const result=await signInWithPopup(auth,provider)
       console.log(result);
       navigate("/"); //redirect towadrs to home page
    }

    return <div><p>Sign in with Google to Continue</p>
    <button onClick={signInWithGoogle}>Sign in</button>
    </div>;
};