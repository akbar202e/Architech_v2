import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tambah from '../../components/Produk/TambahProduk';
import EditCustomer from '../../components/Customer/EditCustomer';
import HapusCustomer from '../../components/Customer/HapusCustomer';
import TambahCustomer from '../../components/Customer/TambahCustomer';
const KontenCustomer = () => {
    const [customerData, setCustomerData] = useState([]);
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);
    const handleCloseTambah = () => setShowModalTambah(false);
    const handleCloseEdit = () => setShowModalEdit(false);
    const handleCloseHapus = () => setShowModalHapus(false);
    useEffect(() => {
        // Fetch data from the server when the component mounts
        fetch('http://localhost:3001/account')
          .then((response) => response.json())
          .then((data) => setCustomerData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []); // Empty dependency array to fetch data only once when the component mounts    
    return (
        <div className="container content2 p-5">
            <h2 className='text-light'>Data Customer</h2>
            <hr/>
            <div className='content3 rounded-5 p-4 row overflow-hidden mb-5'>
            <div className="content3text d-flex flex-column justify-content-center px-3 text-center ">
            <div align='end'>
                <Button className='border-0 px-4 py-1 fs-6 rounded-5' style={{background:'#B1907F'}} onClick={() => setShowModalTambah(true)}>Tambah Data
                </Button><TambahCustomer showTambah={showModalTambah} handleCloseTambah={handleCloseTambah} />
            </div>
                <table className='fs-5 my-2'>
                  <thead>
                   <tr>
                     <th>Nama</th>
                     <th>Email</th>
                     <th>No Hp</th>
                   </tr>
                  </thead>
                  <tbody>
                  {customerData.map((customer,index) =>(
                    <tr key={index}>
                        <td>{customer.nama}</td>
                        <td>{customer.email}</td>
                        <td>{customer.hp}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
                <div align='end'>
                <Button className='border-0 mx-2' style={{backgroundColor:'#B1907F'}} onClick={() => setShowModalEdit(true)}>
                    <FontAwesomeIcon className='' icon={faGear} size='lg'/>
                </Button><EditCustomer showEdit={showModalEdit} handleCloseEdit={handleCloseEdit} />
                <Button className='border-0 mx-2' style={{backgroundColor:'#B1907F'}} onClick={() => setShowModalHapus(true)}>
                    <FontAwesomeIcon className='mx-1' icon={faTrash} size='lg'/>
                </Button><HapusCustomer showHapus={showModalHapus} handleCloseHapus={handleCloseHapus} />
                </div>
            </div>
            </div>
        </div>
    );
}

const DataCustomer = () => {
    return (
        <Dashboard isi={<KontenCustomer/>}/>
    );
}

export default DataCustomer;
