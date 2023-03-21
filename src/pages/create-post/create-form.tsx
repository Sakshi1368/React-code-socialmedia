import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

interface CreateFormData{
    title:string;
    description:string;
}

export const CreateForm=()=>{
    const [user]=useAuthState(auth);
    const navigate=useNavigate();

    const schema=yup.object().shape(  //to validate the form
        {
         title:yup.string().required("you must add a title :(")  ,
         description:yup.string().required(" you must add a description :(") ,
         
        }
    );


    const {register,handleSubmit,formState:{errors}}= useForm<CreateFormData>({
        resolver:yupResolver(schema),
    });

    const postsref=collection(db,"posts");
       
    const oncreatepost=async(data:CreateFormData)=>{
        await addDoc(postsref,{
            ...data,
            username:user?.displayName,
            userId:user?.uid,

        });
        navigate("/");
    };
    
    return (
    <form onSubmit={handleSubmit(oncreatepost)}>
        <input placeholder ="Title..."{...register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..."{...register("description")}/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="submit" className="submit"/>

    </form>
    )
    
}

