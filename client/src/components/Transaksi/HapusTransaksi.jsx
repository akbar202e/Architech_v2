import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function HapusTransaksi({ showHapus, handleCloseHapus }) {
  const [invoice, setInvoice] = useState('');

  const handleHapus = () => {
    axios
    .post('http://localhost:3001/hapus-transaksi', { invoice })
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
              <Form.Label>No Invoice</Form.Label>
              <Form.Control
                type="number"
                value={invoice} 
                onChange={(e) => setInvoice(e.target.value)}
                autoFocus
                placeholder='Masukan Invoice data yang ingin dihapus'
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

export default HapusTransaksi;