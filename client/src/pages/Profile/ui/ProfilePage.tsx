import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MyTabSwitcher } from '../../../shared/ui';
import { BasicInfoForm } from '../../../widgets/Forms/BasicInfoForm';
import { TABS } from '../consts';
import './ProfilePage.scss';
import { FavoriteTab } from './FavoriteTab/FavoriteTab';
import { OffersTab } from './OffersTab/OffersTab';
import { SearchTab } from './SearchTab/SearchTab';
import { useEffect } from 'react';
import localStorageService from '../../../shared/services/localStorageService';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const tab = searchParams.get('tab') || 'settings';
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const user = localStorageService.get('accessToken');

    if (!user) {
      navigate('/login', { state: { pathname }, replace: true });
    }
  }, []);

  return (
    <div className="ProfilePage my-container">
      <div className="ProfilePage__header">
        <div className="ProfilePage__header--left">
          <h1 className="ProfilePage__title">{t('sectionTitle.My profile')}</h1>
        </div>

        <div className="ProfilePage__header--right">
          <MyContactInfo />
        </div>

        <div className="ProfilePage__header--tabs">
          <MyTabSwitcher tabs={TABS} />
        </div>
      </div>

      {tab === 'settings' && <BasicInfoForm />}
      {tab === 'offers' && <OffersTab />}
      {tab === 'searches' && <SearchTab />}
      {tab === 'favorites' && <FavoriteTab />}
    </div>
  );
};

export default ProfilePage;
