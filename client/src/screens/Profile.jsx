import React from "react";
import "../assets/css/profile.css";
import loginImg from "../assets/login/loginImg.png";
import FooterC from "../components/FooterC";
import logo from "../assets/profile.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavbarC from "../components/NavbarC";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const {email,nama,hp,password} = useAuth();
  return (
    <div>
      <NavbarC/>
      <section id="profile">
        <div
          className="container d-flex px-5 justify-content-center"
          style={{
            width: "55rem",
            backgroundColor: "#735f4d",
            borderRadius: "50px",
          }}
          id="loginContainer"
        >
          <div className="loginImg1 d-flex flex-column justify-content-center">
            <img src={loginImg} alt="" />
          </div>
          <div className="loginCard1 p-4 text-center">
            <div className="loginForm1 d-flex flex-column gap-4 p-5">
              <span style={{backgroundColor:'#B1907F', width:'max-content', alignSelf:'center', borderRadius:'10px'}}>
              <FontAwesomeIcon className='m-2' icon={faUser} size="2xl" style={{color: "#ffffff",}} />
              </span>
              <input type="text" placeholder="" value={nama} disabled />
              <input
                type="text"
                placeholder=""
                value={email}
                disabled
              />
              <input type="text" placeholder="" value={hp} disabled/>
            </div>
          </div>
        </div>
      </section>
      <FooterC />
    </div>
  );
};

export default Profile;