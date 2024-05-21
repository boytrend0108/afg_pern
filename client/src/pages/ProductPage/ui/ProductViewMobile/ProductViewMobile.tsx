/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import cn from 'classnames';
import './ProductViewMobile.scss';
import { MiniSliderMobile } from '../../../../widgets/MiniSliderMobile';

enum ViewType {
  general = 'general',
  interior = 'interior',
  exterior = 'exterior',
  model = 'model',
}

export const ProductViewMobile = () => {
  const [active, setActive] = useState(ViewType.general);

  return (
    <div className="ProductViewMobile">
      <div className="ProductViewMobile__header">
        <button
          onClick={() => setActive(ViewType.general)}
          className={cn('ProductViewMobile__btn', {
            'ProductViewMobile__btn--active': active === ViewType.general,
          })}
        >
          General view
        </button>
        <button
          onClick={() => setActive(ViewType.interior)}
          className={cn('ProductViewMobile__btn', {
            'ProductViewMobile__btn--active': active === ViewType.interior,
          })}
        >
          Interior
        </button>
        <button
          onClick={() => setActive(ViewType.exterior)}
          className={cn('ProductViewMobile__btn', {
            'ProductViewMobile__btn--active': active === ViewType.exterior,
          })}
        >
          Exterior
        </button>
        <button
          onClick={() => setActive(ViewType.model)}
          className={cn('ProductViewMobile__btn', {
            'ProductViewMobile__btn--active': active === ViewType.model,
          })}
        >
          3D model
        </button>
      </div>

      {active === ViewType.general && (
        <MiniSliderMobile
          images={[
            'excavator-1',
            'excavator-2',
            'excavator-3',
            'excavator-4',
            'excavator-5',
            'excavator-6',
            'excavator-4',
            'excavator-5',
            'excavator-6',
          ]}
        />
      )}
      {active === ViewType.interior && (
        <MiniSliderMobile
          images={[
            'excavator-1',
            'excavator-2',
            'excavator-3',
            'excavator-4',
            'excavator-5',
            'excavator-6',
          ]}
        />
      )}
      {active === ViewType.exterior && (
        <MiniSliderMobile
          images={[
            'excavator-1',
            'excavator-2',
            'excavator-3',
            'excavator-4',
            'excavator-5',
            'excavator-6',
          ]}
        />
      )}
      {active === ViewType.model && (
        <MiniSliderMobile
          images={[
            'excavator-1',
            'excavator-2',
            'excavator-3',
            'excavator-4',
            'excavator-5',
            'excavator-6',
          ]}
        />
      )}
    </div>
  );
};
