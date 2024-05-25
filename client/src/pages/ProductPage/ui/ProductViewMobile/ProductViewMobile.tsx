import './ProductViewMobile.scss';
import { MiniSliderMobile } from '../../../../widgets/MiniSliderMobile';
import { MyTabSwitcher } from '../../../../shared/ui';
import { useSearchParams } from 'react-router-dom';
import { TABS } from './consts';
import { TabType } from './types';

export const ProductViewMobile = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'general';

  return (
    <div className="ProductViewMobile">
      <MyTabSwitcher tabs={TABS} />

      {tab === TabType.general && (
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

      {tab === TabType.interior && (
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

      {tab === TabType.exterior && (
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

      {tab === TabType.model && (
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
