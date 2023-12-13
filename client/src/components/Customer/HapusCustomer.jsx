import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function HapusCustomer({ showHapus, handleCloseHapus }) {
  return (
    <>
      <Modal show={showHapus} onHide={handleCloseHapus}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                placeholder='Masukan email customer yang ingin dihapus'
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

export default HapusCustomer;