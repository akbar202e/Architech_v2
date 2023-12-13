import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function TambahProduk({ showTambah, handleCloseTambah }) {
  return (
    <>
      <Modal show={showTambah} onHide={handleCloseTambah}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           <Form.Label>Kategori</Form.Label>
            <Form.Select>
            <option>Minimalis</option>
            <option>Klasik</option>
            <option>Industrial</option>
            <option>Interior</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
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

export default TambahProduk;