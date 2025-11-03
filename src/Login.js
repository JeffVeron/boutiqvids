import React, { use } from 'react'
import { COLOURS } from './colours';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import { auth, googleAuthProvider } from './firbase';
import { signInWithPopup } from "firebase/auth"; 


function Login() {

//const navigate = useNavigate();
const handleSignINWithGoogle = async() => {
  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log(result)
    //const user = result.user;
    localStorage.setItem('token', result.user.accessToken);
    localStorage.setItem('user', JSON.stringify(result.user));
   // navigate('/')
    window.location.href = '/mainFeed'; // Redirect to main feed after login
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }    

}



  return (
    <div style={styles.container}>
      <h1 style={{ color: COLOURS.primary.color3 }}>Log In</h1>
      <div style={styles.buttonGroup}>
       
     {/*   <Link to="/googleLog" style={styles.link}> */}
          <button
          onClick={handleSignINWithGoogle}
          style={styles.authButton}>
            <FcGoogle style={{ marginRight: '8px', fontSize: '1.5em' }} />
            Continue with Google
          </button>
       {/*  </Link> */}
        <Link to="/auth/apple" style={styles.link}>
          <button style={styles.authButton}>
            <FaApple style={{ marginRight: '8px', fontSize: '1.5em' }} />
            Continue with Apple
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.primary.color2,
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '32px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  authButton: {
    width: '260px',
    padding: '12px 0',
    borderRadius: '24px',
    border: 'none',
    backgroundColor: COLOURS.primary.color3,
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'background 0.2s',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};

export default Login;    
 