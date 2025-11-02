import React, { useState, useEffect } from 'react'
import { X, Settings, Shield, BarChart3, Target, Palette } from 'lucide-react'
import { cookieManager, CookieConsent } from '../lib/cookies'

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState<Partial<CookieConsent>>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    setShowBanner(cookieManager.shouldShowConsentBanner())
  }, [])

  const handleAcceptAll = () => {
    cookieManager.setConsent({
      analytics: true,
      marketing: true,
      preferences: true
    })
    setShowBanner(false)
  }

  const handleAcceptNecessary = () => {
    cookieManager.setConsent({
      analytics: false,
      marketing: false,
      preferences: false
    })
    setShowBanner(false)
  }

  const handleSaveSettings = () => {
    cookieManager.setConsent(consent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const categories = cookieManager.getCookieCategories()

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or 
                  learn more in our{' '}
                  <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Settings size={16} />
                  Customize
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Cookie Settings</h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-gray-600 mb-6">
                Manage your cookie preferences below. You can enable or disable different types of cookies. 
                Note that disabling some cookies may affect your experience on our website.
              </p>

              <div className="space-y-6">
                {categories.map((category) => {
                  const icons = {
                    necessary: Shield,
                    analytics: BarChart3,
                    marketing: Target,
                    preferences: Palette
                  }
                  const Icon = icons[category.id as keyof typeof icons] || Shield

                  return (
                    <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {category.required ? (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              Always Active
                            </span>
                          ) : (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={consent[category.id as keyof CookieConsent] || false}
                                onChange={(e) => setConsent({
                                  ...consent,
                                  [category.id]: e.target.checked
                                })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Cookie Details */}
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Cookies in this category:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {category.cookies.map((cookie, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-mono text-xs text-blue-600">{cookie.name}</span>
                                <span className="text-xs text-gray-500">{cookie.duration}</span>
                              </div>
                              <p className="text-xs text-gray-600">{cookie.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>
                {' • '}
                <a href="/cookie-policy" className="text-blue-600 hover:text-blue-700 underline">
                  Cookie Policy
                </a>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieBanner