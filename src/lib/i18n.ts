export type Language = 'bg' | 'en' | 'el'

// Import Product type for translation function
import type { Product } from '../types/database'

export interface Translations {
  // Navigation
  home: string
  products: string
  manufacturing: string
  about: string
  contact: string
  
  // Hero section
  heroTitle: string
  heroSubtitle: string
  heroButton1: string
  heroButton2: string
  
  // Categories
  categoriesTitle: string
  categoriesSubtitle: string
  divani: string
  spalni: string
  stolove: string
  masi: string
  
  // Manufacturing
  manufacturingTitle: string
  manufacturingSubtitle: string
  manufacturingWorkshopTitle: string
  manufacturingWorkshopText: string
  manufacturingFeature1: string
  manufacturingFeature2: string
  manufacturingFeature3: string
  manufacturingFeature4: string
  manufacturingStat1: string
  manufacturingStat1Text: string
  manufacturingStat2: string
  manufacturingStat2Text: string
  manufacturingStat3: string
  manufacturingStat3Text: string
  
  // Products
  productsTitle: string
  productsSubtitle: string
  viewAll: string
  new: string
  details: string
  inquiry: string
  onRequest: string
  dimensions: string
  
  // About
  aboutTitle: string
  aboutText1: string
  aboutText2: string
  satisfiedClients: string
  yearsExperience: string
  
  // Contact
  contactTitle: string
  contactSubtitle: string
  contactInfo: string
  phone: string
  email: string
  address: string
  sendInquiry: string
  yourName: string
  yourEmail: string
  yourPhone: string
  yourMessage: string
  sendButton: string
  
  // Footer
  footerDescription: string
  navigation: string
  contacts: string
  newsletter: string
  newsletterPlaceholder: string
  allRightsReserved: string
  
  // Product detail
  specifications: string
  quality: string
  premium: string
  warranty: string
  delivery: string
  free: string
  description: string
  features: string
  feature1: string
  feature2: string
  feature3: string
  feature4: string
  feature5: string
  addToCart: string
  callUs: string
  topProduct: string
  advantages: string
  handcrafted: string
  premiumMaterials: string
  uniqueDesign: string
  qualityGuarantee: string
  currency: string
  handcraftedDesc: string
  premiumMaterialsDesc: string
  uniqueDesignDesc: string
  qualityGuaranteeDesc: string
  breadcrumbHome: string
  breadcrumbProducts: string
  productNotFound: string
  productNotFoundDesc: string
  backToProducts: string
  years2: string
  freeDelivery: string
  
  // Products page
  searchPlaceholder: string
  allCategories: string
  allPrices: string
  withPrice: string
  showingProducts: string
  uniqueProducts: string
  premiumQuality: string
  handmade: string
  modernDesign: string
  clearFilters: string
  noProductsFound: string
  tryDifferentFilters: string
  sortBy: string
  newest: string
  oldest: string
  priceHigh: string
  priceLow: string
  
  // Contact form
  inquirySuccess: string
  inquiryError: string
  productInquiry: string
  
  // About page
  ourStory: string
  ourMission: string
  ourValues: string
  ourJourney: string
  keyMoments: string
  ourWorkshop: string
  workshopGallery: string
  behindScenes: string
  readyToCreate: string
  contactToday: string
  transformVision: string
  callNow: string
  sendEmail: string
  passionQuality: string
  passionQualityDesc: string
  reliability: string
  reliabilityDesc: string
  individualApproach: string
  individualApproachDesc: string
  ownProduction: string
  ownProductionDesc: string
  founding: string
  foundingDesc: string
  firstProject: string
  firstProjectDesc: string
  expansion: string
  expansionDesc: string
  digitalization: string
  digitalizationDesc: string
  
  // Contact page
  contactUs: string
  contactHero: string
  contactHeroDesc: string
  quickContact: string
  contactDetails: string
  addresses: string
  workshopPetrich: string
  showroomBlagoevgrad: string
  seeOnMap: string
  workingHours: string
  visitUs: string
  whyChooseUs: string
  freeDeliveryDesc: string
  warranty2Years: string
  warranty2YearsDesc: string
  support24: string
  support24Desc: string
  findUs: string
  visitWorkshop: string
  needQuickAnswer: string
  callDirectly: string
  
  // Admin
  adminPanel: string
  products: string
  inquiries: string
  siteMetrics: string
  analytics: string
  signOut: string
  toWebsite: string
  productManagement: string
  addNewProduct: string
  name: string
  category: string
  price: string
  showPrice: string
  featured: string
  recommended: string
  actions: string
  edit: string
  delete: string
  inquiryManagement: string
  status: string
  date: string
  new: string
  inProgress: string
  completed: string
  generalInquiry: string
  siteStatistics: string
  totalVisitors: string
  uniqueVisitors: string
  pageViews: string
  bounceRate: string
  topPages: string
  mostVisited: string
  visits: string
  deviceBreakdown: string
  desktop: string
  mobile: string
  tablet: string
  conversionFunnel: string
  homepageVisits: string
  productsViewed: string
  inquiriesSent: string
  conversionRate: string
  refreshStats: string
  yearsExperience: string
  satisfiedClients: string
  handmadePercentage: string
  saveChanges: string
  
  // Common
  years: string
  loading: string
  pleaseWait: string
}

