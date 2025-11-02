import { Product, ContactInquiry, dbConfig } from '../types/database';

// Mock database functions since we can't connect to MySQL directly in this environment
// In production, these would be replaced with actual MySQL queries

export class DatabaseService {
  private static instance: DatabaseService;
  private mockProducts: Product[] = [
    {
      id: 1,
      name: "Луксозен диван Milano",
      category: "divani",
      description: "Елегантен диван с висококачествена тапицерия и комфортни седалки.",
      price: "По запитване",
      image_url: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
      featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: "Ъглов диван Comfort Plus",
      category: "corner-sofas",
      description: "Просторен ъглов диван, идеален за големи семейства.",
      price: "По запитване",
      image_url: "https://images.pexels.com/photos/586999/pexels-photo-586999.jpeg",
      featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: "Дизайнерски стол Aurora",
      category: "stolove",
      description: "Модерен стол с ергономичен дизайн и премиум материали.",
      price: "По запитване",
      image_url: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg",
      featured: false,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: "Спален комплект Royal",
      category: "spalni",
      description: "Луксозен спален комплект с тапицирана табла и нощни шкафчета.",
      price: "По запитване",
      image_url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      featured: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: "Холна маса Crystal",
      category: "masi",
      description: "Елегантна холна маса със стъклен плот и дървена основа.",
      price: "По запитване",
      image_url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
      featured: false,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  private mockInquiries: ContactInquiry[] = [];

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    // In production: SELECT * FROM products ORDER BY created_at DESC
    return this.mockProducts;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    // In production: SELECT * FROM products WHERE category = ? ORDER BY created_at DESC
    return this.mockProducts.filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    // In production: SELECT * FROM products WHERE featured = true ORDER BY created_at DESC
    return this.mockProducts.filter(product => product.featured);
  }

  async getProductById(id: number): Promise<Product | null> {
    // In production: SELECT * FROM products WHERE id = ?
    return this.mockProducts.find(product => product.id === id) || null;
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    // In production: INSERT INTO products (name, category, description, price, image_url, featured) VALUES (?, ?, ?, ?, ?, ?)
    const newProduct: Product = {
      ...productData,
      id: Math.max(...this.mockProducts.map(p => p.id)) + 1,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.mockProducts.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    // In production: UPDATE products SET ... WHERE id = ?
    const index = this.mockProducts.findIndex(product => product.id === id);
    if (index === -1) return null;
    
    this.mockProducts[index] = {
      ...this.mockProducts[index],
      ...productData,
      updated_at: new Date()
    };
    return this.mockProducts[index];
  }

  async deleteProduct(id: number): Promise<boolean> {
    // In production: DELETE FROM products WHERE id = ?
    const index = this.mockProducts.findIndex(product => product.id === id);
    if (index === -1) return false;
    
    this.mockProducts.splice(index, 1);
    return true;
  }

  // Contact inquiry methods
  async createContactInquiry(inquiryData: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>): Promise<ContactInquiry> {
    // In production: INSERT INTO contact_inquiries (name, email, phone, message, product_id) VALUES (?, ?, ?, ?, ?)
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: this.mockInquiries.length + 1,
      status: 'new',
      created_at: new Date()
    };
    this.mockInquiries.push(newInquiry);
    return newInquiry;
  }

  async getAllInquiries(): Promise<ContactInquiry[]> {
    // In production: SELECT * FROM contact_inquiries ORDER BY created_at DESC
    return this.mockInquiries;
  }

  async updateInquiryStatus(id: number, status: ContactInquiry['status']): Promise<ContactInquiry | null> {
    // In production: UPDATE contact_inquiries SET status = ? WHERE id = ?
    const inquiry = this.mockInquiries.find(inq => inq.id === id);
    if (!inquiry) return null;
    
    inquiry.status = status;
    return inquiry;
  }

  // Connection test method
  async testConnection(): Promise<boolean> {
    try {
      // In production, this would test the actual MySQL connection
      console.log('Testing database connection...');
      console.log('Database config:', {
        host: dbConfig.host,
        database: dbConfig.database,
        username: dbConfig.username,
        // Don't log password for security
      });
      
      // Simulate connection test
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();

// Production PHP API endpoints that would be needed:
/*
API Endpoints needed for production:

1. GET /api/products
   - Returns all products
   
2. GET /api/products?category={category}
   - Returns products by category
   
3. GET /api/products/{id}
   - Returns specific product
   
4. POST /api/contact
   - Creates new contact inquiry
   
5. GET /api/admin/products (admin only)
   - Returns all products for admin
   
6. POST /api/admin/products (admin only)
   - Creates new product
   
7. PUT /api/admin/products/{id} (admin only)
   - Updates product
   
8. DELETE /api/admin/products/{id} (admin only)
   - Deletes product
   
9. GET /api/admin/inquiries (admin only)
   - Returns all contact inquiries
   
10. PUT /api/admin/inquiries/{id} (admin only)
    - Updates inquiry status

Example PHP implementation for /api/products:

<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = '79.98.104.12';
$dbname = 'bfoambg_admin';
$username = 'bfoambg_alex';
$password = 'k3]A3,Ty^W{#2R2?';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    
    if ($category && $category !== 'all') {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
    }
    
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
*/