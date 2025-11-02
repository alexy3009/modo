// Database types for Supabase connection
import { Language } from '../lib/i18n'

export interface Product {
  id: string;
  name: string;
  category: 'divani' | 'spalni' | 'stolove' | 'masi';
  description: string | null;
  price: string;
  show_price: boolean;
  dimensions: string | null;
  image_urls: string[] | null;
  translations?: Record<Language, { 
    name?: string; 
    description?: string; 
    dimensions?: string; 
  }>;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  product_id?: string;
  created_at: string;
  status: 'new' | 'in_progress' | 'completed';
  products?: {
    name: string;
  };
}

export interface SiteMetrics {
  id: string;
  years_experience: number;
  satisfied_clients: number;
  handmade_percentage: number;
  updated_at: string;
}

// Database connection configuration (legacy - keeping for compatibility)
export interface DBConfig {
  host: string;
  database: string;
  username: string;
  password: string;
  port?: number;
}

export const dbConfig: DBConfig = {
  host: '79.98.104.12',
  database: 'bfoambg_admin',
  username: 'bfoambg_alex',
  password: 'k3]A3,Ty^W{#2R2?',
  port: 3306
};