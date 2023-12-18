import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HapusCustomer({ showHapus, handleCloseHapus }) {
  const [email, setEmail] = useState("");

  const handleHapus = () => {
    axios
      .post("http://localhost:3001/hapus-account", { email })
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
  };
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder="Masukan email customer yang ingin dihapus"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="border-0"
            onClick={handleCloseHapus}
          >
            Batal
          </Button>
          <Button
            style={{ background: "#B1907F" }}
            className="border-0"
            onClick={handleSimpan}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HapusCustomer;