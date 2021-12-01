import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
// routes
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';

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
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
