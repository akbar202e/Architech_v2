import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import '../assets/css/login.css';
import signImg from '../assets/login/LoginImg.png';
import logo from '../assets/ArchitechLogo.png';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import NavbarC from '../components/NavbarC'

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, logout, isAuthenticated, role } = useAuth();

  const handleLogout = () => {
    logout();
    clearFields();
    toast.warn('Anda telah logout');
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = () => {
    axios
      .post('http://localhost:3001/login', { email, password })
      .then((res) => {
        const { token } = res.data;
        login(token);
        toast.success('Login Berhasil');
        toast.success('Selamat Datang \n'+email);
        
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        toast.error('Mohon mendafar jika tidak memiliki akun');
      });
  };

  const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      toast.success('Your Token is valid');
    } else {
      toast.error('No private route access');
      toast.error('Register and login to access the private route');
      toast.error('You have been redirected to the registration screen.');
    }
  };

  return (
    <div>
    <section id="login">
    <div className="container d-flex px-5 justify-content-center" id='loginContainer'>
        <div className="loginImg d-flex flex-column justify-content-center">
            <img src={signImg} alt="" />
        </div>
        <div className="loginCard p-4 text-center">
            <div className="loginForm d-flex flex-column gap-4 p-5">
                <img src={logo}/>
                <h2 className='text-light fw-bold'>Login</h2>
                <input 
                  type="email" 
                  placeholder='Email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={isAuthenticated}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isAuthenticated}
                />
               
                <Button className="border-0 px-5 py-1 fs-5 rounded-5" style={{ background: '#B1907F' }} type='submit' onClick={handleLogin}>
                Login
                </Button>
                {isAuthenticated ? (
                  <Button variant='danger' className='rounded-5 fs-6 fw-bold' onClick={handleLogout}>Logout</Button>
                ):<></>}
                <p>Belum Punya Akun? <Link to='/register' style={{textDecoration:'none', color:'#735F4D', fontWeight:'bold'}}>Daftar</Link></p>
            </div>
        </div>
    </div>
        {role === 'admin' && isAuthenticated ? 
        <Link to='/dashboard'>
          <Button className='adminButton border-0 px-2 py-1 rounded-2' style={{background:'#B1907F'}}>Admin</Button>
        </Link> : <></>}
</section>
</div>
  );
}

export default LoginPage;