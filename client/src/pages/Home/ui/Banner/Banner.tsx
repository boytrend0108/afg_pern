import { Link } from 'react-router-dom';
import { MyButton } from '../../../../shared/ui';
import './Banner.scss';
import { useTranslation } from 'react-i18next';
import { TURCHI_BRAND_ID } from '../../../../shared/consts/brands';

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className="Banner">
      <div className="Banner__container">
        <img
          src="/home-page/pile-banner-left.webp"
          alt="pile drivers"
          className="Banner__img Banner__img--left"
          height={170}
          width={170}
        />

        <main className="Banner__main">
          <h2 className="Banner__title">{t('Banner.pile drivers')}</h2>
          <p className="Banner__desc">{t(`Banner.subtitle`)}</p>

          <Link to={`catalog?brandId=${TURCHI_BRAND_ID}`}>
            <MyButton className="Banner__btn MyButton">
              {t('Banner.View models')}
            </MyButton>
          </Link>
        </main>

        <img
          src="/home-page/pile-banner-right.webp"
          alt="pile drivers"
          className="Banner__img"
          height={170}
          width={170}
        />
      </div>
    </div>
  );
};
