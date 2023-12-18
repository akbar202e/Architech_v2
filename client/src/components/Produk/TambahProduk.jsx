import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TambahProduk({ showTambah, handleCloseTambah }) {
  const [kategori, setKategori] = useState('');
  const [image, setImage] = useState(null);

  const handleTambah = async () => {
    const formData = new FormData();
    formData.append('kategori', kategori);
    formData.append('image', image);

    const response = await axios.post('http://localhost:3001/add-produk', formData);
    toast.success(response.data.message);
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
                onChange={(e) => setImage(e.target.files[0])}
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