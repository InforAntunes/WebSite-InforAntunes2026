import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptCommon from './locales/pt/common.json';
import ptHome from './locales/pt/home.json';
import ptAbout from './locales/pt/about.json';
import ptSolutions from './locales/pt/solutions.json';
import ptServices from './locales/pt/services.json';
import ptContact from './locales/pt/contact.json';
import ptLeadForms from './locales/pt/leadForms.json';
import ptLegal from './locales/pt/legal.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enSolutions from './locales/en/solutions.json';
import enServices from './locales/en/services.json';
import enContact from './locales/en/contact.json';
import enLeadForms from './locales/en/leadForms.json';
import enLegal from './locales/en/legal.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esAbout from './locales/es/about.json';
import esSolutions from './locales/es/solutions.json';
import esServices from './locales/es/services.json';
import esContact from './locales/es/contact.json';
import esLeadForms from './locales/es/leadForms.json';
import esLegal from './locales/es/legal.json';

import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frAbout from './locales/fr/about.json';
import frSolutions from './locales/fr/solutions.json';
import frServices from './locales/fr/services.json';
import frContact from './locales/fr/contact.json';
import frLeadForms from './locales/fr/leadForms.json';
import frLegal from './locales/fr/legal.json';

const savedLang = localStorage.getItem('ia-lang') || 'pt';

i18n.use(initReactI18next).init({
  resources: {
    pt: { common: ptCommon, home: ptHome, about: ptAbout, solutions: ptSolutions, services: ptServices, contact: ptContact, leadForms: ptLeadForms, legal: ptLegal },
    en: { common: enCommon, home: enHome, about: enAbout, solutions: enSolutions, services: enServices, contact: enContact, leadForms: enLeadForms, legal: enLegal },
    es: { common: esCommon, home: esHome, about: esAbout, solutions: esSolutions, services: esServices, contact: esContact, leadForms: esLeadForms, legal: esLegal },
    fr: { common: frCommon, home: frHome, about: frAbout, solutions: frSolutions, services: frServices, contact: frContact, leadForms: frLeadForms, legal: frLegal },
  },
  lng: savedLang,
  fallbackLng: 'pt',
  ns: ['common', 'home', 'about', 'solutions', 'services', 'contact', 'leadForms', 'legal'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;

export const LANGUAGES = [
  { code: 'pt', label: 'Português', flag: '🇵🇹', short: 'PT' },
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'es', label: 'Español', flag: '🇪🇸', short: 'ES' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', short: 'FR' },
];

export function setLanguage(lang: string) {
  localStorage.setItem('ia-lang', lang);
  i18n.changeLanguage(lang);
}
