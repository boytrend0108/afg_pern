/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './AdminCategories.scss';
import { MyLoader } from '../../../../shared/ui/MyLoader/MyLoader';
import {
  CategoryType,
  CategoryDeleteDTO,
} from '../../../../entities/CategoryItem/types';
import { categoryAPI } from '../../../../entities/CategoryItem/api';
import { CreateCategory } from '../../../../features/CreateCategory/CreateCategory';

export const AdminCategories = () => {
  const [showCategory, setShowCategoryd] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories();
  }, [showCategory]);

  const getCategories = () => {
    setLoading(true);

    categoryAPI
      .getAll()
      .then(setCategories)
      .catch((er) => setError(er.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  };

  const deleteCategory = (data: CategoryDeleteDTO) => {
    setError('');

    categoryAPI
      .delete(data)
      .then(() => {
        setCategories((current) => current.filter((br) => br.id !== data.id));
      })
      .catch((err) => setError(err.message || 'Something went wrong'));
  };

  return (
    <div className="AdminCategories">
      <div className="AdminPage__buttons">
        <Button onClick={() => setShowCategoryd(true)}>Add category</Button>
      </div>

      <CreateCategory
        existingCategories={categories}
        show={showCategory}
        onHide={() => setShowCategoryd(false)}
      />

      <table className="AdminCategories__table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col" style={{ width: '100%' }}>
              name
            </th>
            <th scope="col">image</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td scope="row">{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <img
                  crossOrigin="anonymous"
                  src={`/my-icons/categories/${cat.image}.svg`}
                  alt="image"
                  width={70}
                  height={70}
                />
              </td>
              <td className="AdminCategories__td--last">
                <Button
                  variant="danger"
                  onClick={() =>
                    deleteCategory({ id: cat.id, fileId: cat.image })
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="AdminCategories__loader">
          <MyLoader />
        </div>
      )}

      {error && <p className="AdminCategories__error">{error}</p>}
    </div>
  );
};
