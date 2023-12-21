import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function TambahTransaksi({ showTambah, handleCloseTambah }) {
  const [invoice, setInvoice] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [id_account, setId_account] = useState('');
  const [total, setTotal] = useState('');
  const navigate = useNavigate();

  
  const handleTambah = () => {
    axios
      .post('http://localhost:3001/add-transaksi', { invoice, tanggal, id_account, total})
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
    navigate('/transaksi');
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
              <Form.Label>No Invoice</Form.Label>
              <Form.Control
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
                type="number"
                autoFocus
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

export default TambahTransaksi;