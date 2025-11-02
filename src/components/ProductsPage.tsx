import React, { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  Star,
  Heart,
  Eye,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  ArrowRight,
  ZoomIn,
} from 'lucide-react'
import { Product, getProducts, getProductCoverImage } from '../lib/api'
import { t, getTranslatedProductField } from '../lib/i18n'

const getCurrentLanguage = (): 'bg' | 'en' | 'el' => {
  const v = localStorage.getItem('language')
  if (v === 'bg' || v === 'en' || v === 'el') return v
  return 'bg'
}

interface ProductsPageProps {
  onProductClick: (product: Product) => void
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<'bg' | 'en' | 'el'>(getCurrentLanguage())

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | Product['category']>('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'with_price' | 'on_request'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => setCurrentLanguage(getCurrentLanguage())
    window.addEventListener('storage', handleLanguageChange)
    const interval = setInterval(handleLanguageChange, 1000)
    return () => {
      window.removeEventListener('storage', handleLanguageChange)
      clearInterval(interval)
    }
  }, [])

  // Check URL for category parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get('category')
    if (categoryParam && ['divani', 'spalni', 'stolove', 'masi'].includes(categoryParam)) {
      setSelectedCategory(categoryParam as Product['category'])
    }
  }, [])

  const getTranslatedField = (
    product: Product,
    field: 'name' | 'description' | 'dimensions'
  ): string => {
    const v =
      getTranslatedProductField?.(product, field) ??
      product?.translations?.bg?.[field] ??
      (product as any)?.[field] ??
      ''
    return typeof v === 'string' ? v : ''
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory, priceFilter, currentLanguage])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const productsData = await getProducts()
      setProducts(Array.isArray(productsData) ? productsData : [])
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = Array.isArray(products) ? products.slice() : []

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (priceFilter === 'with_price') {
      filtered = filtered.filter(p => p.show_price)
    } else if (priceFilter === 'on_request') {
      filtered = filtered.filter(p => !p.show_price)
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      filtered = filtered.filter(p => {
        const name = getTranslatedField(p, 'name').toLowerCase()
        const desc = getTranslatedField(p, 'description').toLowerCase()
        return name.includes(q) || desc.includes(q)
      })
    }

    setFilteredProducts(filtered)
  }

  const getCategoryName = (category: Product['category']) => {
    switch (category) {
      case 'divani': return t('divani')
      case 'spalni': return t('spalni')
      case 'stolove': return t('stolove')
      case 'masi': return t('masi')
      default: return category
    }
  }

  const toggleLike = (productId: string) => {
    const s = new Set(likedProducts)
    s.has(productId) ? s.delete(productId) : s.add(productId)
    setLikedProducts(s)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Зареждане на продуктите...</h3>
          <p className="text-gray-600">Моля изчакайте</p>
        </div>
      </div>
    )
  }

  const safeFiltered = Array.isArray(filteredProducts) ? filteredProducts : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-16">
      {/* Hero Section */}
      <section className="relative -mt-16">
        <div 
          className="h-80 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex items-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-white max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-light mb-4">
                  {t('productsTitle')}
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  {t('productsSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm bg-white"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as any)}
                className="px-6 py-4 border border-gray-300 rounded-2xl bg-white shadow-sm min-w-[160px] focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">{t('allCategories')}</option>
                <option value="divani">{t('divani')}</option>
                <option value="spalni">{t('spalni')}</option>
                <option value="stolove">{t('stolove')}</option>
                <option value="masi">{t('masi')}</option>
              </select>

              <select
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value as any)}
                className="px-6 py-4 border border-gray-300 rounded-2xl bg-white shadow-sm min-w-[160px] focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">{t('allPrices')}</option>
                <option value="with_price">{t('withPrice')}</option>
                <option value="on_request">{t('onRequest')}</option>
              </select>

              {(searchTerm || selectedCategory !== 'all' || priceFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setPriceFilter('all')
                  }}
                  className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
                >
                  <X size={16} />
                  {t('clearFilters')}
                </button>
              )}

              <div className="flex bg-gray-100 rounded-2xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-4 rounded-xl transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-4 rounded-xl transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-gray-600">
            {t('showingProducts')} <span className="font-semibold text-orange-600">{safeFiltered.length}</span> {t('uniqueProducts')}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {safeFiltered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">{t('noProductsFound')}</h3>
              <p className="text-gray-600 mb-8">{t('tryDifferentFilters')}</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setPriceFilter('all')
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                  : 'space-y-8'
              }
            >
              {safeFiltered.map(product => {
                const coverUrl = getProductCoverImage(product)
                const name = getTranslatedField(product, 'name') || 'Продукт'
                const description = getTranslatedField(product, 'description') || ''
                const dimensions = getTranslatedField(product, 'dimensions') || ''

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="relative overflow-hidden h-64" onClick={() => onProductClick(product)}>
                      <div className="w-full h-full relative">
                        <img
                          src={coverUrl}
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        {getCategoryName(product.category)}
                      </div>

                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg">
                          <Star size={14} fill="currentColor" />
                          Топ
                        </div>
                      )}

                      {/* New Badge */}
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {t('new')}
                      </div>
                    </div>

                    <div className="p-6 bg-white" onClick={() => onProductClick(product)}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {name}
                      </h3>

                      {dimensions && (
                        <p className="text-gray-500 text-sm mb-2">
                          {t('dimensions')}: {dimensions}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                          {product.show_price && product.price ? product.price : t('onRequest')}
                        </div>
                        <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-medium shadow-lg">
                          {t('details')}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-200 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/modoLogo.png"
                alt="MODO Mebel Logo"
                className="w-12 h-12 mr-4 object-contain"
              />
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                MODO Mebel
              </h3>
            </div>
            <p className="text-gray-300 mt-2">
              {t('footerDescription')}
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="uppercase text-gray-400 text-sm mb-4">{t('navigation')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">{t('products')}</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">{t('contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-gray-400 text-sm mb-4">{t('contacts')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2"><MapPin size={16} /> Петрич, Ильо Войвода №50</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +359 888822839</li>
              <li className="flex items-center gap-2"><Mail size={16} /> bfoam.office@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-gray-400 text-sm mb-4">{t('newsletter')}</h4>
            <form className="mt-4 flex rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder={t('newsletterPlaceholder')}
                className="flex-1 px-4 py-2 bg-gray-800 text-white outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 text-center text-gray-400 py-4 text-sm">
          © {new Date().getFullYear()} MODO Mebel. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  )
}

export default ProductsPage