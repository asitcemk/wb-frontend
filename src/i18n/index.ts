import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import { Token } from "../actions/environment/header-configure";
import { ApiUrls } from "../api-urls";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    keySeparator: false,
    returnEmptyString: false,
    fallbackLng: 'en',
    load: 'languageOnly',
    debug: false,
    saveMissing: true, //true for save missing language
    backend: {
      loadPath: ApiUrls.INTERNATIONALIZATIONLOAD+'{{lng}}',
      addPath: ApiUrls.INTERNATIONALIZATIONSAVE+'{{lng}}', //save to missing language
      allowMultiLoading: false,
      crossDomain: false,
      customHeaders: {
        contentType: "application/json", Authorization:"Token "+Token().commonToken
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true
    }
  });

export default i18n;
