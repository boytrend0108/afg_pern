import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './AdminBrands.scss';
import { brandAPI } from '../../../../entities/BrandItem';
import { BrandCreateResponce } from '../../../../entities/BrandItem/types';
import { MyLoader } from '../../../../shared/ui/MyLoader/MyLoader';
import { CreateBrand } from '../../../../features/CreateBrand/CreateBrand';

export const AdminBrands = () => {
  const [showBrand, setShowBrand] = useState(false);
  const [brands, setBrands] = useState<BrandCreateResponce[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getBrands();
  }, [showBrand]);

  const getBrands = () => {
    setLoading(true);

    brandAPI
      .getAll()
      .then(setBrands)
      .catch((er) => setError(er.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  };

  const deleteBrand = (id: number) => {
    setError('');

    brandAPI
      .delete(id)
      .then(() => {
        setBrands((current) => current.filter((br) => br.id !== id));
      })
      .catch((err) => setError(err.message || 'Something went wrong'));
  };

  return (
    <div className="AdminBrands">
      <div className="AdminPage__buttons">
        <Button onClick={() => setShowBrand(true)}>Add brand</Button>
      </div>

      <CreateBrand show={showBrand} onHide={() => setShowBrand(false)} />

      <table className="AdminBrands__table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col" style={{ width: '100%' }}>
              name
            </th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {brands.map((br) => (
            <tr key={br.id}>
              <td scope="row">{br.id}</td>
              <td>{br.name}</td>
              <td className="AdminBrands__td--last">
                <Button variant="danger" onClick={() => deleteBrand(br.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="AdminBrands__loader">
          <MyLoader />
        </div>
      )}

      {error && <p className="AdminBrands__error">{error}</p>}
    </div>
  );
};
