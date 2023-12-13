import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditCustomer({ showEdit, handleCloseEdit }) {
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
                autoFocus
                placeholder='Masukan email customer yang ingin diubah'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No Hp</Form.Label>
              <Form.Control
                type="tel"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='border-0' onClick={handleCloseEdit}>
            Batal
          </Button>
          <Button style={{background:'#B1907F'}} className='border-0' onClick={handleCloseEdit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCustomer;