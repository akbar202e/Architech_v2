import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditTransaksi({ showEdit, handleCloseEdit }) {
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
                autoFocus
                placeholder='Masukan Invoice data yang ingin diubah'
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

export default EditTransaksi;