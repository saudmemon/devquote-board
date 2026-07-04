const languages = [
  { code: 'en', label: 'English' },
  { code: 'ur', label: 'Urdu' },
  { code: 'ar', label: 'Arabic' },
  { code: 'zh', label: 'Chinese' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'hi', label: 'Hindi' },
  { code: 'nl', label: 'Dutch' },
]

function LanguageSelector({ lang, onLangChange }) {
  return (
    <select
      className="lang-select"
      value={lang}
      onChange={(e) => onLangChange(e.target.value)}
    >
      {languages.map(l => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector