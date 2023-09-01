import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from 'i18next'
import { resources } from './resources'
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: true, // escaping is already in React, so disable it
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  })

export default i18next