const translations: Record<Language, Translations> = {
  bg: {
    // Navigation
    home: 'Начало',
    products: 'Продукти',
    manufacturing: 'Производство',
    about: 'За нас',
    contact: 'Контакт',
    
    // Hero section
    heroTitle: 'Създаваме мебели\nс любов и майсторство',
    heroSubtitle: 'Всеки продукт е изработен ръчно в нашата работилница с внимание към всеки детайл',
    heroButton1: 'Разгледай продуктите',
    heroButton2: 'Нашето производство',
    
    // Categories
    categoriesTitle: 'Нашите категории',
    categoriesSubtitle: 'Открийте перфектните мебели за вашия дом от нашите специализирани колекции',
    divani: 'Дивани',
    spalni: 'Спални',
    stolove: 'Столове',
    masi: 'Маси',
    
    // Manufacturing
    manufacturingTitle: 'Ние сме производители',
    manufacturingSubtitle: 'За разлика от други, ние не внасяме или препродаваме мебели. Всеки продукт е създаден в нашата работилница с любов и внимание към детайлите.',
    manufacturingWorkshopTitle: 'Нашата работилница',
    manufacturingWorkshopText: 'В сърцето на нашето производство се намира модерна работилница, оборудвана с най-новите технологии и водена от опитни майстори с десетилетия опит.',
    manufacturingFeature1: 'Ръчна изработка на всеки продукт',
    manufacturingFeature2: 'Използване на премиум материали',
    manufacturingFeature3: 'Индивидуален подход към всеки клиент',
    manufacturingFeature4: 'Гаранция за качество и дълготрайност',
    manufacturingStat1: '15+',
    manufacturingStat1Text: 'години опит в производството',
    manufacturingStat2: '500+',
    manufacturingStat2Text: 'доволни клиенти',
    manufacturingStat3: '100%',
    manufacturingStat3Text: 'ръчна изработка',
    
    // Products
    productsTitle: 'Нашите продукти',
    productsSubtitle: 'Разгледайте нашите колекции, създадени с внимание към всеки детайл',
    viewAll: 'Виж всички',
    new: 'Ново',
    details: 'Детайли',
    inquiry: 'Запитване',
    onRequest: 'По запитване',
    dimensions: 'Размери',
    
    // About
    aboutTitle: 'Нашата история',
    aboutText1: 'Започнахме като малка семейна работилница с мечтата да създаваме мебели, които не само са красиви, но и издържливи. Днес, след 15 години упорита работа, сме горди, че можем да предложим на нашите клиенти продукти от най-високо качество.',
    aboutText2: 'Всеки продукт носи частичка от нашата страст към майсторството и стремежа ни към съвършенство. Ние не просто правим мебели - ние създаваме произведения на изкуството за вашия дом.',
    satisfiedClients: 'Доволни клиенти',
    yearsExperience: 'Години опит',
    
    // Contact
    contactTitle: 'Свържете се с нас',
    contactSubtitle: 'Готови сме да отговорим на всички ваши въпроси и да ви помогнем с избора на перфектните мебели',
    contactInfo: 'Информация за контакт',
    phone: 'Телефон',
    email: 'Email',
    address: 'Адрес',
    sendInquiry: 'Изпратете запитване',
    yourName: 'Вашето име',
    yourEmail: 'Вашият email',
    yourPhone: 'Вашият телефон',
    yourMessage: 'Вашето съобщение',
    sendButton: 'Изпрати запитване',
    
    // Footer
    footerDescription: 'Производители на висококачествени луксозни мебели за вашия дом. Всеки продукт е създаден с любов и внимание към детайлите.',
    navigation: 'Навигация',
    contacts: 'Контакт',
    newsletter: 'Бюлетин',
    newsletterPlaceholder: 'Вашият имейл',
    allRightsReserved: 'Всички права запазени.',
    
    // Product detail
    specifications: 'Спецификации',
    quality: 'Качество',
    premium: 'Премиум',
    warranty: 'Гаранция',
    delivery: 'Доставка',
    free: 'Безплатна',
    description: 'Описание',
    features: 'Предимства',
    feature1: 'Ръчна изработка от опитни майстори',
    feature2: 'Използване на премиум материали',
    feature3: 'Модерен и елегантен дизайн',
    feature4: 'Дълготрайност и качество',
    feature5: 'Индивидуален подход към всеки клиент',
    addToCart: 'Добави в количка',
    callUs: 'Обади се',
    topProduct: 'Топ продукт',
    advantages: 'Предимства',
    handcrafted: 'Ръчна изработка',
    premiumMaterials: 'Премиум материали',
    uniqueDesign: 'Уникален дизайн',
    qualityGuarantee: 'Гаранция качество',
    currency: '',
    handcraftedDesc: 'Всеки продукт е изработен ръчно от опитни майстори',
    premiumMaterialsDesc: 'Използваме само най-качествените материали',
    uniqueDesignDesc: 'Модерен и елегантен дизайн за всеки дом',
    qualityGuaranteeDesc: 'Гаранция на всички продукти',
    breadcrumbHome: 'Начало',
    breadcrumbProducts: 'Продукти',
    productNotFound: 'Продуктът не е намерен',
    productNotFoundDesc: 'Продуктът, който търсите, не съществува или е премахнат.',
    backToProducts: 'Към продуктите',
    years2: '',
    freeDelivery: 'Безплатна доставка',
    topProduct: 'Топ продукт',
    advantages: 'Предимства',
    handcrafted: 'Ръчна изработка',
    premiumMaterials: 'Премиум материали',
    uniqueDesign: 'Уникален дизайн',
    qualityGuarantee: 'Гаранция качество',
    currency: '',
    
    // Products page
    searchPlaceholder: 'Търсене по име на продукт...',
    allCategories: 'Всички категории',
    allPrices: 'Всички цени',
    withPrice: 'С показана цена',
    showingProducts: 'Показване на',
    uniqueProducts: 'уникални продукта',
    premiumQuality: 'Премиум качество',
    handmade: 'Ръчна изработка',
    modernDesign: 'Модерен дизайн',
    clearFilters: 'Изчисти',
    noProductsFound: 'Няма намерени продукти',
    tryDifferentFilters: 'Опитайте с различни филтри',
    sortBy: 'Сортирай по',
    newest: 'Най-нови',
    oldest: 'Най-стари',
    priceHigh: 'Цена: висока към ниска',
    priceLow: 'Цена: ниска към висока',
    
    // Contact form
    inquirySuccess: 'Благодарим за запитването! Ще се свържем с Вас скоро.',
    inquiryError: 'Възникна грешка при изпращането. Моля опитайте отново.',
    productInquiry: 'Запитване за продукт',
    
    // About page
    ourStory: 'Нашата история',
    ourMission: 'Нашата мисия',
    ourValues: 'Нашите ценности',
    ourJourney: 'Нашият път',
    keyMoments: 'Ключовите моменти в развитието на нашата компания',
    ourWorkshop: 'Нашата работилница',
    workshopGallery: 'Поглед зад кулисите на нашето производство',
    behindScenes: 'Зад кулисите',
    readyToCreate: 'Готови сте да създадем нещо невероятно заедно?',
    contactToday: 'Свържете се с нас днес и нека превърнем вашата визия в реалност',
    transformVision: 'Превърнете визията в реалност',
    callNow: 'Обадете се сега',
    sendEmail: 'Изпратете имейл',
    passionQuality: 'Страст към качеството',
    passionQualityDesc: 'Всеки продукт е създаден с любов и внимание към най-малките детайли.',
    reliability: 'Надеждност',
    reliabilityDesc: 'Използваме само най-качествените материали за дълготрайност.',
    individualApproach: 'Индивидуален подход',
    individualApproachDesc: 'Всеки клиент получава персонализирано решение за своя дом.',
    ownProduction: 'Собствено производство',
    ownProductionDesc: 'Контролираме всеки етап от производството в нашата работилница.',
    founding: 'Основаване',
    foundingDesc: 'Започнахме като малка семейна работилница с мечтата да създаваме уникални мебели',
    firstProject: 'Първи голям проект',
    firstProjectDesc: 'Обзавеждане на луксозен хотел в София - нашият пробив в индустрията',
    expansion: 'Разширяване',
    expansionDesc: 'Отворихме нова работилница и шоурум в Благоевград за по-добро обслужване',
    digitalization: 'Дигитализация',
    digitalizationDesc: 'Стартирахме онлайн платформата за по-лесен достъп до нашите продукти',
    
    // Contact page
    contactUs: 'Свържете се с нас',
    contactHero: 'Свържете се с нас',
    contactHeroDesc: 'Готови сме да отговорим на всички ваши въпроси и да ви помогнем с избора на перфектните мебели',
    quickContact: 'Бърз контакт',
    contactDetails: 'Детайли за контакт',
    addresses: 'Адреси',
    workshopPetrich: 'Цех Петрич',
    showroomBlagoevgrad: 'Шоурум Благоевград',
    seeOnMap: 'Вижте на картата',
    workingHours: 'Работно време',
    visitUs: 'Посетете ни в удобно за вас време',
    whyChooseUs: 'Защо да изберете нас?',
    freeDeliveryDesc: 'В радиус от 50км от Петрич и Благоевград',
    warranty2Years: 'Гаранция',
    warranty2YearsDesc: 'На всички наши продукти',
    support24: '24/7 Поддръжка',
    support24Desc: 'Винаги сме на разположение за въпроси',
    findUs: 'Намерете ни',
    visitWorkshop: 'Посетете нашия цех или шоурум',
    needQuickAnswer: 'Нуждаете се от бърз отговор?',
    callDirectly: 'Обадете се директно или ни изпратете имейл за незабавна консултация',
    
    // Admin
    adminPanel: 'Админ панел',
    products: 'Продукти',
    inquiries: 'Запитвания',
    siteMetrics: 'Метрики на сайта',
    analytics: 'Статистики',
    signOut: 'Изход',
    toWebsite: 'Към сайта',
    productManagement: 'Управление на продукти',
    addNewProduct: 'Добави нов продукт',
    name: 'Име',
    category: 'Категория',
    price: 'Цена',
    showPrice: 'Покажи цена',
    featured: 'Препоръчан',
    recommended: 'Препоръчан',
    actions: 'Действия',
    edit: 'Редактирай',
    delete: 'Изтрий',
    inquiryManagement: 'Управление на запитвания',
    status: 'Статус',
    date: 'Дата',
    new: 'Ново',
    inProgress: 'В процес',
    completed: 'Завършено',
    generalInquiry: 'Общо запитване',
    siteStatistics: 'Статистики на сайта',
    totalVisitors: 'Общо посетители',
    uniqueVisitors: 'Уникални посетители',
    pageViews: 'Прегледи на страници',
    bounceRate: 'Bounce Rate',
    topPages: 'Най-посещавани страници',
    mostVisited: 'Най-посещавани',
    visits: 'Посещения',
    deviceBreakdown: 'Разпределение по устройства',
    desktop: 'Desktop',
    mobile: 'Mobile',
    tablet: 'Tablet',
    conversionFunnel: 'Conversion Funnel',
    homepageVisits: 'Посещения на началната страница',
    productsViewed: 'Прегледани продукти',
    inquiriesSent: 'Изпратени запитвания',
    conversionRate: 'Conversion Rate',
    refreshStats: 'Обнови статистиките',
    yearsExperience: 'Години опит',
    satisfiedClients: 'Доволни клиенти',
    handmadePercentage: 'Процент ръчна изработка',
    saveChanges: 'Запази промените',
    
    // Common
    years: 'години',
    loading: 'Зареждане...',
    pleaseWait: 'Моля изчакайте'
  },
  
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    manufacturing: 'Manufacturing',
    about: 'About',
    contact: 'Contact',
    
    // Hero section
    heroTitle: 'We create furniture\nwith love and craftsmanship',
    heroSubtitle: 'Every product is handcrafted in our workshop with attention to every detail',
    heroButton1: 'View Products',
    heroButton2: 'Our Manufacturing',
    
    // Categories
    categoriesTitle: 'Our Categories',
    categoriesSubtitle: 'Discover the perfect furniture for your home from our specialized collections',
    divani: 'Sofas',
    spalni: 'Bedrooms',
    stolove: 'Chairs',
    masi: 'Tables',
    
    // Manufacturing
    manufacturingTitle: 'We are manufacturers',
    manufacturingSubtitle: 'Unlike others, we don\'t import or resell furniture. Every product is created in our workshop with love and attention to detail.',
    manufacturingWorkshopTitle: 'Our Workshop',
    manufacturingWorkshopText: 'At the heart of our production is a modern workshop, equipped with the latest technologies and led by experienced craftsmen with decades of experience.',
    manufacturingFeature1: 'Handcrafted every product',
    manufacturingFeature2: 'Using premium materials',
    manufacturingFeature3: 'Individual approach to every client',
    manufacturingFeature4: 'Quality and durability guarantee',
    manufacturingStat1: '9+',
    manufacturingStat1Text: 'years of manufacturing experience',
    manufacturingStat2: '3534+',
    manufacturingStat2Text: 'satisfied customers',
    manufacturingStat3: '100%',
    manufacturingStat3Text: 'handcrafted',
    
    // Products
    productsTitle: 'Our Products',
    productsSubtitle: 'Explore our collections, created with attention to every detail',
    viewAll: 'View All',
    new: 'New',
    details: 'Details',
    inquiry: 'Inquiry',
    onRequest: 'On Request',
    dimensions: 'Dimensions',
    
    // About
    aboutTitle: 'Our Story',
    aboutText1: 'We started as a small family workshop with the dream of creating furniture that is not only beautiful but also durable. Today, after 15 years of hard work, we are proud to offer our customers the highest quality products.',
    aboutText2: 'Every product carries a piece of our passion for craftsmanship and our pursuit of perfection. We don\'t just make furniture - we create works of art for your home.',
    satisfiedClients: 'Satisfied Clients',
    yearsExperience: 'Years Experience',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are ready to answer all your questions and help you choose the perfect furniture',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    sendInquiry: 'Send Inquiry',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourPhone: 'Your Phone',
    yourMessage: 'Your Message',
    sendButton: 'Send Inquiry',
    
    // Footer
    footerDescription: 'Manufacturers of high-quality luxury furniture for your home. Every product is created with love and attention to detail.',
    navigation: 'Navigation',
    contacts: 'Contact',
    newsletter: 'Newsletter',
    newsletterPlaceholder: 'Your email',
    allRightsReserved: 'All rights reserved.',
    
    // Product detail
    specifications: 'Specifications',
    quality: 'Quality',
    premium: 'Premium',
    warranty: 'Warranty',
    delivery: 'Delivery',
    free: 'Free',
    description: 'Description',
    features: 'Features',
    feature1: 'Handcrafted by experienced craftsmen',
    feature2: 'Using premium materials',
    feature3: 'Modern and elegant design',
    feature4: 'Durability and quality',
    feature5: 'Individual approach to every client',
    addToCart: 'Add to Cart',
    callUs: 'Call Us',
    topProduct: 'Top Product',
    advantages: 'Advantages',
    handcrafted: 'Handcrafted',
    premiumMaterials: 'Premium Materials',
    uniqueDesign: 'Unique Design',
    qualityGuarantee: 'Quality Guarantee',
    currency: 'BGN',
    handcraftedDesc: 'Every product is handcrafted by experienced craftsmen',
    premiumMaterialsDesc: 'We use only the highest quality materials',
    uniqueDesignDesc: 'Modern and elegant design for every home',
    qualityGuaranteeDesc: '2 years warranty on all products',
    breadcrumbHome: 'Home',
    breadcrumbProducts: 'Products',
    productNotFound: 'Product not found',
    productNotFoundDesc: 'The product you are looking for does not exist or has been removed.',
    backToProducts: 'Back to Products',
    years2: '2 years',
    freeDelivery: 'Free Delivery',
    topProduct: 'Top Product',
    advantages: 'Advantages',
    handcrafted: 'Handcrafted',
    premiumMaterials: 'Premium Materials',
    uniqueDesign: 'Unique Design',
    qualityGuarantee: 'Quality Guarantee',
    currency: 'BGN',
    
    // Products page
    searchPlaceholder: 'Search by product name...',
    allCategories: 'All Categories',
    allPrices: 'All Prices',
    withPrice: 'With Price',
    showingProducts: 'Showing',
    uniqueProducts: 'unique products',
    premiumQuality: 'Premium Quality',
    handmade: 'Handmade',
    modernDesign: 'Modern Design',
    clearFilters: 'Clear',
    noProductsFound: 'No products found',
    tryDifferentFilters: 'Try different filters',
    sortBy: 'Sort by',
    newest: 'Newest',
    oldest: 'Oldest',
    priceHigh: 'Price: High to Low',
    priceLow: 'Price: Low to High',
    
    // Contact form
    inquirySuccess: 'Thank you for your inquiry! We will contact you soon.',
    inquiryError: 'An error occurred while sending. Please try again.',
    productInquiry: 'Product Inquiry',
    
    // About page
    ourStory: 'Our Story',
    ourMission: 'Our Mission',
    ourValues: 'Our Values',
    ourJourney: 'Our Journey',
    keyMoments: 'Key moments in the development of our company',
    ourWorkshop: 'Our Workshop',
    workshopGallery: 'Behind the scenes of our production',
    behindScenes: 'Behind the Scenes',
    readyToCreate: 'Ready to create something amazing together?',
    contactToday: 'Contact us today and let us turn your vision into reality',
    transformVision: 'Transform your vision into reality',
    callNow: 'Call Now',
    sendEmail: 'Send Email',
    passionQuality: 'Passion for Quality',
    passionQualityDesc: 'Every product is created with love and attention to the smallest details.',
    reliability: 'Reliability',
    reliabilityDesc: 'We use only the highest quality materials for durability.',
    individualApproach: 'Individual Approach',
    individualApproachDesc: 'Every client receives a personalized solution for their home.',
    ownProduction: 'Own Production',
    ownProductionDesc: 'We control every stage of production in our workshop.',
    founding: 'Founding',
    foundingDesc: 'We started as a small family workshop with the dream of creating unique furniture',
    firstProject: 'First Major Project',
    firstProjectDesc: 'Furnishing a luxury hotel in Sofia - our breakthrough in the industry',
    expansion: 'Expansion',
    expansionDesc: 'We opened a new workshop and showroom in Blagoevgrad for better service',
    digitalization: 'Digitalization',
    digitalizationDesc: 'We launched an online platform for easier access to our products',
    
    // Contact page
    contactUs: 'Contact Us',
    contactHero: 'Contact Us',
    contactHeroDesc: 'We are ready to answer all your questions and help you choose the perfect furniture',
    quickContact: 'Quick Contact',
    contactDetails: 'Contact Details',
    addresses: 'Addresses',
    workshopPetrich: 'Workshop Petrich',
    showroomBlagoevgrad: 'Showroom Blagoevgrad',
    seeOnMap: 'See on Map',
    workingHours: 'Working Hours',
    visitUs: 'Visit us at your convenience',
    whyChooseUs: 'Why Choose Us?',
    freeDeliveryDesc: 'Within 50km radius from Petrich and Blagoevgrad',
    warranty2Years: '2 Years Warranty',
    warranty2YearsDesc: 'On all our products',
    support24: '24/7 Support',
    support24Desc: 'We are always available for questions',
    findUs: 'Find Us',
    visitWorkshop: 'Visit our workshop or showroom',
    needQuickAnswer: 'Need a quick answer?',
    callDirectly: 'Call directly or send us an email for immediate consultation',
    
    // Admin
    adminPanel: 'Admin Panel',
    products: 'Products',
    inquiries: 'Inquiries',
    siteMetrics: 'Site Metrics',
    analytics: 'Analytics',
    signOut: 'Sign Out',
    toWebsite: 'To Website',
    productManagement: 'Product Management',
    addNewProduct: 'Add New Product',
    name: 'Name',
    category: 'Category',
    price: 'Price',
    showPrice: 'Show Price',
    featured: 'Featured',
    recommended: 'Recommended',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    inquiryManagement: 'Inquiry Management',
    status: 'Status',
    date: 'Date',
    new: 'New',
    inProgress: 'In Progress',
    completed: 'Completed',
    generalInquiry: 'General Inquiry',
    siteStatistics: 'Site Statistics',
    totalVisitors: 'Total Visitors',
    uniqueVisitors: 'Unique Visitors',
    pageViews: 'Page Views',
    bounceRate: 'Bounce Rate',
    topPages: 'Top Pages',
    mostVisited: 'Most Visited',
    visits: 'Visits',
    deviceBreakdown: 'Device Breakdown',
    desktop: 'Desktop',
    mobile: 'Mobile',
    tablet: 'Tablet',
    conversionFunnel: 'Conversion Funnel',
    homepageVisits: 'Homepage Visits',
    productsViewed: 'Products Viewed',
    inquiriesSent: 'Inquiries Sent',
    conversionRate: 'Conversion Rate',
    refreshStats: 'Refresh Statistics',
    yearsExperience: 'Years Experience',
    satisfiedClients: 'Satisfied Clients',
    handmadePercentage: 'Handmade Percentage',
    saveChanges: 'Save Changes',
    
    // Common
    years: 'years',
    loading: 'Loading...',
    pleaseWait: 'Please wait'
  },
  
  el: {
    // Navigation
    home: 'Αρχική',
    products: 'Προϊόντα',
    manufacturing: 'Παραγωγή',
    about: 'Σχετικά',
    contact: 'Επικοινωνία',
    
    // Hero section
    heroTitle: 'Δημιουργούμε έπιπλα\nμε αγάπη και τεχνογνωσία',
    heroSubtitle: 'Κάθε προϊόν είναι χειροποίητο στο εργαστήριό μας με προσοχή σε κάθε λεπτομέρεια',
    heroButton1: 'Δείτε Προϊόντα',
    heroButton2: 'Η Παραγωγή μας',
    
    // Categories
    categoriesTitle: 'Οι Κατηγορίες μας',
    categoriesSubtitle: 'Ανακαλύψτε τα τέλεια έπιπλα για το σπίτι σας από τις εξειδικευμένες συλλογές μας',
    divani: 'Καναπέδες',
    spalni: 'Υπνοδωμάτια',
    stolove: 'Καρέκλες',
    masi: 'Τραπέζια',
    
    // Manufacturing
    manufacturingTitle: 'Είμαστε κατασκευαστές',
    manufacturingSubtitle: 'Σε αντίθεση με άλλους, δεν εισάγουμε ή μεταπωλούμε έπιπλα. Κάθε προϊόν δημιουργείται στο εργαστήριό μας με αγάπη και προσοχή στις λεπτομέρειες.',
    manufacturingWorkshopTitle: 'Το Εργαστήριό μας',
    manufacturingWorkshopText: 'Στην καρδιά της παραγωγής μας βρίσκεται ένα σύγχρονο εργαστήριο, εξοπλισμένο με τις πιο σύγχρονες τεχνολογίες και διευθυνόμενο από έμπειρους τεχνίτες με δεκαετίες εμπειρίας.',
    manufacturingFeature1: 'Χειροποίητη κατασκευή κάθε προϊόντος',
    manufacturingFeature2: 'Χρήση premium υλικών',
    manufacturingFeature3: 'Ατομική προσέγγιση σε κάθε πελάτη',
    manufacturingFeature4: 'Εγγύηση ποιότητας και αντοχής',
    manufacturingStat1: '15+',
    manufacturingStat1Text: 'χρόνια εμπειρίας στην παραγωγή',
    manufacturingStat2: '500+',
    manufacturingStat2Text: 'ικανοποιημένοι πελάτες',
    manufacturingStat3: '100%',
    manufacturingStat3Text: 'χειροποίητα',
    
    // Products
    productsTitle: 'Τα Προϊόντα μας',
    productsSubtitle: 'Εξερευνήστε τις συλλογές μας, δημιουργημένες με προσοχή σε κάθε λεπτομέρεια',
    viewAll: 'Δείτε Όλα',
    new: 'Νέο',
    details: 'Λεπτομέρειες',
    inquiry: 'Ερώτηση',
    onRequest: 'Κατόπιν Αιτήματος',
    dimensions: 'Διαστάσεις',
    
    // About
    aboutTitle: 'Η Ιστορία μας',
    aboutText1: 'Ξεκινήσαμε ως ένα μικρό οικογενειακό εργαστήριο με το όνειρο να δημιουργούμε έπιπλα που δεν είναι μόνο όμορφα αλλά και ανθεκτικά. Σήμερα, μετά από 15 χρόνια σκληρής δουλειάς, είμαστε περήφανοι που μπορούμε να προσφέρουμε στους πελάτες μας προϊόντα υψηλότερης ποιότητας.',
    aboutText2: 'Κάθε προϊόν φέρει ένα κομμάτι από το πάθος μας για την τεχνοτροπία και την επιδίωξή μας για τελειότητα. Δεν φτιάχνουμε απλώς έπιπλα - δημιουργούμε έργα τέχνης για το σπίτι σας.',
    satisfiedClients: 'Ικανοποιημένοι Πελάτες',
    yearsExperience: 'Χρόνια Εμπειρίας',
    
    // Contact
    contactTitle: 'Επικοινωνήστε μαζί μας',
    contactSubtitle: 'Είμαστε έτοιμοι να απαντήσουμε σε όλες τις ερωτήσεις σας και να σας βοηθήσουμε να επιλέξετε τα τέλεια έπιπλα',
    contactInfo: 'Στοιχεία Επικοινωνίας',
    phone: 'Τηλέφωνο',
    email: 'Email',
    address: 'Διεύθυνση',
    sendInquiry: 'Στείλτε Ερώτηση',
    yourName: 'Το Όνομά σας',
    yourEmail: 'Το Email σας',
    yourPhone: 'Το Τηλέφωνό σας',
    yourMessage: 'Το Μήνυμά σας',
    sendButton: 'Στείλτε Ερώτηση',
    
    // Footer
    footerDescription: 'Κατασκευαστές υψηλής ποιότητας πολυτελών επίπλων για το σπίτι σας. Κάθε προϊόν δημιουργείται με αγάπη και προσοχή στις λεπτομέρειες.',
    navigation: 'Πλοήγηση',
    contacts: 'Επικοινωνία',
    newsletter: 'Ενημερωτικό Δελτίο',
    newsletterPlaceholder: 'Το email σας',
    allRightsReserved: 'Όλα τα δικαιώματα διατηρούνται.',
    
    // Product detail
    specifications: 'Προδιαγραφές',
    quality: 'Ποιότητα',
    premium: 'Premium',
    warranty: 'Εγγύηση',
    delivery: 'Παράδοση',
    free: 'Δωρεάν',
    description: 'Περιγραφή',
    features: 'Χαρακτηριστικά',
    feature1: 'Χειροποίητο από έμπειρους τεχνίτες',
    feature2: 'Χρήση premium υλικών',
    feature3: 'Μοντέρνος και κομψός σχεδιασμός',
    feature4: 'Αντοχή και ποιότητα',
    feature5: 'Ατομική προσέγγιση σε κάθε πελάτη',
    addToCart: 'Προσθήκη στο Καλάθι',
    callUs: 'Καλέστε μας',
    topProduct: 'Κορυφαίο Προϊόν',
    advantages: 'Πλεονεκτήματα',
    handcrafted: 'Χειροποίητο',
    premiumMaterials: 'Premium Υλικά',
    uniqueDesign: 'Μοναδικός Σχεδιασμός',
    qualityGuarantee: 'Εγγύηση Ποιότητας',
    currency: 'λεβ.',
    handcraftedDesc: 'Κάθε προϊόν είναι χειροποίητο από έμπειρους τεχνίτες',
    premiumMaterialsDesc: 'Χρησιμοποιούμε μόνο τα καλύτερα υλικά',
    uniqueDesignDesc: 'Μοντέρνος και κομψός σχεδιασμός για κάθε σπίτι',
    qualityGuaranteeDesc: '2 χρόνια εγγύηση σε όλα τα προϊόντα',
    breadcrumbHome: 'Αρχική',
    breadcrumbProducts: 'Προϊόντα',
    productNotFound: 'Το προϊόν δεν βρέθηκε',
    productNotFoundDesc: 'Το προϊόν που αναζητάτε δεν υπάρχει ή έχει αφαιρεθεί.',
    backToProducts: 'Πίσω στα Προϊόντα',
    years2: '2 χρόνια',
    freeDelivery: 'Δωρεάν Παράδοση',
    topProduct: 'Κορυφαίο Προϊόν',
    advantages: 'Πλεονεκτήματα',
    handcrafted: 'Χειροποίητο',
    premiumMaterials: 'Premium Υλικά',
    uniqueDesign: 'Μοναδικός Σχεδιασμός',
    qualityGuarantee: 'Εγγύηση Ποιότητας',
    currency: 'λεβ.',
    
    // Products page
    searchPlaceholder: 'Αναζήτηση με όνομα προϊόντος...',
    allCategories: 'Όλες οι Κατηγορίες',
    allPrices: 'Όλες οι Τιμές',
    withPrice: 'Με Τιμή',
    showingProducts: 'Εμφάνιση',
    uniqueProducts: 'μοναδικών προϊόντων',
    premiumQuality: 'Premium Ποιότητα',
    handmade: 'Χειροποίητο',
    modernDesign: 'Μοντέρνος Σχεδιασμός',
    clearFilters: 'Καθαρισμός',
    noProductsFound: 'Δεν βρέθηκαν προϊόντα',
    tryDifferentFilters: 'Δοκιμάστε διαφορετικά φίλτρα',
    sortBy: 'Ταξινόμηση κατά',
    newest: 'Νεότερα',
    oldest: 'Παλαιότερα',
    priceHigh: 'Τιμή: Υψηλή προς Χαμηλή',
    priceLow: 'Τιμή: Χαμηλή προς Υψηλή',
    
    // Contact form
    inquirySuccess: 'Ευχαριστούμε για την ερώτησή σας! Θα επικοινωνήσουμε μαζί σας σύντομα.',
    inquiryError: 'Παρουσιάστηκε σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά.',
    productInquiry: 'Ερώτηση Προϊόντος',
    
    // About page
    ourStory: 'Η Ιστορία μας',
    ourMission: 'Η Αποστολή μας',
    ourValues: 'Οι Αξίες μας',
    ourJourney: 'Το Ταξίδι μας',
    keyMoments: 'Βασικές στιγμές στην ανάπτυξη της εταιρείας μας',
    ourWorkshop: 'Το Εργαστήριό μας',
    workshopGallery: 'Πίσω από τις κουλίσες της παραγωγής μας',
    behindScenes: 'Πίσω από τις Κουλίσες',
    readyToCreate: 'Έτοιμοι να δημιουργήσουμε κάτι απίστευτο μαζί;',
    contactToday: 'Επικοινωνήστε μαζί μας σήμερα και ας μετατρέψουμε το όραμά σας σε πραγματικότητα',
    transformVision: 'Μετατρέψτε το όραμά σας σε πραγματικότητα',
    callNow: 'Καλέστε Τώρα',
    sendEmail: 'Στείλτε Email',
    passionQuality: 'Πάθος για την Ποιότητα',
    passionQualityDesc: 'Κάθε προϊόν δημιουργείται με αγάπη και προσοχή στις μικρότερες λεπτομέρειες.',
    reliability: 'Αξιοπιστία',
    reliabilityDesc: 'Χρησιμοποιούμε μόνο τα καλύτερα υλικά για αντοχή.',
    individualApproach: 'Ατομική Προσέγγιση',
    individualApproachDesc: 'Κάθε πελάτης λαμβάνει εξατομικευμένη λύση για το σπίτι του.',
    ownProduction: 'Δική μας Παραγωγή',
    ownProductionDesc: 'Ελέγχουμε κάθε στάδιο της παραγωγής στο εργαστήριό μας.',
    founding: 'Ίδρυση',
    foundingDesc: 'Ξεκινήσαμε ως ένα μικρό οικογενειακό εργαστήριο με το όνειρο να δημιουργούμε μοναδικά έπιπλα',
    firstProject: 'Πρώτο Μεγάλο Έργο',
    firstProjectDesc: 'Επίπλωση πολυτελούς ξενοδοχείου στη Σόφια - η επιτυχία μας στη βιομηχανία',
    expansion: 'Επέκταση',
    expansionDesc: 'Ανοίξαμε νέο εργαστήριο και showroom στο Μπλαγκόεβγκραντ για καλύτερη εξυπηρέτηση',
    digitalization: 'Ψηφιοποίηση',
    digitalizationDesc: 'Ξεκινήσαμε την online πλατφόρμα για ευκολότερη πρόσβαση στα προϊόντα μας',
    
    // Contact page
    contactUs: 'Επικοινωνήστε μαζί μας',
    contactHero: 'Επικοινωνήστε μαζί μας',
    contactHeroDesc: 'Είμαστε έτοιμοι να απαντήσουμε σε όλες τις ερωτήσεις σας και να σας βοηθήσουμε να επιλέξετε τα τέλεια έπιπλα',
    quickContact: 'Γρήγορη Επικοινωνία',
    contactDetails: 'Στοιχεία Επικοινωνίας',
    addresses: 'Διευθύνσεις',
    workshopPetrich: 'Εργαστήριο Πέτριτς',
    showroomBlagoevgrad: 'Showroom Μπλαγκόεβγκραντ',
    seeOnMap: 'Δείτε στον Χάρτη',
    workingHours: 'Ώρες Λειτουργίας',
    visitUs: 'Επισκεφθείτε μας όποτε σας βολεύει',
    whyChooseUs: 'Γιατί να μας Επιλέξετε;',
    freeDeliveryDesc: 'Σε ακτίνα 50χλμ από Πέτριτς και Μπλαγκόεβγκραντ',
    warranty2Years: 'Εγγύηση 2 Χρόνων',
    warranty2YearsDesc: 'Σε όλα τα προϊόντα μας',
    support24: 'Υποστήριξη 24/7',
    support24Desc: 'Είμαστε πάντα διαθέσιμοι για ερωτήσεις',
    findUs: 'Βρείτε μας',
    visitWorkshop: 'Επισκεφθείτε το εργαστήριό μας ή το showroom',
    needQuickAnswer: 'Χρειάζεστε γρήγορη απάντηση;',
    callDirectly: 'Καλέστε απευθείας ή στείλτε μας email για άμεση συμβουλή',
    
    // Admin
    adminPanel: 'Πίνακας Διαχείρισης',
    products: 'Προϊόντα',
    inquiries: 'Ερωτήσεις',
    siteMetrics: 'Μετρήσεις Ιστότοπου',
    analytics: 'Αναλυτικά',
    signOut: 'Αποσύνδεση',
    toWebsite: 'Στον Ιστότοπο',
    productManagement: 'Διαχείριση Προϊόντων',
    addNewProduct: 'Προσθήκη Νέου Προϊόντος',
    name: 'Όνομα',
    category: 'Κατηγορία',
    price: 'Τιμή',
    showPrice: 'Εμφάνιση Τιμής',
    featured: 'Προτεινόμενο',
    recommended: 'Προτεινόμενο',
    actions: 'Ενέργειες',
    edit: 'Επεξεργασία',
    delete: 'Διαγραφή',
    inquiryManagement: 'Διαχείριση Ερωτήσεων',
    status: 'Κατάσταση',
    date: 'Ημερομηνία',
    new: 'Νέο',
    inProgress: 'Σε Εξέλιξη',
    completed: 'Ολοκληρωμένο',
    generalInquiry: 'Γενική Ερώτηση',
    siteStatistics: 'Στατιστικά Ιστότοπου',
    totalVisitors: 'Συνολικοί Επισκέπτες',
    uniqueVisitors: 'Μοναδικοί Επισκέπτες',
    pageViews: 'Προβολές Σελίδων',
    bounceRate: 'Ποσοστό Εγκατάλειψης',
    topPages: 'Κορυφαίες Σελίδες',
    mostVisited: 'Περισσότερο Επισκέψιμες',
    visits: 'Επισκέψεις',
    deviceBreakdown: 'Κατανομή Συσκευών',
    desktop: 'Υπολογιστής',
    mobile: 'Κινητό',
    tablet: 'Tablet',
    conversionFunnel: 'Χοάνη Μετατροπής',
    homepageVisits: 'Επισκέψεις Αρχικής',
    productsViewed: 'Προβολές Προϊόντων',
    inquiriesSent: 'Ερωτήσεις που Στάλθηκαν',
    conversionRate: 'Ποσοστό Μετατροπής',
    refreshStats: 'Ανανέωση Στατιστικών',
    yearsExperience: 'Χρόνια Εμπειρίας',
    satisfiedClients: 'Ικανοποιημένοι Πελάτες',
    handmadePercentage: 'Ποσοστό Χειροποίητων',
    saveChanges: 'Αποθήκευση Αλλαγών',
    
    // Common
    years: 'χρόνια',
    loading: 'Φόρτωση...',
    pleaseWait: 'Παρακαλώ περιμένετε'
  }
}

