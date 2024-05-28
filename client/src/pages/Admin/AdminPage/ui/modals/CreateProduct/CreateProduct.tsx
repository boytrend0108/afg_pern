import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const CreateProduct: React.FC<Props> = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control placeholder={'Enter title'} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Close
        </Button>
        <Button variant="success">Add brand</Button>
      </Modal.Footer>
    </Modal>
  );
};
