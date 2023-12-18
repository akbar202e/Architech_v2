import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import logo from '../../assets/ArchitechLogo.png'
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

const KontenEdit = () => {
    const {email} = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
  
    const handleEdit = () => {
      axios
      .post('http://localhost:3001/edit-password', { email,oldPassword,newPassword})
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
    return (
        <div className="container content2 p-5">
            <h2 className='text-light'>Data Admin</h2>
            <hr/>
            <div className='content3 rounded-5 p-4 row overflow-hidden mb-5 py-5'>
            <div align='center' className="content3text px-3">
                <img src={logo} style={{width:'12rem'}}/>
                <h2 className='text-light my-4'>Edit Profile</h2>
                <div className='d-flex flex-column gap-3 px-5'>
                    <input type="hidden" value={email}/>
                    <input 
                    className='rounded-pill border-0 p-1 text-center'
                    type="password" 
                    placeholder="Old password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)}
                    />
                   <input 
                    className='rounded-pill border-0 p-1 text-center'
                    type="password" 
                    placeholder="New password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                    <div align='end'><Button className='border-0 px-4 py-1 mt-3 fs-6 rounded-5' style={{background:'#B1907F'}} onClick={handleEdit}>Simpan</Button></div>
            </div>
            </div>
        </div>
    );
}

const EditProfile = () => {
    return (
        <Dashboard isi={<KontenEdit/>}/>
    );
}

export default EditProfile;
