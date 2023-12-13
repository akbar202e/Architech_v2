import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Dashboard from '../../components/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import TambahTransaksi from '../../components/Transaksi/TambahTransaksi';
import EditTransaksi from '../../components/Transaksi/EditTransaksi';
import HapusTransaksi from '../../components/Transaksi/HapusTransaksi';
const KontenTransaksi = () => {
    const [transaksiData, setTransaksiData] = useState([]);
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);
    const handleCloseTambah = () => setShowModalTambah(false);
    const handleCloseEdit = () => setShowModalEdit(false);
    const handleCloseHapus = () => setShowModalHapus(false);
    useEffect(() => {
        // Fetch data from the server when the component mounts
        fetch('http://localhost:3001/transaksi')
          .then((response) => response.json())
          .then((data) => setTransaksiData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []); // Empty dependency array to fetch data only once when the component mounts    
    return (
        <div className="container content2 p-5">
            <h2 className='text-light'>Data Transaksi</h2>
            <hr/>
            <div className='content3 rounded-5 p-4 row overflow-hidden mb-5'>
            <div className="content3text d-flex flex-column justify-content-center px-3 text-center ">
            <div align='end'>
                <Button className='border-0 px-4 py-1 fs-6 rounded-5' style={{background:'#B1907F'}} onClick={() => setShowModalTambah(true)}>Tambah Data
                </Button><TambahTransaksi showTambah={showModalTambah} handleCloseTambah={handleCloseTambah} />
            </div>
                <table className='fs-5 my-2'>
                  <thead>
                   <tr>
                     <th>No Invoice</th>
                     <th>Tanggal</th>
                     <th>Customer Name</th>
                     <th>Total</th>
                   </tr>
                  </thead>
                  <tbody>
                  {transaksiData.map((transaksi,index) =>(
                    <tr key={index}>
                        <td>{transaksi.invoice}</td>
                        <td>{transaksi.tanggal}</td>
                        <td>{transaksi.customer}</td>
                        <td>{new Intl.NumberFormat().format(transaksi.total)}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
                <div align='end'>
                <Button className='border-0 mx-2' style={{backgroundColor:'#B1907F'}} onClick={() => setShowModalEdit(true)}>
                    <FontAwesomeIcon className='' icon={faGear} size='lg'/>
                </Button><EditTransaksi showEdit={showModalEdit} handleCloseEdit={handleCloseEdit} />
                <Button className='border-0 mx-2' style={{backgroundColor:'#B1907F'}} onClick={() => setShowModalHapus(true)}>
                    <FontAwesomeIcon className='mx-1' icon={faTrash} size='lg'/>
                </Button><HapusTransaksi showHapus={showModalHapus} handleCloseHapus={handleCloseHapus} />
                </div>
            </div>
            </div>
        </div>
    );
}

const Transaksi = () => {
    return (
        <Dashboard isi={<KontenTransaksi/>}/>
    );
}

export default Transaksi;
