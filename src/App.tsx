import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Star,
  Award,
  Users,
  Clock,
  CheckCircle,
  Hammer,
  Palette,
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Send,
  User,
  AtSign,
  FileText,
  Factory,
  Heart,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Product, 
  SiteMetrics, 
  getFeaturedProducts, 
  getSiteMetrics, 
  createContactInquiry,
  getProductCoverImage,
  getProductImageUrls
} from './lib/api';
import { t, getTranslatedProductField, getCurrentLanguage } from './lib/i18n';
import { analytics } from './lib/analytics';
import { useToast } from './components/ToastContainer';

interface AppProps {
  onNavigateToProducts: (category?: string) => void;
  onNavigateToProductDetail: (product: Product) => void;
  onNavigateToAdmin: () => void;
}

const App: React.FC<AppProps> = ({ 
  onNavigateToProducts, 
  onNavigateToProductDetail, 
  onNavigateToAdmin 
}) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<{ url: string; product: Product; index: number } | null>(null);
  const { showToast } = useToast();

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(getCurrentLanguage());
    };
    
    window.addEventListener('storage', handleLanguageChange);
    const interval = setInterval(handleLanguageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    loadFeaturedProducts();
    loadSiteMetrics();
    
    // Track page view
    analytics.trackPageView(window.location.href, 'MODO Mebel - Home');
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await getFeaturedProducts();
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  };

  const loadSiteMetrics = async () => {
    try {
      const metrics = await getSiteMetrics();
      setSiteMetrics(metrics);
    } catch (error) {
      console.error('Error loading site metrics:', error);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiry = await createContactInquiry({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message,
        product_id: null,
      });

      if (inquiry) {
        showToast('success', 'Успешно изпратено!', t('inquirySuccess'));
        setContactForm({ name: '', email: '', phone: '', message: '' });
        analytics.trackConversion();
      } else {
        showToast('error', 'Грешка!', t('inquiryError'));
      }
    } catch (error) {
      showToast('error', 'Грешка!', t('inquiryError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (category: Product['category']) => {
    const names = {
      divani: t('divani'),
      spalni: t('spalni'),
      stolove: t('stolove'),
      masi: t('masi')
    };
    return names[category];
  };

  const getTranslatedField = (product: Product, field: 'name' | 'description' | 'dimensions'): string => {
    return getTranslatedProductField(product, field) || '';
  };

  const handleImageClick = (product: Product, imageIndex: number = 0) => {
    const images = getProductImageUrls(product);
    if (images.length > 0) {
      setModalImage({
        url: images[imageIndex],
        product,
        index: imageIndex
      });
      setShowImageModal(true);
    }
  };

  const nextModalImage = () => {
    if (!modalImage) return;
    const images = getProductImageUrls(modalImage.product);
    const nextIndex = (modalImage.index + 1) % images.length;
    setModalImage({
      ...modalImage,
      url: images[nextIndex],
      index: nextIndex
    });
  };

  const prevModalImage = () => {
    if (!modalImage) return;
    const images = getProductImageUrls(modalImage.product);
    const prevIndex = (modalImage.index - 1 + images.length) % images.length;
    setModalImage({
      ...modalImage,
      url: images[prevIndex],
      index: prevIndex
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="text-white max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              {t('heroTitle').split('\n').map((line, index) => (
                <div key={index}>
                  {index === 0 ? line : (
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-normal">
                      {line}
                    </span>
                  )}
                </div>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => onNavigateToProducts()}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('heroButton1')}
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('manufacturing')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-gray-900 transition-all font-semibold text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('heroButton2')}
                <Factory size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {t('categoriesTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('categoriesSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                category: 'divani' as const, 
                image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
                name: t('divani')
              },
              { 
                category: 'spalni' as const, 
                image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
                name: t('spalni')
              },
              { 
                category: 'stolove' as const, 
                image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800',
                name: t('stolove')
              },
              { 
                category: 'masi' as const, 
                image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                name: t('masi')
              }
            ].map((item, index) => (
              <motion.div
                key={item.category}
                className="group cursor-pointer"
                onClick={() => onNavigateToProducts(item.category)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 text-amber-400">
                      <ArrowRight size={18} />
                      <span className="text-sm">{t('viewAll')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {t('productsTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('productsSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => {
              const coverImage = getProductCoverImage(product);
              const productName = getTranslatedField(product, 'name') || 'Продукт';
              const productDescription = getTranslatedField(product, 'description') || '';
              
              return (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => onNavigateToProductDetail(product)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-64">
                    <div className="w-full h-full relative">
                      <img
                        src={coverImage}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Zoom overlay */}
                      <div 
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageClick(product, 0);
                        }}
                      >
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye size={24} className="text-gray-800" />
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {getCategoryName(product.category)}
                    </div>

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg">
                        <Star size={14} fill="currentColor" />
                        {t('new')}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {productName}
                    </h3>

                    {getTranslatedField(product, 'dimensions') && (
                      <p className="text-gray-500 text-sm mb-4">
                        {t('dimensions')}: {getTranslatedField(product, 'dimensions')}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                        {product.show_price && product.price ? `${product.price}` : t('onRequest')}
                      </div>
                      <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-medium shadow-lg">
                        {t('details')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => onNavigateToProducts()}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl flex items-center gap-2 mx-auto"
            >
              {t('viewAll')}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section id="manufacturing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {t('manufacturingTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('manufacturingSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                {t('manufacturingWorkshopTitle')}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('manufacturingWorkshopText')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Hammer, text: t('manufacturingFeature1') },
                  { icon: Award, text: t('manufacturingFeature2') },
                  { icon: Users, text: t('manufacturingFeature3') },
                  { icon: Shield, text: t('manufacturingFeature4') }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-white" size={20} />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t('manufacturingWorkshopTitle')}
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: siteMetrics?.years_experience || 15, 
                suffix: '+', 
                text: t('manufacturingStat1Text'),
                icon: Clock 
              },
              { 
                number: siteMetrics?.satisfied_clients || 500, 
                suffix: '+', 
                text: t('manufacturingStat2Text'),
                icon: Users 
              },
              { 
                number: siteMetrics?.handmade_percentage || 100, 
                suffix: '%', 
                text: t('manufacturingStat3Text'),
                icon: Award 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-orange-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white" size={28} />
                </div>
                <h4 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                  {stat.number}{stat.suffix}
                </h4>
                <p className="text-gray-600 leading-relaxed">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={t('aboutTitle')}
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {t('aboutTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('aboutText1')}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('aboutText2')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-orange-100">
                  <h4 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                    {siteMetrics?.satisfied_clients || 500}+
                  </h4>
                  <p className="text-gray-600">{t('satisfiedClients')}</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-orange-100">
                  <h4 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                    {siteMetrics?.years_experience || 15}+
                  </h4>
                  <p className="text-gray-600">{t('yearsExperience')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {t('contactTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t('contactInfo')}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{t('phone')}</p>
                      <a href="tel:+359888822839" className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                        +359 888822839
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{t('email')}</p>
                      <a href="mailto:bfoam.office@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                        bfoam.office@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{t('address')}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        Петрич, Ильо Войвода №50
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-orange-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('sendInquiry')}
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={t('yourName')}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder={t('yourEmail')}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder={t('yourPhone')}
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
                <div className="relative">
                  <FileText className="absolute left-3 top-4 text-gray-400" size={20} />
                  <textarea
                    rows={5}
                    placeholder={t('yourMessage')}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all bg-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {t('pleaseWait')}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('sendButton')}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
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
              <li><a href="#" className="hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="#" onClick={onNavigateToProducts} className="hover:text-white transition-colors cursor-pointer">{t('products')}</a></li>
              <li><a href="#manufacturing" className="hover:text-white transition-colors">{t('manufacturing')}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('contact')}</a></li>
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
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center text-gray-400 py-4 text-sm">
          © 2025 MODO Mebel. {t('allRightsReserved')}
        </div>
      </footer>

      {/* Image Zoom Modal */}
      {showImageModal && modalImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
            >
              <X size={24} />
            </button>
            <img
              src={modalImage.url}
              alt={getTranslatedField(modalImage.product, 'name')}
              className="max-w-full max-h-full object-contain"
            />
            {getProductImageUrls(modalImage.product).length > 1 && (
              <>
                <button
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Admin Access */}
      <div 
        className="fixed bottom-4 left-4 w-4 h-4 opacity-0 cursor-pointer"
        onClick={onNavigateToAdmin}
      />
    </div>
  );
};

export default App;