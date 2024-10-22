'use client';

import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';

import { getDictionary, type LangDictionary } from '@/lib/i18n/getDictionary';

import type { Locale } from '@/i18n-config';

interface LocaleContextProps {
  lang: Locale;
  setLocale: (locale: Locale) => void;
  dict: LangDictionary;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

interface Props {
  lang: Locale;
  children: ReactNode;
  dict: LangDictionary;
}

export const LocaleProvider: FC<Props> = ({ lang: initialLocale, dict: defaultDict, children }) => {
  const [lang, setLang] = useState<Locale>(initialLocale);

  const [dict, setDict] = useState<LangDictionary>(defaultDict);

  const setLocale = (newLocale: Locale) => {
    setLang(newLocale);
  };

  useEffect(() => {
    if (lang === initialLocale) return;
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setDict(dictionary);
    };
    fetchDictionary();
  }, [initialLocale, lang]);

  return <LocaleContext.Provider value={{ lang, setLocale, dict }}>{children}</LocaleContext.Provider>;
};

export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
