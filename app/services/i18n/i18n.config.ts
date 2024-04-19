export const DEFAULT_LANGUAGE = 'es';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'vi', name: 'Tiếng Việt' },
] as const;

export const i18n = {
  // This is the list of languages your application supports
  supportedLngs: languages.map((l) => l.code),
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: DEFAULT_LANGUAGE,
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common',
  // Disabling suspense is recommended
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false,
  },
};
