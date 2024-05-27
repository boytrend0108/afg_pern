import { useRef, useState } from 'react';
import cn from 'classnames';

import './AccountTab.scss';
import { useHideDrop } from '../../../../shared/hooks';
import { Link } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { user as User } from '../../../../entities/User';

export const AccountTab = () => {
  const dispatch = useAppDispatch();
  const [showDrop, setShowDrop] = useState(false);
  const dropRef = useRef<HTMLButtonElement>(null);
  const { user } = useAppSelector((state) => state.user);
  const login = user?.email.split('@')[0];

  useHideDrop(dropRef, setShowDrop);

  const handleLogout = () => {
    dispatch(User.logout());
  };

  return (
    <button
      className="AccountTab"
      onClick={() => {
        setShowDrop(!showDrop);
      }}
      ref={dropRef}
    >
      <div className="AccountTab__account">
        <img src="/my-icons/user.png" alt="user icon" />

        <p className="AccountTab__user">{user ? login : 'Account'}</p>

        <img src="/my-icons/arrow-down.png" alt="arrow down" />
      </div>

      <div
        className="AccountTab__drop"
        style={{ pointerEvents: showDrop ? 'all' : 'none' }}
      >
        <nav
          className={cn('AccountTab__links', {
            'AccountTab__links--hidden': !showDrop,
          })}
        >
          {user ? (
            <Link
              to="login"
              className="AccountTab__link AccountTab__link--logout"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="login"
              className="AccountTab__link AccountTab__link--logout"
            >
              Login
            </Link>
          )}

          <Link
            to="catalog"
            className="AccountTab__link AccountTab__link--catalog"
          >
            Catalog
          </Link>

          <Link
            to="request"
            className="AccountTab__link AccountTab__link--request"
          >
            Request
          </Link>

          <Link to="news" className="AccountTab__link AccountTab__link--news">
            News
          </Link>

          {user && (
            <>
              <Link
                to="profile?tab=searches"
                className="AccountTab__link AccountTab__link--search-2"
              >
                Searches
              </Link>

              <Link
                to="profile?tab=favorites"
                className="AccountTab__link AccountTab__link--favorite"
              >
                Favorites
              </Link>

              <Link
                to="profile?tab=settings"
                className="AccountTab__link AccountTab__link--settings"
              >
                Settings
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="AccountTab__menu"></div>
    </button>
  );
};
