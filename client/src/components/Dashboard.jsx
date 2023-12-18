import React from 'react';
import '../assets/css/dashboard.css'
import home from '../assets/dashboard/home.png';
import edit from '../assets/dashboard/edit.png';
import kategori from '../assets/dashboard/kategori.png';
import admin from '../assets/dashboard/admin.png';
import produk from '../assets/dashboard/produk.png';
import customer from '../assets/dashboard/customer.png';
import transaction from '../assets/dashboard/transaction.png';
import logout from '../assets/dashboard/logout.png';
import profil from '../assets/dashboard/profilePict.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Dashboard = (props) => {
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);

  const toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`;
    if (key === 'leftOpen') {
      setLeftOpen(!leftOpen);
    } else if (key === 'rightOpen') {
      setRightOpen(!rightOpen);
    }
  };

  let nama = '';
  const auth = useAuth();
  if (auth) {
    nama = auth.nama;
  }

  return (
    <div id='layout'>
      <div id='left' className={leftOpen ? 'open' : 'closed'}>
        <div className='icon' onClick={toggleSidebar}>
          &equiv;
        </div>
        <div className={`sidebar ${leftOpen ? 'open' : 'closed'}`}>
          <div className='header'>
            <h3 className='title'>Architech</h3>
          </div>
          <div className='content'>
            <div className="barProfile d-flex pb-3 mb-3">
              <span>
                <img src={profil} alt="" />
              </span>
              <p>{nama}</p>
            </div>              
            <BarSelect to='/dashboard' img={home} desc='Home'/>
            <BarSelect to='/kategori' img={kategori} desc='Data Kategori'/>
            <BarSelect to='/produk' img={produk} desc='Data Produk'/>
            <BarSelect to='/customer' img={customer} desc='Data Customer'/>
            <BarSelect to='/transaksi' img={transaction} desc='Transaksi'/>
            <BarSelect to='/profil-admin' img={admin} desc='Data Admin'/>
            <BarSelect to='/profil-edit' img={edit} desc='Edit Profil'/>
            <BarSelect to='/' img={logout} desc='Logout'/>
          </div>
        </div>
      </div>

      <div id='main'>
        <div className='header'>
          <h3
            className={`
              title
              ${'left-' + (leftOpen ? 'open' : 'closed')}
              ${'right-' + (rightOpen ? 'open' : 'closed')}
            `}
          >
            Admin
          </h3>
        </div>
        <div className='content'>
          {props.isi}
        </div>
      </div>
    </div>
  );
}

const BarSelect = (props) => {
  return (
    <Link to={props.to} style={{textDecoration:'none'}}>
      <div className="barSelect d-flex my-1">
        <span>
          <img src={props.img} />
        </span>
        <p className='text-light mx-3'>{props.desc}</p>
      </div>
    </Link>
  );
}

export default Dashboard;