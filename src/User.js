import React, { use } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './firbase';
import { useNavigate } from 'react-router';



function User() {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handlelogOut = async () =>{
        try {
            await signOut(auth)
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login'); 
        }  catch (error) {
            console.error("Error during sign-out:", error);
        }
    }


  return (
    <div>
        <h1>User Profile</h1>
        <hr />
        {user && (<div>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <img src={user.photoURL} alt="User Profile" />
        </div>)}
        <button onClick={handlelogOut}>Log Out</button> 
        

    </div>
  )
}

export default User