import { FormEvent, useState } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { MyButton } from '../../shared/ui';
import { SOCIAL_LINKS } from '../../shared/consts/socialLink';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(email);
    setEmail('');
  };

  return (
    <div className="Footer">
      <div className="Footer__container">
        <div className="Footer__item">
          <h3 className="Footer__item-title">Contact</h3>
          <p className="Footer__text">AFG-Machinery</p>
          <p className="Footer__text">Eindhovensebaan 3</p>
          <a
            href="tel:+31 40 253 22 45"
            className="Footer__text Footer__text--phone"
          >
            +31 40 253 22 45
          </a>

          <MyButton className="MyButton Footer__contact-btn">
            Contact Us
          </MyButton>
        </div>

        <div className="Footer__item Footer__item--social">
          <h3 className="Footer__item-title">Social networks</h3>
          <a
            href={SOCIAL_LINKS.FB}
            className="Footer__social Footer__social--fb"
            target="blank"
          >
            Facebook
          </a>

          <a
            href={SOCIAL_LINKS.YOUTUBE}
            className="Footer__social Footer__social--youtube"
            target="blank"
          >
            Youtube
          </a>

          <a
            href={SOCIAL_LINKS.INST}
            className="Footer__social Footer__social--insta"
            target="blank"
          >
            Instagram
          </a>

          <a
            href={SOCIAL_LINKS.IN}
            className="Footer__social Footer__social--link"
            target="blank"
          >
            Linkedin
          </a>

          <a
            href={SOCIAL_LINKS.X}
            className="Footer__social Footer__social--x"
            target="blank"
          >
            Twitter
          </a>
        </div>

        <div className="Footer__item">
          <h3 className="Footer__item-title">Machinery alert</h3>
          <p className="Footer__text">Stay informed with our latest deals!</p>

          <form
            action="#"
            className="Footer__form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="email"
              className="Footer__form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email adress"
            />

            <button className="Footer__form-btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className="Footer__item Footer__item--menu">
          <h3 className="Footer__item-title">Menu</h3>

          <Link className="Footer__navlink" to="/">
            Home
          </Link>

          <Link className="Footer__navlink" to="category">
            Category
          </Link>

          <Link className="Footer__navlink" to="news">
            News
          </Link>

          <Link className="Footer__navlink" to="contact">
            Contact
          </Link>
        </div>

        <Link to="/" className="Footer__item Footer__item--logo">
          <img src="/logo.svg" alt="logo" className="Footer__logo" />
        </Link>
      </div>
    </div>
  );
};
