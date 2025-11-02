// Cookie management system
export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  timestamp: string
}

export interface CookieSettings {
  name: string
  value: string
  expires?: Date
  domain?: string
  path?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

class CookieManager {
  private static instance: CookieManager
  private consent: CookieConsent | null = null
  private consentCallbacks: Array<(consent: CookieConsent) => void> = []

  private constructor() {
    this.loadConsent()
  }

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager()
    }
    return CookieManager.instance
  }

  // Set cookie with proper settings
  setCookie(settings: CookieSettings): boolean {
    try {
      let cookieString = `${settings.name}=${encodeURIComponent(settings.value)}`
      
      if (settings.expires) {
        cookieString += `; expires=${settings.expires.toUTCString()}`
      }
      
      if (settings.domain) {
        cookieString += `; domain=${settings.domain}`
      }
      
      if (settings.path) {
        cookieString += `; path=${settings.path}`
      } else {
        cookieString += `; path=/`
      }
      
      if (settings.secure) {
        cookieString += `; secure`
      }
      
      if (settings.sameSite) {
        cookieString += `; samesite=${settings.sameSite}`
      }

      document.cookie = cookieString
      return true
    } catch (error) {
      console.error('Failed to set cookie:', error)
      return false
    }
  }

  // Get cookie value
  getCookie(name: string): string | null {
    try {
      const nameEQ = name + "="
      const ca = document.cookie.split(';')
      
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length))
        }
      }
      return null
    } catch (error) {
      console.error('Failed to get cookie:', error)
      return null
    }
  }

  // Delete cookie
  deleteCookie(name: string, domain?: string, path?: string): boolean {
    try {
      let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`
      
      if (domain) {
        cookieString += `; domain=${domain}`
      }
      
      if (path) {
        cookieString += `; path=${path}`
      } else {
        cookieString += `; path=/`
      }

      document.cookie = cookieString
      return true
    } catch (error) {
      console.error('Failed to delete cookie:', error)
      return false
    }
  }

  // Get all cookies
  getAllCookies(): Record<string, string> {
    try {
      const cookies: Record<string, string> = {}
      const ca = document.cookie.split(';')
      
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim()
        if (c) {
          const [name, ...valueParts] = c.split('=')
          if (name && valueParts.length > 0) {
            cookies[name] = decodeURIComponent(valueParts.join('='))
          }
        }
      }
      
      return cookies
    } catch (error) {
      console.error('Failed to get all cookies:', error)
      return {}
    }
  }

  // Set consent preferences
  setConsent(consent: Partial<CookieConsent>): void {
    this.consent = {
      necessary: true, // Always required
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      preferences: consent.preferences ?? false,
      timestamp: new Date().toISOString()
    }

    // Save to localStorage
    localStorage.setItem('cookie_consent', JSON.stringify(this.consent))

    // Set consent cookie
    this.setCookie({
      name: 'cookie_consent',
      value: JSON.stringify(this.consent),
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      secure: window.location.protocol === 'https:' && window.location.hostname !== 'localhost',
      sameSite: 'lax'
    })

    // Notify callbacks
    this.consentCallbacks.forEach(callback => callback(this.consent!))

    // Clean up cookies based on consent
    this.enforceConsent()
  }

  // Get current consent
  getConsent(): CookieConsent | null {
    return this.consent
  }

  // Check if consent is given for specific category
  hasConsent(category: keyof Omit<CookieConsent, 'timestamp'>): boolean {
    return this.consent ? this.consent[category] : false
  }

  // Load consent from storage
  private loadConsent(): void {
    try {
      // Try localStorage first
      const stored = localStorage.getItem('cookie_consent')
      if (stored) {
        this.consent = JSON.parse(stored)
        return
      }

      // Fallback to cookie
      const cookieConsent = this.getCookie('cookie_consent')
      if (cookieConsent) {
        this.consent = JSON.parse(cookieConsent)
      }
    } catch (error) {
      console.error('Failed to load consent:', error)
      this.consent = null
    }
  }

  // Enforce consent by removing non-consented cookies
  private enforceConsent(): void {
    if (!this.consent) return

    const allCookies = this.getAllCookies()
    
    // Define cookie categories
    const cookieCategories = {
      analytics: ['_ga', '_gid', '_gat', 'analytics_data', '_fbp', '_fbc'],
      marketing: ['_gcl_au', 'fr', 'tr', 'ads_data', 'marketing_data'],
      preferences: ['language', 'theme', 'user_preferences']
    }

    // Remove cookies based on consent
    Object.entries(cookieCategories).forEach(([category, cookieNames]) => {
      if (!this.consent![category as keyof CookieConsent]) {
        cookieNames.forEach(cookieName => {
          if (allCookies[cookieName]) {
            this.deleteCookie(cookieName)
          }
        })
      }
    })
  }

  // Add consent change callback
  onConsentChange(callback: (consent: CookieConsent) => void): void {
    this.consentCallbacks.push(callback)
  }

  // Remove consent change callback
  removeConsentCallback(callback: (consent: CookieConsent) => void): void {
    const index = this.consentCallbacks.indexOf(callback)
    if (index > -1) {
      this.consentCallbacks.splice(index, 1)
    }
  }

  // Check if consent banner should be shown
  shouldShowConsentBanner(): boolean {
    return this.consent === null
  }

  // Get cookie categories for display
  getCookieCategories() {
    return [
      {
        id: 'necessary',
        name: 'Necessary Cookies',
        description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
        required: true,
        cookies: [
          { name: 'session_id', purpose: 'Maintains user session', duration: 'Session' },
          { name: 'cookie_consent', purpose: 'Stores cookie preferences', duration: '1 year' }
        ]
      },
      {
        id: 'analytics',
        name: 'Analytics Cookies',
        description: 'These cookies help us understand how visitors interact with our website.',
        required: false,
        cookies: [
          { name: 'analytics_data', purpose: 'Tracks user behavior and site usage', duration: '1 year' },
          { name: '_ga', purpose: 'Google Analytics tracking', duration: '2 years' },
          { name: '_gid', purpose: 'Google Analytics session tracking', duration: '24 hours' }
        ]
      },
      {
        id: 'marketing',
        name: 'Marketing Cookies',
        description: 'These cookies are used to deliver personalized advertisements.',
        required: false,
        cookies: [
          { name: 'marketing_data', purpose: 'Tracks marketing campaign effectiveness', duration: '1 year' },
          { name: '_fbp', purpose: 'Facebook Pixel tracking', duration: '3 months' }
        ]
      },
      {
        id: 'preferences',
        name: 'Preference Cookies',
        description: 'These cookies remember your preferences and settings.',
        required: false,
        cookies: [
          { name: 'language', purpose: 'Remembers selected language', duration: '1 year' },
          { name: 'theme', purpose: 'Remembers theme preferences', duration: '1 year' }
        ]
      }
    ]
  }
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance()

// Utility functions
export const setCookie = (settings: CookieSettings) => cookieManager.setCookie(settings)
export const getCookie = (name: string) => cookieManager.getCookie(name)
export const deleteCookie = (name: string, domain?: string, path?: string) => 
  cookieManager.deleteCookie(name, domain, path)
export const hasConsent = (category: keyof Omit<CookieConsent, 'timestamp'>) => 
  cookieManager.hasConsent(category)