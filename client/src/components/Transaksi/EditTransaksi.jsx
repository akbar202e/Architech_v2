import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function EditTransaksi({ showEdit, handleCloseEdit }) {
  const [invoice, setInvoice] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [id_account, setId_account] = useState('');
  const [total, setTotal] = useState('');

  const handleEdit = () => {
    axios
      .post('http://localhost:3001/edit-transaksi', { invoice, tanggal, id_account, total})
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
              <Form.Label>No Invoice</Form.Label>
              <Form.Control
                type="number"
                value={invoice} 
                onChange={(e) => setInvoice(e.target.value)}
                autoFocus
                placeholder='Masukan Invoice data yang ingin diubah'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                value={tanggal} 
                onChange={(e) => setTanggal(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID User</Form.Label>
              <Form.Control
                type="number"
                value={id_account} 
                onChange={(e) => setId_account(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                value={total} 
                onChange={(e) => setTotal(e.target.value)}
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

export default EditTransaksi;