import './NewsItem.scss';

export const NewsItem = () => {
  return (
    <div className="NewsItem">
      <img
        src="/news/news.png"
        alt="news"
        width="500"
        height={360}
        className="NewsItem__img"
      />
      <h2 className="NewsItem__title">Long headline of the news</h2>
      <p className="NewsItem__descr">
        Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Curabitur tempus urna at turpis condimentum lobortis.
      </p>

      <button className="NewsItem__btn">Read more</button>
    </div>
  );
};
