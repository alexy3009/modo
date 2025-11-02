// Analytics and tracking system with Supabase integration
import { cookieManager } from './cookies'

export interface PageView {
  id?: string
  url: string
  title: string
  referrer: string
  user_agent: string
  device_type: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  screen_resolution: string
  timestamp: string
  session_id: string
}

export interface UserInteraction {
  id?: string
  session_id: string
  event_type: 'click' | 'scroll' | 'hover' | 'form_submit' | 'page_exit'
  element_type?: string
  element_text?: string
  element_id?: string
  element_class?: string
  page_url: string
  x_coordinate?: number
  y_coordinate?: number
  scroll_depth?: number
  timestamp: string
}

export interface UserSession {
  id: string
  user_id: string
  start_time: string
  end_time?: string
  duration?: number
  page_views_count: number
  interactions_count: number
  bounce_rate: boolean
  conversion: boolean
  device_type: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  screen_resolution: string
}

export interface AnalyticsData {
  total_visitors: number
  unique_visitors: number
  page_views: number
  bounce_rate: number
  avg_session_duration: number
  top_pages: Array<{ url: string; views: number; title: string }>
  top_referrers: Array<{ referrer: string; visits: number }>
  device_breakdown: {
    desktop: number
    mobile: number
    tablet: number
  }
  browser_breakdown: Record<string, number>
  country_breakdown: Record<string, number>
  hourly_traffic: Array<{ hour: number; visits: number }>
  daily_traffic: Array<{ date: string; visits: number }>
  popular_interactions: Array<{ element: string; clicks: number }>
  conversion_funnel: {
    homepage_visits: number
    products_viewed: number
    inquiries_sent: number
    conversion_rate: number
  }
}

class AnalyticsService {
  private sessionId: string
  private userId: string
  private startTime: number
  private currentSession: UserSession | null = null
  private isAdminPanel: boolean = false
  private pageViewsCount: number = 0
  private interactionsCount: number = 0

  constructor() {
    this.sessionId = this.generateSessionId()
    this.userId = this.getOrCreateUserId()
    this.startTime = Date.now()
    this.isAdminPanel = this.checkIfAdminPanel()
    
    // Don't track admin panel
    if (this.isAdminPanel) {
      return
    }
    
    this.initializeSession()
    this.setupEventListeners()
  }

  private checkIfAdminPanel(): boolean {
    return window.location.pathname === '/_tijassd!@' || 
           window.location.pathname.includes('admin') ||
           document.title.includes('Admin') ||
           window.location.hostname === 'localhost'
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getOrCreateUserId(): string {
    // Try to get existing user_id from cookie
    let userId = cookieManager.getCookie('analytics_user_id')
    
    if (!userId) {
      // Generate new UUID for user
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Store in cookie for 2 years
      cookieManager.setCookie({
        name: 'analytics_user_id',
        value: userId,
        expires: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), // 2 years
        secure: window.location.protocol === 'https:',
        sameSite: 'lax'
      })
    }
    
    return userId
  }

  private async initializeSession() {
    const deviceInfo = this.getDeviceInfo()
    this.currentSession = {
      id: this.sessionId,
      user_id: this.userId,
      start_time: new Date().toISOString(),
      page_views_count: 0,
      interactions_count: 0,
      bounce_rate: true,
      conversion: false,
      device_type: deviceInfo.type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      screen_resolution: deviceInfo.screen_resolution
    }

    // TODO: Implement session tracking with PHP backend if needed
    console.log('Session initialized:', this.currentSession)
  }

  private getDeviceInfo() {
    const ua = navigator.userAgent
    const screen = window.screen
    
    let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop'
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      deviceType = /iPad/.test(ua) ? 'tablet' : 'mobile'
    }

    let browser = 'Unknown'
    if (ua.includes('Chrome')) browser = 'Chrome'
    else if (ua.includes('Firefox')) browser = 'Firefox'
    else if (ua.includes('Safari')) browser = 'Safari'
    else if (ua.includes('Edge')) browser = 'Edge'

    let os = 'Unknown'
    if (ua.includes('Windows')) os = 'Windows'
    else if (ua.includes('Mac')) os = 'macOS'
    else if (ua.includes('Linux')) os = 'Linux'
    else if (ua.includes('Android')) os = 'Android'
    else if (ua.includes('iOS')) os = 'iOS'

