// API client for PHP MySQL backend
  
  // Динамично определяне на API URL според текущия домейн
  const getCurrentDomain = (): string => {
    if (typeof window === 'undefined') return 'https://modo-mebel.com'
    
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    // За localhost използваме bfoam.bg
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'https://modo-mebel.com'
    }
    
    // За production домейните използваме текущия
    return `${protocol}//${hostname}`
  }
  
  const API_BASE_URL = `${getCurrentDomain()}/api`
  
  // Types (moved from supabase.ts)
  export interface Product {
    id: string
    name: string
    category: 'divani' | 'spalni' | 'stolove' | 'masi'
    description: string | null
    price: string
    show_price: boolean
    dimensions: string | null
    image_urls: string[] | null
    translations?: Record<string, {
      name?: string;
      description?: string;
      dimensions?: string;
    }>
    featured: boolean
    created_at: string
    updated_at: string
  }
  
  export interface ContactInquiry {
    id: string
    name: string
    email: string
    phone: string | null
    message: string
    product_id: string | null
    status: 'new' | 'in_progress' | 'completed'
    created_at: string
    products?: {
      name: string;
    };
  }
  
  export interface SiteMetrics {
    id: string
    years_experience: number
    satisfied_clients: number
    handmade_percentage: number
    updated_at: string
  }
  
  // Helper function for API calls
  async function apiCall(endpoint: string, options: RequestInit = {}): Promise<any> {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const url = `${API_BASE_URL}/${cleanEndpoint}`
    
    const defaultOptions: RequestInit = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }
  
    console.log('Making API call to:', url)
  
    try {
      const response = await fetch(url, defaultOptions)
      
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const responseText = await response.text()
        console.log('Error response text:', responseText)
        
        // Try to parse as JSON, fallback to text
        let errorData
        try {
          errorData = JSON.parse(responseText)
        } catch {
          errorData = { error: responseText || 'Unknown error' }
        }
        
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }
      
      const responseText = await response.text()
      console.log('Success response text:', responseText)
      
      // Try to parse as JSON
      try {
        return JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError)
        throw new Error('Invalid JSON response from server')
      }
    } catch (error) {
      console.error(`API call failed: ${endpoint}`, error)
      
      // Use mock data only for network errors or CORS issues
      if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('CORS'))) {
        console.warn('Network error, falling back to mock data')
        return getMockData(endpoint)
      }
      
      throw error
    }
  }
  
  // Mock данни за WebContainer среда
  function getMockData(endpoint: string): any {
    if (endpoint.includes('/products.php')) {
      // Check if it's a single product request
      const productIdMatch = endpoint.match(/\/products\.php\/([^?]+)/)
      if (productIdMatch) {
        const productId = productIdMatch[1]
        console.log('Mock: Looking for product with ID:', productId)
        const mockProducts = [
          {
            id: 'cac89c942434e99e941c62cae9744d92',
            name: 'Модерен диван',
            category: 'divani',
            description: 'Удобен и стилен диван за всекидневна',
            price: 'По запитване',
            show_price: false,
            image_urls: [
              'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
              'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            featured: true,
            dimensions: '200x90x80 см',
            translations: {
              bg: { name: 'Модерен диван', description: 'Удобен и стилен диван за всекидневна', dimensions: '200x90x80 см' },
              en: { name: 'Modern Sofa', description: 'Comfortable and stylish sofa for living room', dimensions: '200x90x80 cm' },
              el: { name: 'Μοντέρνος Καναπές', description: 'Άνετος και κομψός καναπές για σαλόνι', dimensions: '200x90x80 εκ' }
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'b8f3d4e5a6c7b8d9e0f1a2b3c4d5e6f7',
            name: 'Елегантна спалня',
            category: 'spalni',
            description: 'Комплект спалня с гардероб',
            price: 'По запитване',
            show_price: false,
            image_urls: [
              'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
              'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            featured: true,
            dimensions: '160x200 см',
            translations: {
              bg: { name: 'Елегантна спалня', description: 'Комплект спалня с гардероб', dimensions: '160x200 см' },
              en: { name: 'Elegant Bedroom', description: 'Bedroom set with wardrobe', dimensions: '160x200 cm' },
              el: { name: 'Κομψό Υπνοδωμάτιο', description: 'Σετ υπνοδωματίου με ντουλάπα', dimensions: '160x200 εκ' }
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'f9e8d7c6b5a4938271605948372615a8',
            name: 'Трапезна маса',
            category: 'masi',
            description: 'Масивна дървена маса',
            price: 'По запитване',
            show_price: false,
            image_urls: [
              'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
              'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            featured: false,
            dimensions: '180x90x75 см',
            translations: {
              bg: { name: 'Трапезна маса', description: 'Масивна дървена маса', dimensions: '180x90x75 см' },
              en: { name: 'Dining Table', description: 'Solid wood table', dimensions: '180x90x75 cm' },
              el: { name: 'Τραπέζι Φαγητού', description: 'Μασίφ ξύλινο τραπέζι', dimensions: '180x90x75 εκ' }
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        
        const product = mockProducts.find(p => p.id === productId)
        console.log('Mock: Found product:', product)
        if (!product) {
          console.error('Mock: Product not found with ID:', productId)
          throw new Error(`Product not found: ${productId}`)
        }
        return product
      }
      
      // Return all products
      return [
        {
          id: 'cac89c942434e99e941c62cae9744d92',
          name: 'Модерен диван',
          category: 'divani',
          description: 'Удобен и стилен диван за всекидневна',
          price: 'По запитване',
          show_price: false,
          image_urls: [
            'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: true,
          dimensions: '200x90x80 см',
          translations: {
            bg: { name: 'Модерен диван', description: 'Удобен и стилен диван за всекидневна', dimensions: '200x90x80 см' },
            en: { name: 'Modern Sofa', description: 'Comfortable and stylish sofa for living room', dimensions: '200x90x80 cm' },
            el: { name: 'Μοντέρνος Καναπές', description: 'Άνετος και κομψός καναπές για σαλόνι', dimensions: '200x90x80 εκ' }
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'b8f3d4e5a6c7b8d9e0f1a2b3c4d5e6f7',
          name: 'Елегантна спалня',
          category: 'spalni',
          description: 'Комплект спалня с гардероб',
          price: 'По запитване',
          show_price: false,
          image_urls: [
            'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: true,
          dimensions: '160x200 см',
          translations: {
            bg: { name: 'Елегантна спалня', description: 'Комплект спалня с гардероб', dimensions: '160x200 см' },
            en: { name: 'Elegant Bedroom', description: 'Bedroom set with wardrobe', dimensions: '160x200 cm' },
            el: { name: 'Κομψό Υπνοδωμάτιο', description: 'Σετ υπνοδωματίου με ντουλάπα', dimensions: '160x200 εκ' }
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'f9e8d7c6b5a4938271605948372615a8',
          name: 'Трапезна маса',
          category: 'masi',
          description: 'Масивна дървена маса',
          price: 'По запитване',
          show_price: false,
          image_urls: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: false,
          dimensions: '180x90x75 см',
          translations: {
            bg: { name: 'Трапезна маса', description: 'Масивна дървена маса', dimensions: '180x90x75 см' },
            en: { name: 'Dining Table', description: 'Solid wood table', dimensions: '180x90x75 cm' },
            el: { name: 'Τραπέζι Φαγητού', description: 'Μασίφ ξύλινο τραπέζι', dimensions: '180x90x75 εκ' }
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }
    
    if (endpoint.includes('/site-metrics.php')) {
      return {
        years_experience: 15,
        satisfied_clients: 500,
        handmade_percentage: 100
      };
    }
    
    if (endpoint.includes('/auth.php/user')) {
      return null; // Не е логнат
    }
    
    if (endpoint.includes('/contact.php')) {
      return { success: true, message: 'Запитването е изпратено успешно!' };
    }
    
    return {};
  }
  
  // Products API
  export const getProducts = async (category?: string): Promise<Product[]> => {
    const params = category && category !== 'all' ? `?category=${category}` : ''
    return await apiCall(`products.php${params}`)
  }
  
  export const getProductById = async (id: string): Promise<Product | null> => {
    try {
      console.log('API: Fetching product with ID:', id)
      const product = await apiCall(`products.php/${id}`)
      console.log('API: Received product data:', product)
      return product
    } catch (error) {
      console.error('API: Error fetching product by ID:', id, error)
      // Ако има грешка, опитай се да заредиш от mock данните
      console.warn('Falling back to mock data for product:', id)
      return getMockData(`products.php/${id}`)
    }
  }
  
  export const getFeaturedProducts = async (): Promise<Product[]> => {
    const products = await getProducts()
    return products.filter(p => p.featured)
  }
  
  export const createProduct = async (
    product: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Product> => {
    return await apiCall('products.php', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }
  
  export const updateProduct = async (
    id: string,
    updates: Partial<Product>
  ): Promise<Product> => {
    return await apiCall(`products.php/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }
  
  export const deleteProduct = async (id: string): Promise<boolean> => {
    await apiCall(`products.php/${id}`, {
      method: 'DELETE',
    })
    return true
  }
  
  // Contact Inquiries API
  export const createContactInquiry = async (
    inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>
  ): Promise<ContactInquiry> => {
    return await apiCall('contact.php', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    })
  }
  
  export const getContactInquiries = async (): Promise<ContactInquiry[]> => {
    return await apiCall('contact.php')
  }
  
  export const updateInquiryStatus = async (
    id: string,
    status: ContactInquiry['status']
  ): Promise<ContactInquiry> => {
    return await apiCall(`contact.php/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }
  
  export const deleteContactInquiry = async (id: string): Promise<boolean> => {
    await apiCall(`contact.php/${id}`, {
      method: 'DELETE',
    })
    return true
  }
  
  // Site Metrics API
  export const getSiteMetrics = async (): Promise<SiteMetrics> => {
    return await apiCall('site-metrics.php')
  }
  
  export const updateSiteMetrics = async (
    updates: Partial<Omit<SiteMetrics, 'id' | 'updated_at'>>
  ): Promise<SiteMetrics> => {
    return await apiCall('site-metrics.php', {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }
  
  // File Upload API
  export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
  
    const uploadUrl = `${getCurrentDomain()}/api/upload.php`
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }))
      throw new Error(errorData.error || 'Upload failed')
    }
  
    const data = await response.json()
    return data.path // Return the path to store in database
  }
  
  // Image URL helpers
  export const getPublicImageUrl = (path?: string | null): string => {
    if (!path) return ''
    if (/^https?:\/\//i.test(path)) return path // Already full URL
    
    // Използваме текущия домейн за снимки
    const baseUrl = getCurrentDomain()
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${cleanPath}`
  }
  
  export const getProductImageUrls = (product: Product): string[] => {
    const urls: string[] = []
    
    if (!product) {
      console.error('getProductImageUrls: Product is undefined or null')
      return urls
    }
    
    console.log('Processing product images for product:', product.id, product.name, 'image_urls:', product.image_urls)
    
    if (product.image_urls && Array.isArray(product.image_urls)) {
      for (const url of product.image_urls) {
        if (url && typeof url === 'string' && url.trim() !== '') {
          console.log('Processing image URL:', url)
          if (/^https?:\/\//i.test(url)) {
            console.log('Using full URL as-is:', url)
            urls.push(url)
          } else {
            const fullUrl = getPublicImageUrl(url)
            console.log('Constructed URL from relative path:', url, '->', fullUrl)
            urls.push(fullUrl)
          }
        }
      }
    } else {
      console.error('Product has no image_urls or image_urls is not an array. Product:', product.id, 'image_urls:', product.image_urls)
    }
    
    console.log('Final image URLs for product', product.id, ':', urls)
    
    return urls
  }
  
  export const getProductCoverImage = (product: Product): string => {
    const urls = getProductImageUrls(product)
    return urls.length > 0 ? urls[0] : ''
  }
  
  // Authentication API
  export const signIn = async (email: string, password: string) => {
    try {
      const data = await apiCall('auth.php/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: (error as Error).message } }
    }
  }
  
  export const signOut = async () => {
    try {
      await apiCall('auth.php/signout', {
        method: 'POST',
      })
      return { error: null }
    } catch (error) {
      return { error: { message: (error as Error).message } }
    }
  }
  
  export const getCurrentUser = async () => {
    try {
      const data = await apiCall('auth.php/user')
      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: { message: (error as Error).message } }
    }
  }
  
  // Translation API (simplified - you can extend this)
  export const callTranslationApi = async (
    lang: 'en' | 'el' | 'bg',
    fields: { name?: string | null; description?: string | null; dimensions?: string | null }
  ): Promise<{ name?: string; description?: string; dimensions?: string }> => {
    // For now, return mock translations
    // You can implement a real translation service later
    const mockTranslations: Record<string, any> = {
      en: { suffix: ' (EN)' },
      el: { suffix: ' (EL)' },
      bg: { suffix: '' }
    }
    
    const result: any = {}
    const suffix = mockTranslations[lang]?.suffix || ''
    
    if (fields.name) result.name = fields.name + suffix
    if (fields.description) result.description = fields.description + suffix
    if (fields.dimensions) result.dimensions = fields.dimensions + suffix
    
    return result
  }