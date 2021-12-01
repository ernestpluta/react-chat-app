import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
// routes
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import PrivateRoute from './components/PrivateRoute';

// components
import Navbar from './components/NavbarComp';

function App() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