    return {
      type: deviceType,
      browser,
      os,
      screen_resolution: `${screen.width}x${screen.height}`
    }
  }

  private setupEventListeners() {
    // Don't track admin panel
    if (this.isAdminPanel) {
      return
    }

    // Track clicks
    document.addEventListener('click', (e) => {
      this.trackInteraction('click', e.target as HTMLElement, e.clientX, e.clientY)
    })

    // Track scroll depth
    let maxScrollDepth = 0
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        this.trackInteraction('scroll', null, undefined, undefined, scrollDepth)
      }
    })

    // Track page exit
    window.addEventListener('beforeunload', () => {
      this.trackInteraction('page_exit')
      this.endSession()
    })

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.endSession()
      } else {
        this.resumeSession()
      }
    })
  }

  async trackPageView(url: string, title: string) {
    // Don't track admin panel
    if (this.isAdminPanel || url.includes('_tijassd!@') || title.includes('Admin')) {
      return
    }

    const pageView: PageView = {
      url,
      title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      device_type: this.currentSession?.device_type || 'desktop',
      browser: this.currentSession?.browser || 'Unknown',
      os: this.currentSession?.os || 'Unknown',
      screen_resolution: this.currentSession?.screen_resolution || '',
      timestamp: new Date().toISOString(),
      session_id: this.sessionId
    }

    // TODO: Implement page view tracking with PHP backend if needed
    console.log('Page view tracked:', pageView)

    // Update session
    this.pageViewsCount++
    if (this.currentSession) {
      this.currentSession.page_views_count = this.pageViewsCount
      if (this.pageViewsCount > 1) {
        this.currentSession.bounce_rate = false
      }
      await this.updateSession()
    }
  }

  private async trackInteraction(
    eventType: UserInteraction['event_type'],
    element?: HTMLElement | null,
    x?: number,
    y?: number,
    scrollDepth?: number
  ) {
    // Don't track admin panel
    if (this.isAdminPanel || window.location.pathname.includes('_tijassd!@') || window.location.hostname === 'localhost') {
      return
    }

    const interaction: UserInteraction = {
      session_id: this.sessionId,
      event_type: eventType,
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    }

    if (element) {
      interaction.element_type = element.tagName.toLowerCase()
      interaction.element_text = element.textContent?.slice(0, 100) || ''
      interaction.element_id = element.id || undefined
      interaction.element_class = element.className || undefined
    }

    if (x !== undefined && y !== undefined) {
      interaction.x_coordinate = x
      interaction.y_coordinate = y
    }

    if (scrollDepth !== undefined) {
      interaction.scroll_depth = scrollDepth
    }

    // TODO: Implement interaction tracking with PHP backend if needed
    console.log('Interaction tracked:', interaction)

    // Update session
    this.interactionsCount++
    if (this.currentSession) {
      this.currentSession.interactions_count = this.interactionsCount
      await this.updateSession()
    }
  }

  async trackConversion() {
    // Don't track admin panel
    if (this.isAdminPanel) {
      return
    }

    if (this.currentSession) {
      this.currentSession.conversion = true
      await this.updateSession()
    }
  }

  private async endSession() {
    if (this.currentSession && !this.currentSession.end_time) {
      this.currentSession.end_time = new Date().toISOString()
      this.currentSession.duration = Date.now() - this.startTime
      await this.updateSession()
    }
  }

  private async resumeSession() {
    // Create new session if needed
    if (!this.currentSession || this.currentSession.end_time) {
      this.sessionId = this.generateSessionId()
      this.startTime = Date.now()
      this.pageViewsCount = 0
      this.interactionsCount = 0
      await this.initializeSession()
    }
  }

  private async updateSession() {
    // TODO: Implement session update with PHP backend if needed
    console.log('Session updated:', this.currentSession)
  }

  // Static method to generate analytics report from Supabase data
  static async generateAnalyticsReport(): Promise<AnalyticsData> {
    // TODO: Implement analytics report with PHP backend
    return {
      total_visitors: 150,
      unique_visitors: 120,
      page_views: 450,
      bounce_rate: 35.5,
      avg_session_duration: 3.2,
      top_pages: [
        { url: '/', views: 120, title: 'Начало' },
        { url: '/products', views: 85, title: 'Продукти' },
        { url: '/about', views: 45, title: 'За нас' }
      ],
      top_referrers: [
        { referrer: 'Direct', visits: 80 },
        { referrer: 'google.com', visits: 45 },
        { referrer: 'facebook.com', visits: 25 }
      ],
      device_breakdown: { desktop: 180, mobile: 220, tablet: 50 },
      browser_breakdown: { Chrome: 250, Firefox: 120, Safari: 80 },
      country_breakdown: { Bulgaria: 350, Germany: 70, UK: 30 },
      hourly_traffic: Array.from({ length: 24 }, (_, hour) => ({ 
        hour, 
        visits: Math.floor(Math.random() * 20) + 5 
      })),
      daily_traffic: Array.from({ length: 7 }, (_, i) => {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        return { 
          date: date.toISOString().split('T')[0], 
          visits: Math.floor(Math.random() * 50) + 20 
        }
      }).reverse(),
      popular_interactions: [
        { element: 'Запитване за продукт', clicks: 45 },
        { element: 'Контакти', clicks: 32 },
        { element: 'Продукти', clicks: 28 }
      ],
      conversion_funnel: {
        homepage_visits: 120,
        products_viewed: 85,
        inquiries_sent: 12,
        conversion_rate: 10.0
      }
    }
  }
}

// Initialize analytics
export const analytics = new AnalyticsService()

// Export for use in components
export { AnalyticsService }