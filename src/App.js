 
import LogoPage from './LogoPage'
import {Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import MainFeed from './MainFeed';  
import VideoDetail from './video/[id]';
import GoogleLog from './googleLog';
import Protected from './protected';
import User from './User';
import ProductsList from './ProductsList';


function App() {
  return (
    <div>
       {/* <LogoPage /> */}

           <Routes>
        <Route path="/" element={<LogoPage />} />
        <Route path="/" element={<Protected/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainFeed" element={<MainFeed />} />
         <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/googleLog" element={<GoogleLog />} />
          <Route path="/user" element={<User />} />
           <Route path="/productList" element={<ProductsList />} />
      </Routes>
    </div>
  );
}
  

export default App;
