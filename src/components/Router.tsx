import React, { useState, useEffect } from 'react'
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'
import App from '../App'
import ProductsPage from './ProductsPage'
import ProductDetailPage from './ProductDetailPage'
import AdminPanel from './AdminPanel'
import LoginForm from './LoginForm'
import LanguageSwitcher from './LanguageSwitcher'
import { Product, getCurrentUser, getProductById } from '../lib/api'
import { Language, t, getCurrentLanguage } from '../lib/i18n'
import CookieBanner from './CookieBanner'
import { analytics } from '../lib/analytics'
import { ToastProvider } from './ToastContainer'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'

export type Route = 'home' | 'products' | 'product-detail' | 'about' | 'contact' | 'admin' | 'login'

const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getCurrentLanguage())
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0)
  }, [currentRoute])

  useEffect(() => {
    // Handle browser navigation
    const handlePopState = () => {
      updateRouteFromURL()
    }

    window.addEventListener('popstate', handlePopState)
    updateRouteFromURL()
    checkUser()
    
    // Track initial page view
    analytics.trackPageView(window.location.href, document.title)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const checkUser = async () => {
    const { user } = await getCurrentUser()
    setUser(user)
  }

  const updateRouteFromURL = () => {
    const path = window.location.pathname
    
    if (path === '/' || path === '/home') {
      setCurrentRoute('home')
    } else if (path === '/products') {
      setCurrentRoute('products')
    } else if (path === '/about') {
      setCurrentRoute('about')
    } else if (path === '/contact') {
      setCurrentRoute('contact')
    } else if (path.startsWith('/products/')) {
      setCurrentRoute('product-detail')
      // Extract product ID from URL and load product
      const productId = path.split('/products/')[1]
      if (productId) {
        // Always load product from URL, even if we have one selected
        loadProductFromUrl(productId)
      }
    } else if (path === '/_tijassd!@') {
      if (user) {
        setCurrentRoute('admin')
      } else {
        setCurrentRoute('login')
      }
    } else {
      setCurrentRoute('home')
    }
  }

  const loadProductFromUrl = async (productId: string) => {
    setIsLoadingProduct(true)
    try {
      console.log('Router: Loading product from URL with ID:', productId)
      const product = await getProductById(productId)
      console.log('Router: Received product:', product)
      if (product) {
        setSelectedProduct(product)
      } else {
        console.error('Router: Product not found with ID:', productId)
        // Redirect to products page if product not found
        navigateTo('products')
      }
    } catch (error) {
      console.error('Router: Error loading product from URL:', error)
      navigateTo('products')
    } finally {
      setIsLoadingProduct(false)
    }
  }

  const navigateTo = (route: Route, product?: Product) => {
    let path = '/'
    
    switch (route) {
      case 'home':
        path = '/'
        break
      case 'products':
        path = '/products'
        break
      case 'about':
        path = '/about'
        break
      case 'contact':
        path = '/contact'
        break
      case 'product-detail':
        if (product) {
          path = `/products/${product.id}`
          setSelectedProduct(product)
        }
        break
      case 'admin':
        path = '/_tijassd!@'
        break
      case 'login':
        path = '/_tijassd!@'
        break
    }

    window.history.pushState({}, '', path)
    setCurrentRoute(route)
    
    // Track page view only for public pages
    if (route !== 'admin' && route !== 'login') {
      analytics.trackPageView(path, `MODO Mebel - ${route === 'home' ? 'Home' : route === 'products' ? 'Products' : route === 'product-detail' ? 'Product Detail' : document.title}`)
    }
  }

  const navigateToProductsWithCategory = (category?: string) => {
    const path = category ? `/products?category=${category}` : '/products'
    window.history.pushState({}, '', path)
    setCurrentRoute('products')
    analytics.trackPageView(path, 'MODO Mebel - Products')
  }
  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang)
    // Force re-render without page reload
    setCurrentRoute(currentRoute) // Trigger re-render
  }

  const handleLogin = () => {
    checkUser()
    setCurrentRoute('admin')
  }

  const handleSignOut = () => {
    setUser(null)
    navigateTo('home')
  }

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== 'home') {
      navigateTo('home')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  // Navigation component
  const Navigation = () => (
    <nav className="bg-black/20 backdrop-blur-md shadow-sm fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer relative z-50" onClick={() => navigateTo('home')}>
            <img 
              src="/modoLogo.png" 
              alt="MODO Mebel Logo" 
              className="w-20 h-20 object-contain transform -translate-y-2"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateTo('home')}
              className={`text-white hover:text-gray-200 transition-colors ${
                currentRoute === 'home' ? 'border-b-2 border-orange-500' : ''
              }`}
            >
              {t('home')}
            </button>
            <button
              onClick={() => navigateTo('products')}
              className={`text-white hover:text-gray-200 transition-colors ${
                currentRoute === 'products' || currentRoute === 'product-detail' ? 'border-b-2 border-orange-500' : ''
              }`}
            >
              {t('products')}
            </button>
            <button
              onClick={() => scrollToSection('manufacturing')}
              className="text-white hover:text-gray-200 transition-colors"
            >
              {t('manufacturing')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => navigateTo('about')}
              className={`text-white hover:text-gray-200 transition-colors ${
                currentRoute === 'about' ? 'border-b-2 border-orange-500' : ''
              }`}
            >
              {t('about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-gray-200 transition-colors"
              onClick={() => navigateTo('contact')}
              className={`text-white hover:text-gray-200 transition-colors ${
                currentRoute === 'contact' ? 'border-b-2 border-orange-500' : ''
              }`}
            >
              {t('contact')}
            </button>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-gray-200">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => {
                  navigateTo('home')
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left text-white hover:text-gray-200 transition-colors py-2 ${
                  currentRoute === 'home' ? 'border-l-4 border-orange-500 pl-4' : ''
                }`}
              >
                {t('home')}
              </button>
              <button
                onClick={() => {
                  navigateTo('products')
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left text-white hover:text-gray-200 transition-colors py-2 ${
                  currentRoute === 'products' || currentRoute === 'product-detail' ? 'border-l-4 border-orange-500 pl-4' : ''
                }`}
              >
                {t('products')}
              </button>
              <button
                onClick={() => {
                  scrollToSection('manufacturing')
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left text-white hover:text-gray-200 transition-colors py-2"
              >
                {t('manufacturing')}
              </button>
              <button
                onClick={() => {
                  scrollToSection('about')
                  setIsMobileMenuOpen(false)
                  navigateTo('about')
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left text-white hover:text-gray-200 transition-colors py-2"
                className={`block w-full text-left text-white hover:text-gray-200 transition-colors py-2 ${
                  currentRoute === 'about' ? 'border-l-4 border-orange-500 pl-4' : ''
                }`}
              >
                {t('about')}
              </button>
              <button
                onClick={() => {
                  scrollToSection('contact')
                  setIsMobileMenuOpen(false)
                  navigateTo('contact')
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left text-white hover:text-gray-200 transition-colors py-2"
                className={`block w-full text-left text-white hover:text-gray-200 transition-colors py-2 ${
                  currentRoute === 'contact' ? 'border-l-4 border-orange-500 pl-4' : ''
                }`}
              >
                {t('contact')}
              </button>
              <div className="border-t border-white/20 pt-4 flex justify-center">
                <LanguageSwitcher onLanguageChange={handleLanguageChange} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  // Render current route
  switch (currentRoute) {
    case 'home':
      return (
        <ToastProvider>
          <Navigation />
          <App 
            onNavigateToProducts={(category) => navigateToProductsWithCategory(category)}
            onNavigateToProductDetail={(product) => navigateTo('product-detail', product)}
            onNavigateToAdmin={() => navigateTo(user ? 'admin' : 'login')}
          />
          <CookieBanner />
        </ToastProvider>
      )
    
    case 'products':
      return (
        <ToastProvider>
          <Navigation />
          <ProductsPage
            onProductClick={(product) => navigateTo('product-detail', product)}
          />
          <CookieBanner />
        </ToastProvider>
      )
    
    case 'about':
      return (
        <ToastProvider>
          <Navigation />
          <AboutPage />
          <CookieBanner />
        </ToastProvider>
      )
    
    case 'contact':
      return (
        <ToastProvider>
          <Navigation />
          <ContactPage />
          <CookieBanner />
        </ToastProvider>
      )
    
    case 'product-detail':
      if (isLoadingProduct) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="text-center">
              <div className="h-16 w-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Зареждане на продукта...</h3>
              <p className="text-gray-600">Моля изчакайте</p>
            </div>
          </div>
        )
      }
      
      return selectedProduct ? (
        <ToastProvider>
          <Navigation />
          <ProductDetailPage
            product={selectedProduct}
            onNavigateToProducts={() => navigateTo('products')}
            onNavigateHome={() => navigateTo('home')}
          />
          <CookieBanner />
        </ToastProvider>
      ) : (
        <ToastProvider>
          <Navigation />
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 pt-16">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <X className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">{t('productNotFound')}</h3>
              <p className="text-gray-600 mb-8">{t('productNotFoundDesc')}</p>
              <button
                onClick={() => navigateTo('products')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
              >
                {t('backToProducts')}
              </button>
            </div>
          </div>
          <CookieBanner />
        </ToastProvider>
      )
    
    case 'admin':
      return user ? (
        <ToastProvider>
          <AdminPanel
            onClose={() => navigateTo('home')}
            onSignOut={handleSignOut}
          />
        </ToastProvider>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )
    
    case 'login':
      return <LoginForm onLogin={handleLogin} />
    
    default:
      return (
        <ToastProvider>
        <App 
          onNavigateToProducts={() => navigateTo('products')}
          onNavigateToProductDetail={(product) => navigateTo('product-detail', product)}
          onNavigateToAdmin={() => navigateTo(user ? 'admin' : 'login')}
        />
        <CookieBanner />
        </ToastProvider>
      )
  }
}

export default Router