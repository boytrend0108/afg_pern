import { Alert, Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { brandAPI } from '../../entities/BrandItem';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const CreateBrand: React.FC<Props> = ({ show, onHide }) => {
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addBrand = () => {
    if (!brand.trim()) {
      setError('Add brand title');

      return;
    }

    setError('');
    setLoading(true);

    brandAPI
      .create({ name: brand })
      .then(() => {
        onHide();
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

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
          Create Brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={'Enter brand title'}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Close
        </Button>
        <Button variant="success" onClick={addBrand}>
          {loading ? 'In progress' : 'Add brand'}
        </Button>
      </Modal.Footer>
      {error && <Alert variant="danger">{error}</Alert>}
    </Modal>
  );
};
