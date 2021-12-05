import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
// routes
import Login from './pages/login/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// components
import Navbar from './components/NavbarComp';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { auth, db } from './firebase/firebase';

function App() {
const {currentUser} = useAuth()

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={currentUser ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/dashboard" element={currentUser ? <Dashboard/> : <Navigate to="/login" element={<Login/>} replace={true}/>}/>
        <Route path="/login" element={!currentUser? <Login/> : <Navigate to="/dashboard" element={<Dashboard/>} replace={true}/>}/>
        <Route path="/signup" element={!currentUser ? <Signup/> : <Navigate to="/dashboard"/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
