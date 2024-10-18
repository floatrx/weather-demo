export const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

export const getCurrentLocaleCode = () => {
  if (!isBrowser()) return 'en';
  const locale = navigator.language || navigator.language;
  return locale.split('-')[0]; // Extract the language code (e.g., "en" from "en-US")
};

export const scrollToTop = () => {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
