import React from 'react'
import { COLOURS } from './colours';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from './firbase';
import { signInWithPopup } from "firebase/auth"; 

function SignUp() {


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
      <h1 style={{ color: COLOURS.primary.color3 }}>Sign Up</h1>
      <div style={styles.buttonGroup}>


    {/*  <Link to="/googleLog" style={styles.link}>
              <button style={styles.authButton}>
                <FcGoogle style={{ marginRight: '8px', fontSize: '1.5em' }} />
                Continue with Google
              </button>
            </Link> */}


            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const fullName = fd.get('fullName')?.trim();
                const username = fd.get('username')?.trim();
                const email = fd.get('email')?.trim();
                const password = fd.get('password');
                const confirmPassword = fd.get('confirmPassword');

                if (!fullName || !username || !email || !password || !confirmPassword) {
                  alert('Please fill in all fields.');
                  return;
                }

                if (password !== confirmPassword) {
                  alert('Passwords do not match.');
                  return;
                }

                // Replace this with your signup logic (API call / firebase createUserWithEmailAndPassword, etc.)
                const signupData = { fullName, username, email };
                console.log('Sign up data:', signupData);

                // Example: store basic user info locally and redirect
                localStorage.setItem('signupUser', JSON.stringify(signupData));
                window.location.href = '/mainFeed';
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '260px',
                alignItems: 'stretch',
              }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', color: '#222' }}>
                Full name
                <input name="fullName" type="text" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '6px' }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', color: '#222' }}>
                Username
                <input name="username" type="text" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '6px' }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', color: '#222' }}>
                Email
                <input name="email" type="email" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '6px' }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', color: '#222' }}>
                Password
                <input name="password" type="password" required minLength={6} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '6px' }} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', color: '#222' }}>
                Confirm password
                <input name="confirmPassword" type="password" required minLength={6} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '6px' }} />
              </label>

              <button type="submit" style={{ marginTop: '6px', padding: '10px 0', borderRadius: '24px', border: 'none', backgroundColor: COLOURS.primary.color3, color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>
                Create account
              </button>
            </form>


          <button
          onClick={handleSignINWithGoogle}
          style={styles.authButton}>
            <FcGoogle style={{ marginRight: '8px', fontSize: '1.5em' }} />
            Continue with Google
          </button>

          

            
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

export default SignUp;    
 