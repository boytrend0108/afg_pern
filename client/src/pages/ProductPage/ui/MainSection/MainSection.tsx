import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import './MainSection.scss';
import {
  MyBreadcrumb,
  MyButtonWhite,
  MySocialBlack,
} from '../../../../shared/ui';
import { OptionGroup } from '../OptionGroup/OptionGroup';
import { ProductView } from '../ProductView/ProductView';
import { ProductViewMobile } from '../ProductViewMobile/ProductViewMobile';
import { CompareBox } from '../CompareBox/CompareBox';
import * as Product from '../../../../entities/ProductItem';
import { getOptions } from './helpers/getOptions';
import { OptionGroupe } from './types';
import { ARTICUL_PREFIX } from '../../../../shared/consts/product';
import { SOCIAL_LINKS } from '../../../../shared/consts/socialLink';
import { useTranslation } from 'react-i18next';
import { useGetPrice } from '../../../../shared/hooks';

type Props = {
  showCompare: boolean;
  setShowCompare: (v: boolean) => void;
  setShowComparisonTable: () => void;
};

const initialOptions = {
  common: {},
  sizes: {},
  engine: {},
  tires: {},
  other: {},
};

export const MainSection: React.FC<Props> = ({
  showCompare,
  setShowCompare,
  setShowComparisonTable,
}) => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);
  const [options, setOptions] = useState<OptionGroupe>(initialOptions);
  const [preparedPrice, setPreparedPrice] = useState('$ 0');
  const { t } = useTranslation();

  const breadcrumbs = [
    { id: 1, name: t('ProductPage.Home') + ' >', path: '/' },
    { id: 2, name: t('ProductPage.catalog') + ' >', path: '/catalog' },
    { id: 3, name: product?.title || '', path: `/product/${product?.id}` },
  ];

  useGetPrice(product, setPreparedPrice);

  const booking = () => {
    dispatch(Product.productAction.setBooked(product));
  };

  useEffect(() => {
    // document.documentElement.scrollTop = 0;

    if (product) {
      setOptions(getOptions(product.product_infos));
    }
  }, [product]);

  const startComparing = () => {
    setShowCompare(true);

    dispatch(Product.productAction.addToCompare(product));
  };

  return (
    <main className="MainSection">
      <div className="MainSection__top">
        <div className="MainSection__breadcrumb">
          <MyBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="MainSection__social">
          <MySocialBlack />
        </div>
      </div>

      <div className="MainSection__box">
        {!showCompare && <ProductView product={product} />}

        <ProductViewMobile product={product} />

        {showCompare ? (
          <div className="MainSection__compare--mob">
            {showCompare && (
              <CompareBox
                onClose={() => setShowCompare(false)}
                setShowComparisonTable={setShowComparisonTable}
              />
            )}
          </div>
        ) : (
          <div className="MainSection__options">
            <div className="MainSection__price-box">
              <div className="MainSection__titles">
                <p className="MainSection__brand">{product?.brand}</p>
                <p className="MainSection__model">{product?.title}</p>
                <p className="MainSection__subtitle">
                  {t(`Categories.${product?.category}`)}
                </p>
              </div>

              <p className="MainSection__price">
                {preparedPrice + ' '}
                <span className="MainSection__price-span"> excl.</span>
              </p>
            </div>

            <div className="MainSection__info">
              <div className="MainSection__info-item">
                <p className="MainSection__info-title">
                  {t('ProductPage.Year')}
                </p>
                <p className="MainSection__info-value">{product?.year}</p>
              </div>
              <div className="MainSection__info-item">
                <p className="MainSection__info-title">
                  {t('ProductPage.Hours')}
                </p>
                <p className="MainSection__info-value">{product?.hours}</p>
              </div>
              <div className="MainSection__info-item">
                <p className="MainSection__info-title">
                  {t('ProductPage.Reference number')}
                </p>
                <p className="MainSection__info-value">
                  {ARTICUL_PREFIX + product?.id}
                </p>
              </div>
            </div>

            <div className="MainSection__btn-box">
              <Link to="booking" onClick={booking}>
                <MyButtonWhite className="MainSection__btn--white">
                  {t('buttons.Book')}
                </MyButtonWhite>
              </Link>

              <MyButtonWhite
                className="MainSection__btn--white"
                onClick={() => startComparing()}
              >
                {t('buttons.Compare')}
              </MyButtonWhite>

              <Link to="/request">
                <MyButtonWhite className="MainSection__btn--white">
                  {t('buttons.Get in touch')}
                </MyButtonWhite>
              </Link>

              <MyButtonWhite className="MainSection__btn--white">
                <a
                  href={SOCIAL_LINKS.WHATSAPP}
                  className="MainSection__btn-title"
                  target="blank"
                >
                  WhatsApp
                </a>
              </MyButtonWhite>
            </div>

            <div className="MainSection__option-group">
              <OptionGroup title="Common" options={options.common} />

              <div className="MainSection__option-wr">
                <OptionGroup title="Sizes/Weights" options={options.sizes} />
                <OptionGroup title="Tires/Tracks" options={options.tires} />
              </div>

              <div className="MainSection__option-wr">
                <OptionGroup
                  title="Engine information"
                  options={options.engine}
                />
                <OptionGroup title="Options" options={options.other} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="MainSection__compare">
        {showCompare && (
          <CompareBox
            onClose={() => setShowCompare(false)}
            setShowComparisonTable={setShowComparisonTable}
          />
        )}
      </div>
    </main>
  );
};
