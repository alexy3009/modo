# Бележки за интеграция с базата данни

## Настройки на MySQL връзката

Данните за връзка с вашата phpMyAdmin база данни:
- Host: 79.98.104.12
- Database: bfoambg_admin  
- Username: bfoambg_alex
- Password: k3]A3,Ty^W{#2R2?

## Стъпки за интеграция:

1. **Създайте таблиците в phpMyAdmin:**
   - Отворете phpMyAdmin на вашия hosting
   - Изберете базата данни `bfoambg_admin`
   - Изпълнете SQL заявките от файла `mysql-queries.sql`

2. **За production интеграция ще трябва:**
   - PHP backend скрипт за API endpoints
   - Свързване с MySQL чрез mysqli или PDO
   - REST API за CRUD операции с продукти
   - Форма за изпращане на запитвания към базата данни

3. **API endpoints които ще са необходими:**
   ```
   GET /api/products - всички продукти
   GET /api/products?category=divani - продукти по категория
   GET /api/products/{id} - конкретен продукт
   POST /api/contact - изпращане на запитване
   POST /api/admin/products - добавяне на нов продукт (admin)
   PUT /api/admin/products/{id} - редактиране на продукт (admin)
   DELETE /api/admin/products/{id} - изтриване на продукт (admin)
   ```

4. **За администрация:**
   - Админ панел за управление на продукти
   - Управление на запитвания от клиенти
   - Upload на изображения

## Примерен PHP код за API:

```php
<?php
// api/products.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = '79.98.104.12';
$dbname = 'bfoambg_admin';
$username = 'bfoambg_alex';
$password = 'k3]A3,Ty^W{#2R2?';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $category = isset($_GET['category']) ? $_GET['category'] : null;
        
        if ($category && $category !== 'all') {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC");
            $stmt->execute([$category]);
        } else {
            $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
        }
        
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
}
?>
```

## Забележка:
В тази среда не можем да се свържем директно с вашата MySQL база данни, затова използвам mock данни. За production ще трябва да създадете PHP backend на вашия hosting.