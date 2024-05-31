import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
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

type Props = {
  showCompare: boolean;
  setShowCompare: (v: boolean) => void;
  setShowComparisonTable: () => void;
};

export const MainSection: React.FC<Props> = ({
  showCompare,
  setShowCompare,
  setShowComparisonTable,
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);

  const breadcrumbs = [
    { id: 1, name: 'Home >', path: '/' },
    { id: 2, name: 'Catalog  >', path: '/catalog' },
    { id: 3, name: product?.title || '', path: `/product/${product?.id}` },
  ];

  // eslint-disable-next-line no-console
  console.log(product);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    if (id) {
      dispatch(Product.getOne('61'));
    }
  }, []);

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
        {!showCompare && <ProductView />}

        <ProductViewMobile />

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
                <p className="MainSection__subtitle">{product?.category}</p>
              </div>

              <p className="MainSection__price">
                {`€ ${product?.price}`}
                <span className="MainSection__price-span">excl</span>
              </p>
            </div>

            <div className="MainSection__info">
              <div className="MainSection__info-item">
                <p className="MainSection__info-title">Year</p>
                <p className="MainSection__info-value">{product?.year}</p>
              </div>
              <div className="MainSection__info-item">
                <p className="MainSection__info-title">Hours</p>
                <p className="MainSection__info-value">{product?.hours}</p>
              </div>
              <div className="MainSection__info-item">
                <p className="MainSection__info-title">Reference numbe</p>
                <p className="MainSection__info-value">{`AFG2024${product?.id}`}</p>
              </div>
            </div>

            <div className="MainSection__btn-box">
              <Link to="booking">
                <MyButtonWhite className="MainSection__btn--white">
                  Book
                </MyButtonWhite>
              </Link>

              <MyButtonWhite
                className="MainSection__btn--white"
                onClick={() => setShowCompare(true)}
              >
                Сompare
              </MyButtonWhite>

              <MyButtonWhite className="MainSection__btn--white">
                Get in touch
              </MyButtonWhite>

              <MyButtonWhite className="MainSection__btn--white">
                <a href="" className="MainSection__btn-title">
                  WhatsApp
                </a>
              </MyButtonWhite>
            </div>

            <div className="MainSection__option-group">
              <OptionGroup title="Common" />
              <div className="MainSection__option-wr">
                <OptionGroup title="Sizes/Weights" />
                <OptionGroup title="Tires/Tracks" />
              </div>

              <div className="MainSection__option-wr">
                <OptionGroup title="Engine information" />
                <OptionGroup title="Options" />
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
