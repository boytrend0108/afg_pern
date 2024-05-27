import { useNavigate, useSearchParams } from 'react-router-dom';
import { MyTabSwitcher } from '../../../shared/ui';
import { BasicInfoForm } from '../../../widgets/Forms/BasicInfoForm';
import { TABS } from '../consts';
import './ProfilePage.scss';
import { FavoriteTab } from './FavoriteTab/FavoriteTab';
import { OffersTab } from './OffersTab/OffersTab';
import { SearchTab } from './SearchTab/SearchTab';
import { useEffect } from 'react';
import localStorageService from '../../../shared/services/localStorageService';

export const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorageService.get('user');

    if (!user) {
      navigate('/login', { state: { pathname: 'profile' }, replace: true });
    }
  }, []);

  return (
    <div className="ProfilePage container">
      <div className="ProfilePage__header">
        <div className="ProfilePage__header--left">
          <h1 className="ProfilePage__title">My profile</h1>
        </div>

        <div className="ProfilePage__header--right">
          <h2 className="ProfilePage__block-title">Contact Info</h2>

          <ul className="ProfilePage__contacts">
            <li className="ProfilePage__contact">
              <img src="/my-icons/phone-black.svg" alt="phone" />
              <a href="tel:+31402532245">+31 40 253 22 45</a>
            </li>
            <li className="ProfilePage__contact">
              <img src="/my-icons/email-black.svg" alt="mail" />
              <a href="mailto:info@bossmachinery.nl">info@bossmachinery.nl</a>
            </li>
            <li className="ProfilePage__contact">
              <img src="/my-icons/whats-app-black.svg" alt="mail" />
              <a href="http://whatsapp.com">AFGmachinery</a>
            </li>
          </ul>
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