let currentLanguage: Language = 'bg'

export const getCurrentLanguage = (): Language => currentLanguage

export const setLanguage = (lang: Language): void => {
  currentLanguage = lang
  localStorage.setItem('language', lang)
  // Trigger storage event for other components to listen
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'language',
    newValue: lang,
    oldValue: getCurrentLanguage()
  }))
}

export const getTranslation = (key: keyof Translations): string => {
  return translations[currentLanguage][key] || translations.bg[key]
}

export const t = getTranslation

// Get translated product field with fallback
export const getTranslatedProductField = (
  product: Product, 
  field: 'name' | 'description' | 'dimensions'
): string => {
  const currentLang = getCurrentLanguage()
  
  // Try to get translation for current language
  if (product.translations && product.translations[currentLang]) {
    const translation = product.translations[currentLang][field]
    if (translation && translation.trim() !== '') {
      return translation
    }
  }
  
  // Fallback to Bulgarian translation
  if (product.translations && product.translations.bg) {
    const bgTranslation = product.translations.bg[field]
    if (bgTranslation && bgTranslation.trim() !== '') {
      return bgTranslation
    }
  }
  
  // Final fallback to original field value
  const originalValue = product[field]
  return originalValue || ''
}

// Hook for dynamic translation loading
export const useProductTranslation = () => {
  const currentLang = getCurrentLanguage()
  
  return {
    currentLanguage: currentLang,
    needsTranslation: (product: Product) => {
      if (currentLang === 'bg') return false
      
      const translation = product.translations?.[currentLang]
      return !translation?.name || (!translation?.description && product.description) || (!translation?.dimensions && product.dimensions)
    }
  }
}

// Initialize language from localStorage
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('language') as Language
  if (savedLang && ['bg', 'en', 'el'].includes(savedLang)) {
    currentLanguage = savedLang
  }
}

export { translations }