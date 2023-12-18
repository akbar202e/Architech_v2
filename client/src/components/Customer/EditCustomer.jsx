import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCustomer({ showEdit, handleCloseEdit }) {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");

  const handleEdit = () => {
    axios
      .post("http://localhost:3001/edit-account", {
        nama,
        hp,
        email,
      })
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
  };
  return (
    <>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder='Masukan email customer yang ingin diubah'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                autoFocus  
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={nama} 
                onChange={(e) => setNama(e.target.value)}
                autoFocus 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No Hp</Form.Label>
              <Form.Control
                type="tel"
                value={hp} 
                onChange={(e) => setHp(e.target.value)}
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

export default EditCustomer;