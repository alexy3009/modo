import React, { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { Language, getCurrentLanguage, setLanguage } from '../lib/i18n'

interface LanguageSwitcherProps {
  onLanguageChange: (lang: Language) => void
}

const languages = [
  { code: 'bg' as Language, name: 'Български', flag: '🇧🇬' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'el' as Language, name: 'Ελληνικά', flag: '🇬🇷' }
]

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>(getCurrentLanguage())
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguageData = languages.find(lang => lang.code === currentLang)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: Language) => {
    setCurrentLang(langCode)
    setLanguage(langCode)
    onLanguageChange(langCode)
    setIsOpen(false)
    
    // Force update of all components by triggering a custom event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: langCode }))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
      >
        <Globe size={18} />
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguageData?.flag} {currentLanguageData?.name}
        </span>
        <span className="sm:hidden text-sm">
          {currentLanguageData?.flag}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                currentLang === language.code 
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-orange-600 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLang === language.code && (
                <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher