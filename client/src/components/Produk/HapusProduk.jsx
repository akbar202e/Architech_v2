import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HapusProduk({ showHapus, handleCloseHapus }) {
  const [id_produk, setId_produk] = useState('');

  const handleHapus = () => {
    axios
      .post('http://localhost:3001/hapus-produk', { id_produk })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  

  const handleSimpan = () => {
    handleHapus();
    handleCloseHapus();
  }
 
  return (
    <>
      <Modal show={showHapus} onHide={handleCloseHapus}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID Produk</Form.Label>
              <Form.Control
                type="number"
                placeholder='Masukan ID Produk yang ingin diubah'
                value={id_produk} 
                onChange={(e) => setId_produk(e.target.value)}
                autoFocus     
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='border-0' onClick={handleCloseHapus}>
            Batal
          </Button>
          <Button style={{background:'#B1907F'}} className='border-0' onClick={handleSimpan}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HapusProduk;