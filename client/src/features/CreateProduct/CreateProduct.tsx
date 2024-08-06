import { Button, Form, Modal } from 'react-bootstrap';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BrandCreateResponce } from '../../entities/BrandItem/types';
import { CategoryType, categoryAPI } from '../../entities/CategoryItem';
import { brandAPI } from '../../entities/BrandItem';
import {
  PRODUCT_OPTIONS,
  PRODUCT_OPTIONS_BOOLEAN,
} from '../../entities/ProductItem/consts';
import { ProductOptionsType } from '../../entities/ProductItem/types';
import './CreateProduct.scss';
import { productAPI } from '../../entities/ProductItem';
import { validateForm } from './helpers/validateForm';
import { INITIAL_PRODUCT, PROMO_TYPE } from './consts';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const CreateProduct: React.FC<Props> = ({ show, onHide }) => {
  const [brands, setBrands] = useState<BrandCreateResponce[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [product, setProduct] =
    useState<Partial<ProductOptionsType>>(INITIAL_PRODUCT);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    categoryAPI
      .getAll()
      .then(setCategories)
      .catch((er) => setError(er.message || 'Something went wrong'));

    brandAPI
      .getAll()
      .then(setBrands)
      .catch((er) => setError(er.message || 'Something went wrong'));
  }, []);

  const setFile = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;

    if (images) {
      setProduct((prevProduct) => ({ ...prevProduct, images }));
    }
  };

  const setFileInter = (e: ChangeEvent<HTMLInputElement>) => {
    const imagesInter = e.target.files;

    if (imagesInter) {
      setProduct((prevProduct) => ({ ...prevProduct, imagesInter }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const field: string = e.target.id;
    const value = e.target.value;

    setProduct((prevProduct) => ({ ...prevProduct, [field]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    const value = e.target.checked;

    setProduct((prevProduct) => ({ ...prevProduct, [field]: value }));
  };

  const addProduct = () => {
    setError('');

    const result = validateForm(product);

    if (!result) {
      setError('All fields are required');

      return;
    }

    setLoading(true);

    const formData = new FormData();

    for (const [key, value] of Object.entries(product)) {
      switch (key) {
        case 'images':
          for (let i = 0; i < (value as FileList).length; i++) {
            formData.append('images', (value as FileList)[i]);
          }
          break;

        case 'imagesInter':
          for (let i = 0; i < (value as FileList).length; i++) {
            formData.append('imagesInter', (value as FileList)[i]);
          }
          break;

        default:
          formData.append(key, value as string);
      }
    }

    // eslint-disable-next-line no-console
    productAPI
      .create(formData)
      .then(() => {
        setTimeout(() => {
          setProduct(INITIAL_PRODUCT);
          onHide();
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong...');
        setLoading(false);
      });
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
          Create Product
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column gap-2">
        <Form.Select
          aria-label="select brand"
          onChange={handleChange}
          id="brandId"
          required
          isInvalid={!product.brandId}
          isValid={!!product.brandId}
          className="mb-2 CreateProduct__input"
        >
          <option>Select Brand</option>
          {brands.map((br) => (
            <option value={br.id} key={br.id}>
              {br.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          aria-label="select category"
          onChange={handleChange}
          id="categoryId"
          required
          isInvalid={!product.categoryId}
          isValid={!!product.categoryId}
          className="mb-2 CreateProduct__input"
        >
          <option>Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          aria-label="select category"
          onChange={handleChange}
          id="promoType"
          required
          isInvalid={!product.promoType}
          isValid={!!product.promoType}
          className="mb-2 CreateProduct__input"
        >
          <option>Select Promo type</option>
          {PROMO_TYPE.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </Form.Select>

        <p className="CreateProduct__text">Select minimum 3 exterior images*</p>
        <Form.Control
          placeholder={'Select several product image'}
          type="file"
          multiple
          onChange={setFile}
          required
          isInvalid={!product.images || product.images.length < 3}
          isValid={!!product.images}
          className="mb-2 CreateProduct__input"
        />

        <p className="CreateProduct__text">Select minimum 3 interior images*</p>
        <Form.Control
          placeholder={'Select several product image'}
          type="file"
          multiple
          onChange={setFileInter}
          required
          isInvalid={!product.imagesInter || product.imagesInter.length < 3}
          isValid={!!product.images}
          className="mb-2 CreateProduct__input"
        />

        <Form>
          {PRODUCT_OPTIONS.map((el) => (
            <Form.Control
              placeholder={`Enter ${el}`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              id={`${el}`}
              key={el}
              value={(product[el] as string) || ''}
              type="text"
              required
              isInvalid={!product[el]}
              isValid={!!product[el]}
              className="mb-2 CreateProduct__input"
            />
          ))}
        </Form>

        <Form>
          <p className="CreateProduct__text">Select options</p>
          {PRODUCT_OPTIONS_BOOLEAN.map((el) => (
            <Form.Check
              className="CreateProduct__checkbox"
              type="checkbox"
              id={el}
              key={el}
              checked={product[el]}
              label={el}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(e)
              }
            />
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide} variant="danger">
          Close
        </Button>

        <Button variant="success" type="submit" onClick={addProduct}>
          {loading ? 'In progress...' : 'Add product'}
        </Button>
        {error && <p className="CreateProduct__error">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
};
