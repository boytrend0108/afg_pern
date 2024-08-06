import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const CreateRole: React.FC<Props> = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder={'Enter user id'}
          type="number"
          className="mb-4"
        />
        <Form.Select aria-label="Select user">
          <option>Open this select menu</option>
          <option value="2">Admin</option>
          <option value="1">User</option>
        </Form.Select>
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
