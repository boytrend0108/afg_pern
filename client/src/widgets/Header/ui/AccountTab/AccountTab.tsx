import { useRef, useState } from 'react';
import cn from 'classnames';

import './AccountTab.scss';
import { useHideDrop } from '../../../../shared/hooks';

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
        <img src="/icons/user.png" alt="user icon" />
        <p className="AccountTab__user">Account</p>
        <img src="/icons/arrow-down.png" alt="arrow down" />
      </div>

      <div className="AccountTab__drop">
        <ul
          className={cn('AccountTab__links', {
            'AccountTab__links--hidden': !showDrop,
          })}
        >
          <li className="AccountTab__link AccountTab__link--search">
            Searches
          </li>
          <li className="AccountTab__link AccountTab__link--favorite">
            Favorites
          </li>
        </ul>
      </div>

      <div className="AccountTab__menu"></div>
    </button>
  );
};
