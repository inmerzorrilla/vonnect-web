
'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { translations, type Language, type TranslationKey } from '@/lib/translations'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language: Language) => set({ language }),
      t: (key: TranslationKey) => {
        const { language } = get()
        return translations[language][key] || key
      },
    }),
    {
      name: 'language-storage',
    }
  )
)
