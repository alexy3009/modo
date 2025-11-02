/*
  # Create Products and Site Metrics Tables

  ## Overview
  This migration creates the core database structure for the MODO Mebel furniture website,
  including products catalog and site metrics.

  ## Tables Created

  ### 1. products
  Main product catalog table storing furniture items
  - `id` (text, primary key) - Unique product identifier (32-char hex)
  - `name` (text, required) - Product name
  - `category` (text, required) - Product category (divani, spalni, stolove, masi)
  - `description` (text, optional) - Product description
  - `price` (text, required) - Product price (stored as text for flexibility)
  - `show_price` (boolean, default false) - Whether to display price publicly
  - `dimensions` (text, optional) - Product dimensions
  - `image_urls` (jsonb, default []) - Array of product image URLs
  - `translations` (jsonb, default {}) - Multilingual content (bg, en, el)
  - `featured` (boolean, default false) - Featured product flag for homepage
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. site_metrics
  Site-wide statistics and metrics
  - `id` (text, primary key) - Metrics record identifier
  - `years_experience` (integer, default 15) - Years in business
  - `satisfied_clients` (integer, default 500) - Number of satisfied clients
  - `handmade_percentage` (integer, default 100) - Percentage of handmade products
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Row Level Security (RLS) enabled on both tables
  - Public read access (SELECT) for all users
  - Authenticated users can manage products (INSERT, UPDATE, DELETE)
  - Only authenticated users can update site metrics

  ## Indexes
  - Products indexed by category for fast filtering
  - Products indexed by featured status for homepage queries
  - Products indexed by created_at for chronological ordering

  ## Important Notes
  - All text fields use UTF-8 encoding for multilingual support (Bulgarian, English, Greek)
  - Image URLs stored as JSONB array for flexibility
  - Translations stored as JSONB object with language codes as keys
  - Price stored as text to handle "По запитване" (On Request) scenarios
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price text NOT NULL,
  show_price boolean DEFAULT false,
  dimensions text,
  image_urls jsonb DEFAULT '[]'::jsonb,
  translations jsonb DEFAULT '{}'::jsonb,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_metrics table
CREATE TABLE IF NOT EXISTS site_metrics (
  id text PRIMARY KEY,
  years_experience integer DEFAULT 15,
  satisfied_clients integer DEFAULT 500,
  handmade_percentage integer DEFAULT 100,
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_metrics ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Site metrics policies
CREATE POLICY "Anyone can view site metrics"
  ON site_metrics FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site metrics"
  ON site_metrics FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert site metrics"
  ON site_metrics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default site metrics
INSERT INTO site_metrics (id, years_experience, satisfied_clients, handmade_percentage, updated_at)
VALUES ('default', 15, 500, 100, now())
ON CONFLICT (id) DO NOTHING;