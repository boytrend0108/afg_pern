import { Alert, Button, Form, Modal } from 'react-bootstrap';
import React, { ChangeEvent, useState } from 'react';
import { categoryAPI } from '../../entities/CategoryItem/api';
import { CATEGORIES } from '../../shared/consts/categories';
import { CategoryType } from '../../entities/CategoryItem';

type Props = {
  show: boolean;
  existingCategories: CategoryType[];
  onHide: () => void;
};

export const CreateCategory: React.FC<Props> = ({
  show,
  onHide,
  existingCategories,
}) => {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addCategory = () => {
    if (!category) {
      setError('Celect category name');

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

  const preparedCategories = CATEGORIES.filter((el) => {
    return !existingCategories.some((cat) => cat.name === el.title);
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryItem = CATEGORIES.find((el) => el.title === e.target.value);

    if (categoryItem) {
      setCategory(categoryItem?.title);
      setImage(categoryItem?.image);
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
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option> Select Catetory</option>
            {preparedCategories.map((cat) => (
              <option value={cat.title} key={cat.id}>
                {cat.title}
              </option>
            ))}
          </Form.Select>
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
