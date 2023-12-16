import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TambahProduk({ showTambah, handleCloseTambah }) {
  const [kategori, setKategori] = useState('');
  const [foto, setFoto] = useState('');

  const handleTambah = () => {
    axios
      .post('http://localhost:3001/add-produk', { kategori, foto})
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSimpan = () => {
    handleTambah();
    handleCloseTambah();
  }
  return (
    <>
      <Modal show={showTambah} onHide={handleCloseTambah}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Kategori</Form.Label>
            <Form.Select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              >
            <option>Minimalis</option>
            <option>Klasik</option>
            <option>Industrial</option>
            <option>Interior</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                value={foto} 
                onChange={(e) => setFoto(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='border-0' onClick={handleCloseTambah}>
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

export default TambahProduk;