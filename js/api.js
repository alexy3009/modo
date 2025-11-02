const getCurrentDomain = () => {
  if (typeof window === 'undefined') return 'https://modo-mebel.com';
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return 'https://modo-mebel.com';
  return `${protocol}//${hostname}`;
};

const API_BASE_URL = `${getCurrentDomain()}/api`;

const apiCall = async (endpoint, options = {}) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/${cleanEndpoint}`;
  
  const defaultOptions = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('API call failed:', endpoint, error);
    return getMockData(endpoint);
  }
};

const getMockData = (endpoint) => {
  if (endpoint.includes('/products.php')) {
    return [
      { id: '1', name: 'Модерен диван', category: 'divani', description: 'Удобен диван', price: 'По запитване', show_price: false, image_urls: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'], featured: true, dimensions: '200x90x80 см', translations: { bg: { name: 'Модерен диван' }, en: { name: 'Modern Sofa' }, el: { name: 'Μοντέρνος Καναπές' } } },
      { id: '2', name: 'Елегантна спалня', category: 'spalni', description: 'Комплект спалня', price: 'По запитване', show_price: false, image_urls: ['https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800'], featured: true, dimensions: '160x200 см', translations: { bg: { name: 'Елегантна спалня' }, en: { name: 'Elegant Bedroom' }, el: { name: 'Κομψό Υπνοδωμάτιο' } } },
      { id: '3', name: 'Трапезна маса', category: 'masi', description: 'Масивна дървена маса', price: 'По запитване', show_price: false, image_urls: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'], featured: false, dimensions: '180x90x75 см', translations: { bg: { name: 'Трапезна маса' }, en: { name: 'Dining Table' }, el: { name: 'Τραπέζι Φαγητού' } } }
    ];
  }
  if (endpoint.includes('/site-metrics.php')) {
    return { years_experience: 15, satisfied_clients: 500, handmade_percentage: 100 };
  }
  if (endpoint.includes('/contact.php')) {
    return { success: true, message: 'Запитването е изпратено успешно!' };
  }
  return {};
};

const API = {
  getProducts: async (category) => {
    const params = category && category !== 'all' ? `?category=${category}` : '';
    return await apiCall(`products.php${params}`);
  },
  
  getProductById: async (id) => {
    try {
      return await apiCall(`products.php/${id}`);
    } catch (error) {
      return null;
    }
  },
  
  getFeaturedProducts: async () => {
    const products = await API.getProducts();
    return products.filter(p => p.featured);
  },
  
  getSiteMetrics: async () => await apiCall('site-metrics.php'),
  
  createContactInquiry: async (inquiry) => {
    return await apiCall('contact.php', {
      method: 'POST',
      body: JSON.stringify(inquiry)
    });
  },
  
  getPublicImageUrl: (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const baseUrl = getCurrentDomain();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  },
  
  getProductImageUrls: (product) => {
    if (!product || !product.image_urls) return [];
    return product.image_urls.map(url => {
      if (/^https?:\/\//i.test(url)) return url;
      return API.getPublicImageUrl(url);
    });
  },
  
  getProductCoverImage: (product) => {
    const urls = API.getProductImageUrls(product);
    return urls.length > 0 ? urls[0] : '';
  }
};
