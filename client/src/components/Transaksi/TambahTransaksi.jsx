import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TambahTransaksi({ showTambah, handleCloseTambah }) {
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
                type="number"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID User</Form.Label>
              <Form.Control
                type="number"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='border-0' onClick={handleCloseTambah}>
            Batal
          </Button>
          <Button style={{background:'#B1907F'}} className='border-0' onClick={handleCloseTambah}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TambahTransaksi;