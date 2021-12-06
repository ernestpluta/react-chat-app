import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
// routes
import Login from './pages/login/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// components
import Navbar from './components/NavbarComp';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import { doc, onSnapshot } from '@firebase/firestore';
// import { auth, db } from './firebase/firebase';


function App() {
// const {isAuthed, setIsAuthed} = useAuth()
console.log(localStorage.userAuthenticated)
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={localStorage.userAuthenticated ? <Home/> : <Navigate to="/login" element={<Login/>}/> }/>
        <Route path="/login" element={!localStorage.userAuthenticated ? <Login/> : <Navigate to="/dashboard" element={<Dashboard/>}/>}/>
        <Route path="/signup" element={!localStorage.userAuthenticated ? <Signup/> : <Navigate to="/dashboard" element={<Dashboard/>}/>}/>
        <Route path="/dashboard" element={localStorage.userAuthenticated ? <Dashboard/> : <Navigate to="/login" element={<Login/>}/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
