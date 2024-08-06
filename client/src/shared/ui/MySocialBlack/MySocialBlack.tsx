/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import './MySocialBlack.scss';
import { SOCIAL_LINKS } from '../../consts/socialLink';
import localStorageService from '../../services/localStorageService';
import { toggleFavorite } from '../../../features/AddToFaforites';
import { useAppSelector } from '../../hooks/reduxHooks';

export const MySocialBlack = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id: productId } = useParams();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const favorite: string[] = localStorageService.get('favorite') || [];

    if (productId && favorite.includes(productId)) {
      setIsFavorite(true);
    }
  }, []);

  const handleFavorite = () => {
    if (!productId) {
      return;
    }

    toggleFavorite({ productId, userId: user?.id || null, setIsFavorite });
  };

  return (
    <ul className="MySocialBlack">
      <li
        className={cn('MySocialBlack__item MySocialBlack__item--star-black', {
          'MySocialBlack__item--star-black--fav': isFavorite,
        })}
        onClick={() => handleFavorite()}
      />

      {/* <li className="MySocialBlack__item MySocialBlack__item--pdf">
        <a
          href="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
          className="MySocialBlack__link"
          target="_blank"
        />
      </li> */}

      <li className="MySocialBlack__item MySocialBlack__item--fb">
        <a
          className="MySocialBlack__link"
          href={SOCIAL_LINKS.FB}
          target="blank"
        />
      </li>

      <li className="MySocialBlack__item MySocialBlack__item--inst">
        <a
          href={SOCIAL_LINKS.INST}
          className="MySocialBlack__link"
          target="_blank"
        />
      </li>

      <li className="MySocialBlack__item MySocialBlack__item--in">
        <a
          href={SOCIAL_LINKS.IN}
          className="MySocialBlack__link"
          target="_blank"
        />
      </li>

      <li className="MySocialBlack__item MySocialBlack__item--x">
        <a
          href={SOCIAL_LINKS.X}
          className="MySocialBlack__link"
          target="_blank"
        />
      </li>
    </ul>
  );
};
