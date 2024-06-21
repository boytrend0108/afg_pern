/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './AdminProducts.scss';
import { MyLoader } from '../../../../shared/ui/MyLoader/MyLoader';
import { ProductType } from '../../../../entities/ProductItem/types';
import { productAPI } from '../../../../entities/ProductItem';
import { CreateProduct } from '../../../../features/CreateProduct/CreateProduct';
import { GOOGLE_DRIVE_URL } from '../../../../shared/consts/google';

export const AdminProducts = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts();
  }, [showProducts]);

  const getProducts = () => {
    setLoading(true);

    const params = new URLSearchParams();

    productAPI
      .getAll(params)
      .then((res) => setProducts(res.products))
      .catch((er) => setError(er.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  };

  const deleteProduct = (id: number) => {
    setError('');

    productAPI
      .delete(id)
      .then(() => {
        setProducts((current) => current.filter((pr) => pr.id !== id));
      })
      .catch((err) => setError(err.message || 'Something went wrong'));
  };

  return (
    <div className="AdminProducts">
      <div className="AdminPage__buttons">
        <Button onClick={() => setShowProducts(true)}>Add product</Button>
      </div>

      <CreateProduct
        show={showProducts}
        onHide={() => setShowProducts(false)}
      />

      <table className="AdminProducts__table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col" style={{ width: '100%' }}>
              name
            </th>
            <th scope="col">brand</th>
            <th scope="col">category</th>
            <th scope="col">image</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {products.map((pr) => (
            <tr key={pr.id}>
              <td scope="row">{pr.id}</td>
              <td>{pr.title}</td>
              <td>{pr.brand}</td>
              <td>{pr.category}</td>
              <td>
                {!pr.product_images[0] ? (
                  'loading..'
                ) : (
                  <img
                    src={GOOGLE_DRIVE_URL + pr.product_images[0]}
                    alt="product image"
                    width={70}
                    height={70}
                  />
                )}
              </td>
              <td className="AdminProducts__td--last">
                <Button variant="danger" onClick={() => deleteProduct(pr.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="AdminProducts__loader">
          <MyLoader />
        </div>
      )}

      {error && <p className="AdminProducts__error">{error}</p>}
    </div>
  );
};
