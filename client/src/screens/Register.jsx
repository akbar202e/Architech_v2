import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import '../assets/css/login.css';
import signImg from '../assets/daftar/DaftarImg.png';
import logo from '../assets/ArchitechLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
export function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axios
      .post('http://localhost:3001/register', { nama, email, hp, password })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
                    <h2 className='text-light fw-bold'>Daftar</h2>
                    <input 
                      type="text" 
                      placeholder='Nama' 
                      value={nama} 
                      onChange={(e) => setNama(e.target.value)} 
                    />
                    <input 
                      type="email" 
                      placeholder='Email' 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                      type="tel" 
                      placeholder='hp' 
                      value={hp} 
                      onChange={(e) => setHp(e.target.value)} 
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                   
                    <Link className="border-0 px-5 py-1 text-light fs-5 rounded-5" style={{ background: '#B1907F', textDecoration:'none' }} type='submit' to='/' onClick={handleRegister}>
                    Daftar
                    </Link>
                    <p>Punya Akun? <Link to='/' style={{textDecoration:'none', color:'#735F4D', fontWeight:'bold'}}>Masuk</Link></p>
                </div>
            </div>
        </div>
    </section>
    </div>
);
}

