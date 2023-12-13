import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function HapusProduk({ showHapus, handleCloseHapus }) {
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
                placeholder='Masukan ID Produk yang ingin dihapus'
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='border-0' onClick={handleCloseHapus}>
            Batal
          </Button>
          <Button style={{background:'#B1907F'}} className='border-0' onClick={handleCloseHapus}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HapusProduk;