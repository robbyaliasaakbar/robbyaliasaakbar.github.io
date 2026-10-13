import { createContext, useContext, useState, useEffect } from 'react'

/*
  LanguageContext — toggle bahasa EN/ID.
  Default 'en'. Pilihan user disimpan di localStorage.
  Dipakai: Navbar (toggle + labels) → nanti section lain.
*/

const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
