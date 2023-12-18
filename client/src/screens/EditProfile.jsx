import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/editProfile.css";
import loginImg from "../assets/daftar/daftarImg.png";
import logo from "../assets/profile.png";
import FooterC from "../components/FooterC";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavbarC from "../components/NavbarC";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const UserEdit = () => {
  const {email,nama,hp} = useAuth();
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
    <div>
      <NavbarC/>
      <section id="editp">
        <div
          className="container d-flex px-5 justify-content-center"
          style={{
            width: "55rem",
            backgroundColor: "#735f4d",
            borderRadius: "50px",
          }}
          id="loginContainer"
        >
          <div className="loginImg2 d-flex flex-column justify-content-center">
            <img src={loginImg} alt="" />
          </div>
          <div className="loginCard2 p-4 text-center">
            <div className="loginForm2 d-flex flex-column gap-4 p-5">
              <span style={{backgroundColor:'#B1907F', width:'max-content', alignSelf:'center', borderRadius:'10px'}}>
              <FontAwesomeIcon className='m-2' icon={faUser} size="2xl" style={{color: "#ffffff",}} />
              </span>
              <input type="text" placeholder="" value={nama} disabled />
              <input
                type="email"
                placeholder=""
                value={email}
                disabled
              />
              <input 
                type="password" 
                placeholder="Old password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="New password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  className="border-0 px-5 py-1 fs-5 rounded-5"
                  style={{ background: "#B1907F" }}
                  onClick={handleEdit}
                >
                  Simpan
                </Button>
            </div>
          </div>
        </div>
      </section>
      <FooterC />
    </div>
  );
};

export default UserEdit;