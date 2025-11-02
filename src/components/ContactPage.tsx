import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  AtSign,
  FileText,
  CheckCircle,
  Facebook,
  Instagram,
  ArrowRight,
  Car,
  Home,
  Building,
} from 'lucide-react'
import { createContactInquiry } from '../lib/api'
import { useToast } from './ToastContainer'
import { t } from '../lib/i18n'

const ContactPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const inquiry = await createContactInquiry({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message,
        product_id: null,
      })

      if (inquiry) {
        showToast('success', 'Успешно изпратено!', 'Благодарим за запитването! Ще се свържем с Вас скоро.')
        setContactForm({ name: '', email: '', phone: '', message: '' })
      } else {
        showToast('error', 'Грешка!', 'Възникна грешка при изпращането. Моля опитайте отново.')
      }
    } catch (error) {
      showToast('error', 'Грешка!', 'Възникна грешка при изпращането. Моля опитайте отново.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      details: ['+359 888822839'],
      action: 'tel:+359888822839',
      actionText: 'Обадете се сега'
    },
    {
      icon: Mail,
      title: 'Имейл',
      details: ['bfoam.office@gmail.com'],
      action: 'mailto:bfoam.office@gmail.com',
      actionText: 'Изпратете имейл'
    },
    {
      icon: MapPin,
      title: 'Адреси',
      details: [
        'Цех: Петрич, Ильо Войвода №50',
        'Шоурум: Благоевград, ул. Орфей № 3'
      ],
    }
  ]

  const workingHours = [
    {
      location: 'Цех Петрич',
      icon: Building,
      hours: [
        { days: 'Понеделник - Петък', time: '8:00 - 17:00' },
        { days: 'Събота', time: '8:00 - 12:00' },
        { days: 'Неделя', time: 'Затворено' }
      ]
    },
    {
      location: 'Шоурум Благоевград',
      icon: Home,
      hours: [
        { days: 'Понеделник - Петък', time: '9:00 - 18:00' },
        { days: 'Събота', time: '9:00 - 14:00' },
        { days: 'Неделя', time: 'Затворено' }
      ]
    }
  ]

  const features = [
    {
      icon: Car,
      title: 'Безплатна доставка',
      description: 'В радиус от 50км от Петрич и Благоевград'
    },
    {
      icon: CheckCircle,
      title: 'Гаранция',
      description: 'На всички наши продукти'
    },
    {
      icon: MessageCircle,
      title: '24/7 Поддръжка',
      description: 'Винаги сме на разположение за въпроси'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-16">
      {/* Hero Section */}
      <section className="relative -mt-16">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 h-full flex items-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-white max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-light mb-6">
                  Свържете се <span className="font-normal bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">с нас</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  Готови сме да отговорим на всички ваши въпроси и да ви помогнем с избора на перфектните мебели
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-white/80 backdrop-blur-md -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100 hover:shadow-2xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{info.title}</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                  <a
                    href={info.action}
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    {info.actionText}
                    <ArrowRight size={16} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={28} />
                </div>
                <h2 className="text-3xl font-light text-gray-900 mb-2">Изпратете запитване</h2>
                <p className="text-gray-600">Попълнете формата и ще се свържем с вас в рамките на 24 часа</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Вашето име *"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Вашият имейл *"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="Вашият телефон"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <FileText className="absolute left-3 top-4 text-gray-400" size={20} />
                  <textarea
                    rows={5}
                    placeholder="Вашето съобщение *"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Изпращане...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Изпрати запитване
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  * Задължителни полета
                </p>
              </form>
            </div>

            {/* Working Hours & Features */}
            <div className="space-y-8">
              {/* Working Hours */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-white" size={28} />
                  </div>
                  <h2 className="text-3xl font-light text-gray-900 mb-2">Работно време</h2>
                  <p className="text-gray-600">Посетете ни в удобно за вас време</p>
                </div>

                <div className="space-y-6">
                  {workingHours.map((location, index) => {
                    const Icon = location.icon
                    return (
                      <div key={index} className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-orange-100">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className="text-orange-600" size={24} />
                          <h3 className="text-xl font-semibold text-gray-900">{location.location}</h3>
                        </div>
                        <div className="space-y-2">
                          {location.hours.map((schedule, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-gray-600">{schedule.days}</span>
                              <span className="font-medium text-gray-900">{schedule.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
                <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">Защо да изберете нас?</h3>
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Намерете ни</h2>
            <p className="text-xl text-gray-600">Посетете нашия цех или шоурум</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl h-96 flex items-center justify-center border border-orange-100">
              <div className="text-center">
                <MapPin className="text-orange-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Цех Петрич</h3>
                <p className="text-gray-600 mb-4">Ильо Войвода №50, Петрич</p>
                <a
                  href="https://maps.google.com/maps?q=41.390264,23.194573"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all"
                >
                  <MapPin size={16} />
                  Вижте на картата
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl h-96 flex items-center justify-center border border-orange-100">
              <div className="text-center">
                <Home className="text-orange-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Шоурум Благоевград</h3>
                <p className="text-gray-600 mb-4">ул. Орфей № 3, Благоевград</p>
                <a
                  href="https://maps.google.com/maps?q=42.001437,23.111529"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all"
                >
                  <MapPin size={16} />
                  Вижте на картата
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-6">{t('needQuickAnswer')}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('callDirectly')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+359888822839"
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              +359 888822839
            </a>
            <a
              href="mailto:bfoam.office@gmail.com"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              bfoam.office@gmail.com
            </a>
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

export default ContactPage