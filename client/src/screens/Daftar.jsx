import React, { useState } from 'react';
import '../assets/css/login.css';
import loginImg from '../assets/daftar/daftarImg.png';
import logo from '../assets/ArchitechLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Daftar = () => {
    const navigate = useNavigate();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [hp, setHp] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isEmailValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleDaftar = async () => {
        if (!nama || !email || !hp || !password) {
            setError('Mohon lengkapi data');
            return;
        }

        if (!isEmailValid()) {
            setError('Email tidak valid');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/api/v1/register', {
                nama,
                email,
                hp,
                password,
            });

            console.log(response.data);
            const userInfo = `Full Name: ${nama}\nEmail: ${email}\nHP: ${hp}`;
            alert(userInfo);
            navigate('/home');
        } catch (error) {
            console.error(error.message);
            setError('Registrasi gagal. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section id="login">
                <div className="container d-flex px-5 justify-content-center" id='loginContainer'>
                    <div className="loginImg d-flex flex-column justify-content-center">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="loginCard p-4 text-center">
                        <div className="loginForm d-flex flex-column gap-4 p-5">
                            <img src={logo}/>
                            <h2 className='text-light fw-bold'>Daftar</h2>
                            <input type="text" placeholder='Nama Lengkap' value={nama} onChange={(e)=> setNama(e.target.value)} />
                            <input type="email" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                            <input type="text" placeholder='No.Hp' value={hp} onChange={(e)=> setHp(e.target.value)}/>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {error && <p className="text-danger">{error}</p>}
                            <Button className="border-0 px-5 py-1 fs-5 rounded-5" style={{ background: '#B1907F' }} onClick={handleDaftar} disabled={loading}>
                            {loading ? 'Loading...' : 'Daftar'}
                            </Button>
                            <p>Sudah Punya Akun? <Link to='/login' style={{textDecoration:'none', color:'#735F4D', fontWeight:'bold'}}>Masuk</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Daftar;

