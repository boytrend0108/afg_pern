import { Pagination } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { productAction } from '../../../entities/ProductItem';

export const MyPagination = () => {
  const { count, limit, page } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(count / limit);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const setPage = (pageNumber: number) => {
    dispatch(productAction.setPage(pageNumber));
  };

  return (
    <div className="MyPagination">
      <Pagination>
        {pages.map((el) => (
          <Pagination.Item
            key={el}
            active={page === el}
            onClick={() => setPage(el)}
          >
            {el}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};
