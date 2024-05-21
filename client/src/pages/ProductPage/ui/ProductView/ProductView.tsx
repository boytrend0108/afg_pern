import { MiniSlider } from '../../../../widgets/MiniSlider';
import './ProductView.scss';

export const ProductView = () => {
  return (
    <div className="ProductView">
      <MiniSlider
        title="General view"
        isShow={true}
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
      <MiniSlider
        title="Exterior"
        images={[
          'excavator-1',
          'excavator-2',
          'excavator-3',
          'excavator-4',
          'excavator-5',
          'excavator-6',
        ]}
      />
      <MiniSlider
        title="Interior"
        images={[
          'excavator-1',
          'excavator-2',
          'excavator-3',
          'excavator-4',
          'excavator-5',
          'excavator-6',
        ]}
      />
      <MiniSlider
        title="3D model"
        images={[
          'excavator-1',
          'excavator-2',
          'excavator-3',
          'excavator-4',
          'excavator-5',
          'excavator-6',
        ]}
      />
    </div>
  );
};
