import React, { useState, useEffect } from 'react'
import {
  Award,
  Users,
  Clock,
  Heart,
  Star,
  CheckCircle,
  Factory,
  Hammer,
  Palette,
  Shield,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { getSiteMetrics, SiteMetrics } from '../lib/api'
import { t } from '../lib/i18n'

const AboutPage: React.FC = () => {
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null)

  useEffect(() => {
    loadSiteMetrics()
  }, [])

  const loadSiteMetrics = async () => {
    try {
      const metrics = await getSiteMetrics()
      setSiteMetrics(metrics)
    } catch (error) {
      console.error('Error loading site metrics:', error)
    }
  }

  const handleImageClick = (imageUrl: string, title: string) => {
    setModalImage({ url: imageUrl, title })
    setShowImageModal(true)
  }


  const values = [
    {
      icon: Heart,
      title: 'Страст към качеството',
      description: 'Всеки продукт е създаден с любов и внимание към най-малките детайли.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Надеждност',
      description: 'Използваме само най-качествените материали за дълготрайност.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Palette,
      title: 'Индивидуален подход',
      description: 'Всеки клиент получава персонализирано решение за своя дом.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Factory,
      title: 'Собствено производство',
      description: 'Контролираме всеки етап от производството в нашата работилница.',
      color: 'from-green-500 to-emerald-600'
    }
  ]

  const milestones = [
    { 
      year: '2016', 
      title: 'Основаване', 
      description: 'Започнахме като малка семейна работилница с мечтата да създаваме уникални мебели',
      icon: Factory,
      color: 'from-amber-500 to-orange-600'
    },
    { 
      year: '2019', 
      title: 'Първи голям проект', 
      description: 'Обзавеждане на луксозен хотел в София - нашият пробив в индустрията',
      icon: Award,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      year: '2022', 
      title: 'Разширяване', 
      description: 'Отворихме нова работилница и шоурум в Благоевград за по-добро обслужване',
      icon: Users,
      color: 'from-green-500 to-emerald-600'
    },
    { 
      year: '2025', 
      title: 'Дигитализация', 
      description: 'Стартирахме онлайн платформата за по-лесен достъп до нашите продукти',
      icon: Heart,
      color: 'from-purple-500 to-violet-600'
    }
  ]

  const workshopImages = [
    {
      url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Нашата работилница'
    },
    {
      url: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Готови продукти'
    },
    {
      url: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Детайли от работата'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-16">
      {/* Hero Section */}
      <section className="relative -mt-16">
        <div 
          className="h-[420px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex items-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-white max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                  Нашата <span className="font-normal bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">история</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
                  От малка семейна работилница до водещ производител на луксозни мебели
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/90 backdrop-blur-md -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Award className="text-white" size={36} />
              </div>
              <h4 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                {siteMetrics?.years_experience || 15}+
              </h4>
              <p className="text-gray-600 text-lg font-medium">Години опит в производството</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Users className="text-white" size={36} />
              </div>
              <h4 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                {siteMetrics?.satisfied_clients || 500}+
              </h4>
              <p className="text-gray-600 text-lg font-medium">Доволни клиенти</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-100 hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Clock className="text-white" size={36} />
              </div>
              <h4 className="text-5xl font-bold mb-3 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                {siteMetrics?.handmade_percentage || 100}%
              </h4>
              <p className="text-gray-600 text-lg font-medium">Ръчна изработка</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Нашата мисия</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Започнахме като малка семейна работилница с мечтата да създаваме мебели, които не само са красиви, 
                  но и издържливи. Днес, след {siteMetrics?.years_experience || 15} години упорита работа, сме горди, 
                  че можем да предложим на нашите клиенти продукти от най-високо качество.
                </p>
                <p>
                  Всеки продукт носи частичка от нашата страст към майсторството и стремежа ни към съвършенство. 
                  Ние не просто правим мебели - ние създаваме произведения на изкуството за вашия дом.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-8 h-8 text-amber-400 fill-current drop-shadow-sm" />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <div 
                className="relative overflow-hidden rounded-3xl shadow-2xl cursor-zoom-in"
                onClick={() => handleImageClick(workshopImages[0].url, workshopImages[0].title)}
              >
                <img
                  src={workshopImages[0].url}
                  alt="Нашата работилница"
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <ZoomIn size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Нашите ценности</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Принципите, които ни водят в създаването на всеки продукт
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="group text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Нашият път</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ключовите моменти в развитието на нашата компания
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <div key={index} className="group relative">
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center mr-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="text-white" size={28} />
                        </div>
                        <div className={`text-4xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                          {milestone.year}
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{milestone.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Нашата работилница</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Поглед зад кулисите на нашето производство
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshopImages.map((image, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-3xl shadow-2xl cursor-zoom-in hover:shadow-3xl transition-all duration-300 hover:scale-105"
                onClick={() => handleImageClick(image.url, image.title)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <ZoomIn size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">{t('readyToCreate')}</h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('contactToday')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+359888822839"
              className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 text-lg"
            >
              <Phone size={24} />
              {t('callNow')}
            </a>
            <a
              href="mailto:bfoam.office@gmail.com"
              className="border-2 border-white text-white px-10 py-5 rounded-2xl font-semibold hover:bg-white hover:text-orange-600 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Mail size={24} />
              {t('sendEmail')}
            </a>
          </div>
        </div>
      </section>

      {/* Image Modal */}
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
              alt={modalImage.title}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-md">
              <h3 className="text-lg font-semibold">{modalImage.title}</h3>
            </div>
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
              Производители на висококачествени луксозни мебели за вашия дом.
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
            <h4 className="uppercase text-gray-400 text-sm mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Начало</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Продукти</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">За нас</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Контакт</a></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase text-gray-400 text-sm mb-4">Контакт</h4>
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
          © 2025 MODO Mebel. Всички права запазени.
        </div>
      </footer>
    </div>
  )
}

export default AboutPage