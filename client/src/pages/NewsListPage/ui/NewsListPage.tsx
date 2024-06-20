import { NewsItem } from '../../../entities/NewsItem';
import { Link } from 'react-router-dom';
import './NewsListPage.scss';
import { useScrollToTop } from '../../../shared/hooks';

const news = [1, 2, 3, 4, 5, 6, 7, 8];

const NewsListPage = () => {
  useScrollToTop();

  return (
    <div className="NewsListPage my-container">
      <h1 className="NewsListPage__title">News</h1>

      <div className="NewsListPage__list">
        {news.map((n) => (
          <Link to={`${n}`} key={n}>
            <NewsItem />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsListPage;
