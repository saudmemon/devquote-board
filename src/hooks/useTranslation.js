import { useState, useCallback } from 'react'

function useTranslation() {
  const [translating, setTranslating] = useState(false)
  const [lang, setLang] = useState('en')

  const translate = useCallback(async (text, targetLang) => {
    if (targetLang === 'en') return text

    try {
      setTranslating(true)
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      )
      const data = await res.json()
      return data.responseData.translatedText
    } catch (e) {
      return text
    } finally {
      setTranslating(false)
    }
  }, [])

  return { lang, setLang, translate, translating }
}

export default useTranslation