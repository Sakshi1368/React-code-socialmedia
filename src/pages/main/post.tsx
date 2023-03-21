import { addDoc, getDocs,collection ,query, where, doc, deleteDoc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {Post as Ipost} from "./main"

interface Props{
  post:Ipost,
}

interface Like{
    userId:string;
    likeId:string;
}
export const Post=(props:Props)=>{
    const{post}=props;
    const [user]=useAuthState(auth);

    const[likes,setLikes] = useState<Like[]|null>(null);

    const likesref=collection(db,"likes");


    const likesDoc=query(likesref,where ("postId","==",post.id)); //to get the likes

    const getLikes=async()=>{
       const data= await getDocs(likesDoc);
       setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id}))); 
    }
       
    const addlike=async()=>{
        try{
       const newDoc= await addDoc(likesref,{userId:  user?.uid, postId: post.id,});
       if(user){
        setLikes((prev)=>prev?[...prev,{ userId: user?.uid, likeId:newDoc.id}] : [{ userId:user?.uid,likeId:newDoc.id}] //update
        );
    }
} catch(error){
    console.log(error);
}
};

const removelike=async()=>{
    try{
        const liketodeleteQuery=query(likesref,
            where("postId","==",post.id),
            where("userId","==",user?.uid)
            );
            const liketodeleteData=await getDocs(liketodeleteQuery);
         const likeId=liketodeleteData.docs[0].id;
        const liketodelete =doc(db,"likes",liketodeleteData.docs[0].id)
    await deleteDoc(liketodelete);
   if(user){
    setLikes((prev)=>prev&& prev.filter((like)=>like.likeId !== likeId));
   }
} catch(error){
console.log(error);
}
};

    const hasUserLiked= likes?.find((like)=>like.userId===user?.uid);


    useEffect(() => {
      getLikes();
      }, [])
    

    return(
<div>
    <div className="title">
        <h1>{post.title}</h1>
    </div>
    <div className="body">
       <p>{post.description}</p>
    </div>
    <div className="footer">
        <p>@{post.username}</p>
           {""}
        <button onClick={(!hasUserLiked?addlike:removelike)}>
            { hasUserLiked ? <>&#128078;</>: <>&#128077;</>} 
            {""} 
            </button>
        {likes && <p> likes:{likes.length}</p>}
    </div>
</div>
    ) 
}


