import React from "react";

import { Button, Image } from "react-bootstrap";

import { Link } from "react-router-dom";

import NavbarC from "../components/NavbarC"
import FooterC from '../components/FooterC';

import Porto1 from '../assets/portofolio/Porto1.png';
import Porto2 from '../assets/portofolio/Porto2.png';
import Porto3 from '../assets/portofolio/Porto3.png';
import Porto4 from '../assets/portofolio/Porto4.png';

import '../assets/css/Portofolio.css';

function Portofolio() {
  return (
    <div className="portofolio">
        <NavbarC/>
        <section id="section-one">
                <div className="container py-5 d-flex flex-wrap gap-4 justify-content-center">
                    <SectionOne kategori='Minimalis' to='/minimalis' img={Porto1}/>
                    <SectionOne kategori='Klasik' to='/klasik' img={Porto2}/>
                    <SectionOne kategori='Industrial' to='/industrial' img={Porto3}/>
                    <SectionOne kategori='Interior' to='/interior' img={Porto4}/>
                </div>
             </section>
        <FooterC/>
    </div>
  )
}

const SectionOne = (props) => {
  return (
      <div className="section-card d-flex flex-column pt-4" align="center">
          <h3 className='fw-bold'>{props.kategori}</h3>
          <Link to={props.to}><Button className='border-0 px-3 py-1 fs-6 rounded-5'>Selengkapnya</Button></Link>
          <img src={props.img}/>
      </div>
  );
}

export default Portofolio