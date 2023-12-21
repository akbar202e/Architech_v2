import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/kontak.css";
import loginImg from "../assets/kontak.png";
import logo from "../assets/ArchitechLogo.png";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import axios from 'axios';

const Kontak = () => {
  const {email,nama} = useAuth();
  const [pesan, setPesan] = useState('');

  const handlePesan = () => {
    axios
    .post('http://localhost:3001/contact', { nama,email,pesan})
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div>
      <NavbarC />
      <section id="contact">
        <div
          className="container d-flex px-5 justify-content-center"
          style={{
            width: "60rem",
            backgroundColor: "#735f4d",
            borderRadius: "50px",
          }}
          id="loginContainer"
        >
          <div className="loginImg3 d-flex flex-column justify-content-center">
            <img src={loginImg} alt="" />
          </div>
          <div className="loginCard3 p-4 text-center">
            <div className="loginForm3 d-flex flex-column gap-4 p-4">
              <img src={logo} />
              <h2 className="text-light fw-bold">Hubungi Kami</h2>
              <input type="text" placeholder="" value={nama} disabled />
              <input type="text" placeholder="" value={email} disabled />
              <textarea
              className="form-control"
              placeholder="Pesan" 
              value={pesan} 
              onChange={(e) => setPesan(e.target.value)}
              />
                <Button
                  className="submit border-0 px-5 py-1 fs-5 rounded-5"
                  onClick={handlePesan}
                  style={{ background: "#B1907F" }}>
                  Kirim
                </Button>
            </div>
          </div>
        </div>
      </section>
      <FooterC />
    </div>
  );
};

export default Kontak;