import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProduk({ showEdit, handleCloseEdit }) {
      const [id_produk, setId_produk] = useState('');
      const [kategori, setKategori] = useState('');
      const [foto, setFoto] = useState('');
  
    const handleEdit = () => {
      axios
        .post('http://localhost:3001/edit-produk', { id_produk, kategori, foto})
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
  
    const handleSimpan = () => {
      handleEdit();
      handleCloseEdit();
    }
  
  return (
    <>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Kategori</Form.Label>
            <Form.Select
                 value={kategori} 
                 onChange={(e) => setKategori(e.target.value)}
                 autoFocus              
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
                 type='file'
                 value={foto} 
                 onChange={(e) => setFoto(e.target.value)}
                 autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='border-0' onClick={handleCloseEdit}>
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

export default EditProduk;