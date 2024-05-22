import { useRef, useState } from 'react';
import cn from 'classnames';

import './AccountTab.scss';
import { useHideDrop } from '../../../../shared/hooks';
import { Link } from 'react-router-dom';

export const AccountTab = () => {
  const [showDrop, setShowDrop] = useState(false);
  const dropRef = useRef<HTMLButtonElement>(null);

  useHideDrop(dropRef, setShowDrop);

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
        <p className="AccountTab__user">Account</p>
        <img src="/my-icons/arrow-down.png" alt="arrow down" />
      </div>

      <div
        className="AccountTab__drop"
        style={{ pointerEvents: showDrop ? 'all' : 'none' }}
      >
        <ul
          className={cn('AccountTab__links', {
            'AccountTab__links--hidden': !showDrop,
          })}
        >
          <li className="AccountTab__link AccountTab__link--search">
            <Link to="profile?tab=searches">Searches</Link>
          </li>

          <li className="AccountTab__link AccountTab__link--favorite">
            <Link to="profile?tab=favorites">Favorites</Link>
          </li>

          <li className="AccountTab__link AccountTab__link--user">
            <Link to="profile?tab=settings">Settings</Link>
          </li>
        </ul>
      </div>

      <div className="AccountTab__menu"></div>
    </button>
  );
};
