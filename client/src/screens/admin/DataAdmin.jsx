import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import logo from '../../assets/ArchitechLogo.png'
import { useAuth } from '../../hooks/useAuth';

const KontenAdmin = () => {
    const { nama } = useAuth();
    return (
        <div className="container content2 p-5">
            <h2 className='text-light'>Data Admin</h2>
            <hr/>
            <div className='content3 rounded-5 p-4 row overflow-hidden mb-5 py-5'>
            <div align='center' className="content3text px-3">
                <img src={logo} style={{width:'12rem'}}/>
                <h2 className='text-light my-4'>Profile</h2>
                <div className='bg-light w-25 rounded-pill fw-bold'>
                    <p>{nama}</p>
                </div>
                <div className='bg-light w-25 rounded-pill fw-bold'>
                    <p>Admin</p>
                </div>
            </div>
            </div>
        </div>
    );
}

const DataAdmin = () => {
    return (
        <Dashboard isi={<KontenAdmin/>}/>
    );
}

export default DataAdmin;
