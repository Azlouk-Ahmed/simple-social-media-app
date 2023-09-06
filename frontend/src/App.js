import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';


function App() {
  const {dispatch,user } = useAuthContext();
  useEffect(() => {
    
    if(localStorage.length>0){
      // console.log(JSON.parse(localStorage.getItem("user")));
      // console.log(user);
      dispatch({type: "LOGIN",payload: JSON.parse(localStorage.getItem("user"))})
    }
  }, [dispatch])
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user? <Signup /> : <Navigate to="/" />} 
              />
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/profile" element={user? <UserProfile /> : <Navigate to="/login" />}/>
            <Route path='/profile/edit' element={user? <EditProfile /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

