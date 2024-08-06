import { Pagination } from 'react-bootstrap';
import './MyPagination.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useSearchParams } from 'react-router-dom';

export const MyPagination = () => {
  const { count, limit, products } = useAppSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / limit);
  const pages = [];
  const page = searchParams.get('page') || '1';

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const setPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());

    setSearchParams(params);
  };

  if (pages.length <= 1 || !products.length) {
    return;
  }

  return (
    <div className="MyPagination">
      <Pagination size="lg">
        {pages.map((el) => (
          <Pagination.Item
            linkClassName="MyPagination__item"
            key={el}
            active={page === el.toString()}
            onClick={() => setPage(el)}
          >
            {el}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};
