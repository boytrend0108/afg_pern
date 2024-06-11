/* eslint-disable max-len */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Country } from '../../shared/types/country';
import { translation } from '../../shared/i18n';

const resources = {
  en: translation.en,
  [Country.france]: translation.fr,
  [Country.ukraine]: translation.ua,
  [Country.spaine]: translation.es,
  [Country.germany]: translation.de,
  [Country.russia]: translation.ru,
  [Country.italy]: translation.it,
  [Country.poland]: translation.pl,
  [Country.turkey]: translation.tr,
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources,
});

export default i18n;
