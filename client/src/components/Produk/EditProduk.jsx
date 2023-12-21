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
  const [image, setImage] = useState(null);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('kategori', kategori);
    formData.append('image', image); // Append the file to the FormData
    formData.append('id_produk', id_produk);

    try {
      const response = await axios.post(`http://localhost:3001/edit-produk`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error editing product.');
      console.error(error);
    }
  };

  const handleSimpan = () => {
    handleEdit();
    handleCloseEdit();
  };

  return (
    <>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
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
                <option>Pilih Kategori</option>
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
                onChange={(e) => setImage(e.target.files[0])} // Update image state with the selected file
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
