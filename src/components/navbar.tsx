import {Link} from "react-router-dom";
import {auth} from "../config/firebase"; //auth contains all the information of user
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";

export const Navbar=()=>{
    const [user]=useAuthState(auth); //update the user with new acc everytime we login with other acc
     
    const signuserOut=async()=>{
       await signOut(auth);
     }
    return (
        <div className="navbar">
            <div className="links">
            <Link className="link" to="/" > Home</Link>
            {!user? (
            <Link className="link" to="/login">Login</Link>):
           ( <Link className="link" to="/createpost" > Create Post</Link>
            )}
            </div>
             <div className ="user">
                { user && ( 
                    <>
                <p>{user?.displayName}</p>
                <img src={user?.photoURL ||""} height="25" width="25"/>
                <button onClick={signuserOut}>Log out</button>
                </>
  )}
             </div>
        </div>
       
     );
    
};