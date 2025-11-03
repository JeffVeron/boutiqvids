import React from 'react'
import { Link } from 'react-router-dom';
import { PiVideoBold } from "react-icons/pi";
import { COLOURS } from './colours';



function LogoPage() {
  return (
    <div style={styles.container}>


          <Link to="/mainFeed" /* style={{ textDecoration: 'none', width: '200px' }} */    >
           <PiVideoBold size={100} color={COLOURS.primary.color3} />
          </Link>
     
      <h1 style={{ color: COLOURS.primary.color3 }}>BOUTIQVIDS</h1>
      <div style={styles.buttonContainer}>
        <Link to="/signup" style={{ textDecoration: 'none', width: '200px' }}>
          <button style={styles.button}>Sign Up</button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', width: '200px' }}>
         <button style={styles.button}>Login</button>
        </Link>

        <Link
        to={'/productList'}
        >Product List</Link>
       
      </div>
    </div>
  );
}


export default LogoPage  
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.primary.color2,
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'absolute',
    bottom: '48px',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: '200px',
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
    display: 'block',
  },
};