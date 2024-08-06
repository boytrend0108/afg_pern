import { Alert, Button, Form, Modal } from 'react-bootstrap';
import React, { ChangeEvent, useState } from 'react';
import { categoryAPI } from '../../entities/CategoryItem/api';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const CreateCategory: React.FC<Props> = ({ show, onHide }) => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addCategory = () => {
    if (!category.trim() || !image) {
      setError('Add category name and image');

      return;
    }

    setError('');
    setLoading(true);

    const formData = new FormData();

    formData.append('name', category);
    formData.append('image', image);

    categoryAPI
      .create(formData)
      .then(() => {
        onHide();
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const setFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
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
          Create Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={'Enter category title'}
            className="mb-2"
            onChange={(e) => setCategory(e.target.value)}
          />
          <Form.Control
            placeholder={'Enter category image'}
            type="file"
            onChange={setFile}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Close
        </Button>
        <Button variant="success" onClick={addCategory}>
          {loading ? 'In progress' : 'Add category'}
        </Button>
      </Modal.Footer>
      {error && <Alert variant="danger">{error}</Alert>}
    </Modal>
  );
};
