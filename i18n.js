const NextI18Next = require('next-i18next').default;

const languages = ['de', 'ar', 'id', 'zh', 'pt'];
const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: languages,
  fallbackLng: 'en',
  localeSubpaths: {
    en: 'en',
    ar: 'ar',
    de: 'de',
    id: 'id',
    pt: 'pt',
    zh: 'zh',
  },
});
NextI18NextInstance.i18n.languages = languages;

module.exports = NextI18NextInstance;
