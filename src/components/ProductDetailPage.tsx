import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Ruler,
  Package,
  Award,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  Shield,
  Truck,
  Clock,
  Users,
  Facebook,
  Instagram,
  MapPin,
  ZoomIn,
  X,
  Palette,
  Hammer,
  Eye,
  Star,
} from 'lucide-react'
import { Product, createContactInquiry } from '../lib/api'
import { getProductImageUrls, getProductCoverImage } from '../lib/api'
import { analytics } from '../lib/analytics'
import { useToast } from './ToastContainer'
import { getCurrentLanguage, getTranslatedProductField, t } from '../lib/i18n'

interface ProductDetailPageProps {
  product: Product
  onNavigateToProducts?: () => void
  onNavigateHome?: () => void
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  onNavigateToProducts, 
  onNavigateHome 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage())
  const { showToast } = useToast()

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(getCurrentLanguage())
    }
    
    window.addEventListener('storage', handleLanguageChange)
    const interval = setInterval(handleLanguageChange, 100)
    
    return () => {
      window.removeEventListener('storage', handleLanguageChange)
      clearInterval(interval)
    }
  }, [])

  const productImages = getProductImageUrls(product)
  const hasMultipleImages = productImages.length > 1
  
  useEffect(() => {
    productImages.forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }, [productImages])

  const getTranslatedField = (field: 'name' | 'description' | 'dimensions'): string => {
    return getTranslatedProductField(product, field) || ''
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const inquiry = await createContactInquiry({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: `${t('productInquiry')}: ${getTranslatedField('name')}\n\n${contactForm.message}`,
        product_id: product.id,
      })
      
      if (inquiry) {
        showToast('success', 'Успешно изпратено!', t('inquirySuccess'))
        setContactForm({ name: '', email: '', phone: '', message: '' })
        setShowContactForm(false)
        analytics.trackConversion()
      } else {
        showToast('error', 'Грешка!', t('inquiryError'))
      }
    } catch (error) {
      showToast('error', 'Грешка!', t('inquiryError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryName = (category: Product['category']) => {
    const names = {
      divani: t('divani'),
      spalni: t('spalni'),
      stolove: t('stolove'),
      masi: t('masi')
    }
    return names[category]
  }

  const handleBreadcrumbClick = (type: 'home' | 'products') => {
    if (type === 'home' && onNavigateHome) {
      onNavigateHome()
    } else if (type === 'products' && onNavigateToProducts) {
      onNavigateToProducts()
    }
  }

  const placeholder = 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
  const currentImage = productImages.length > 0 ? productImages[currentImageIndex] || placeholder : placeholder

  const features = [
    {
      icon: Hammer,
      title: t('handcrafted'),
      description: t('handcraftedDesc')
    },
    {
      icon: Award,
      title: t('premiumMaterials'),
      description: t('premiumMaterialsDesc')
    },
    {
      icon: Palette,
      title: t('uniqueDesign'),
      description: t('uniqueDesignDesc')
    },
    {
      icon: Shield,
      title: t('qualityGuarantee'),
      description: t('qualityGuaranteeDesc')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 text-lg">
          <button 
            onClick={() => handleBreadcrumbClick('home')}
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Начало
          </button>
          <ChevronRight size={20} className="text-gray-400" />
          <button 
            onClick={() => handleBreadcrumbClick('products')}
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Продукти
          </button>
          <ChevronRight size={20} className="text-gray-400" />
          <span className="text-blue-600 font-semibold">{getTranslatedField('name')}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Image Gallery - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div 
                  className="w-full h-full cursor-zoom-in relative"
                  onClick={() => setShowImageModal(true)}
                >
                  <img
                    src={currentImage}
                    alt={getTranslatedField('name')}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Failed to load image:', target.src);
                      target.src = 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-gray-800 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <ZoomIn size={24} />
                  </div>
                  
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
                      >
                        <ChevronLeft size={28} className="text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
                      >
                        <ChevronRight size={28} className="text-gray-800" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image Indicators */}
                {hasMultipleImages && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125 shadow-lg'
                            : 'bg-white/70 hover:bg-white/90 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.slice(0, 4).map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-2xl overflow-hidden border-3 transition-all duration-300 hover:scale-105 ${
                      index === currentImageIndex
                        ? 'border-blue-500 shadow-xl ring-4 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 shadow-lg'
                    } bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${getTranslatedField('name')} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.log('Failed to load thumbnail image:', target.src);
                        target.src = 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Takes 1 column */}
          <div className="space-y-8">
            {/* Product Title and Price */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {getCategoryName(product.category)}
                </span>
                {product.featured && (
                  <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star size={16} fill="currentColor" />
                    {t('topProduct')}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                {getTranslatedField('name')}
              </h1>
              
              <div className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  {product.show_price && product.price ? `${product.price} ${t('currency')}` : t('onRequest')}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-5 px-8 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 flex items-center justify-center gap-3 font-semibold text-lg shadow-2xl"
                >
                  <MessageCircle size={24} />
                  {t('inquiry')}
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+359888822839"
                    className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md py-4 px-4 rounded-2xl hover:bg-white transition-all text-gray-700 font-semibold border border-gray-200 hover:border-orange-300 shadow-xl hover:shadow-2xl"
                  >
                    <Phone size={20} />
                    {t('callUs')}
                  </a>
                  <a
                    href="mailto:bfoam.office@gmail.com"
                    className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md py-4 px-4 rounded-2xl hover:bg-white transition-all text-gray-700 font-semibold border border-gray-200 hover:border-orange-300 shadow-xl hover:shadow-2xl"
                  >
                    <Mail size={20} />
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
                <Shield className="text-orange-600 mx-auto mb-3" size={32} />
                <p className="text-sm text-orange-700 font-semibold">{t('warranty')}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
                <Truck className="text-orange-600 mx-auto mb-3" size={32} />
                <p className="text-sm text-orange-700 font-semibold">{t('delivery')}</p>
                <p className="font-bold text-orange-800 text-lg">{t('free')}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-orange-100 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <Ruler className="text-orange-600" size={28} />
                {t('specifications')}
              </h3>
              <div className="space-y-4">
                {getTranslatedField('dimensions') && (
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                    <Package className="text-orange-600 flex-shrink-0" size={24} />
                    <div>
                      <p className="text-sm text-orange-700 font-semibold">{t('dimensions')}</p>
                      <p className="text-lg font-bold text-orange-900">{getTranslatedField('dimensions')}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <Award className="text-amber-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-sm text-amber-700 font-semibold">{t('quality')}</p>
                    <p className="text-lg font-bold text-amber-900">{t('premium')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 md:mb-8 text-left">{t('description')}</h3>
          <div className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line text-left break-words">
            {getTranslatedField('description') || 'Този продукт е изработен с внимание към всеки детайл, използвайки най-качествените материали и модерни технологии. Перфектното допълнение към вашия дом.'}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 md:mb-12 text-left px-4 md:px-0">{t('advantages')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colors = [
                'from-orange-500 to-red-600',
                'from-amber-500 to-orange-600', 
                'from-yellow-500 to-orange-600',
                'from-yellow-500 to-orange-600'
              ]
              return (
                <div key={index} className="group text-center p-6 md:p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors[index]} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">{feature.title}</h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Image Modal for Zoom */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-6 right-6 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-all z-10 shadow-2xl"
            >
              <X size={28} />
            </button>
            <img
              src={currentImage}
              alt={getTranslatedField('name')}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-all shadow-2xl"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-4 rounded-full hover:bg-white/30 transition-all shadow-2xl"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">{t('productInquiry')}</h3>
              </div>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <input
                type="text"
                placeholder={t('yourName')}
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-md"
                required
              />
              <input
                type="email"
                placeholder={t('yourEmail')}
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-md"
                required
              />
              <input
                type="tel"
                placeholder={t('yourPhone')}
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-md"
              />
              <textarea
                rows={4}
                placeholder={t('yourMessage')}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all bg-white/80 backdrop-blur-md"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t('pleaseWait')}
                  </>
                ) : (
                  <>
                    <MessageCircle size={20} />
                    {t('sendButton')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

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
            <h4 className="uppercase text-gray-400 text-sm mb-4">Работно време</h4>
            <div className="space-y-2 text-gray-300">
              <div>
                <div className="font-medium text-white">Цех Петрич:</div>
                <div>Пон-Пет: 8:00 - 17:00</div>
                <div>Събота: 8:00 - 12:00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center text-gray-400 py-4 text-sm">
          © 2025 MODO Mebel. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  )
}

export default ProductDetailPage