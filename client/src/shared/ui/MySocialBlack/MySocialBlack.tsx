/* eslint-disable max-len */
import { SOCIAL_LINKS } from '../../consts/socialLink';
import './MySocialBlack.scss';

export const MySocialBlack = () => {
  return (
    <ul className="MySocialBlack">
      <li className="MySocialBlack__item MySocialBlack__item--star-black"></li>
      <li className="MySocialBlack__item MySocialBlack__item--pdf">
        <a
          href="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf"
          className="MySocialBlack__link"
          target="_blank"
        ></a>
      </li>
      <li className="MySocialBlack__item MySocialBlack__item--fb">
        <a
          className="MySocialBlack__link"
          href={SOCIAL_LINKS.FB}
          target="blank"
        />
      </li>
      <li className="MySocialBlack__item MySocialBlack__item--inst">
        <a href={SOCIAL_LINKS.INST} className="MySocialBlack__link" />
      </li>
      <li className="MySocialBlack__item MySocialBlack__item--in">
        <a href={SOCIAL_LINKS.IN} className="MySocialBlack__link" />
      </li>
      <li className="MySocialBlack__item MySocialBlack__item--x">
        <a href={SOCIAL_LINKS.X} className="MySocialBlack__link" />
      </li>
    </ul>
  );
};
