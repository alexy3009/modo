<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Extract product ID if present
$productId = null;
if (count($pathParts) >= 3 && $pathParts[2] !== '') {
    $productId = $pathParts[2];
}

try {
    switch ($method) {
        case 'GET':
            if ($productId) {
                // Get single product
                $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
                $stmt->execute([$productId]);
                $product = $stmt->fetch();
                
                if (!$product) {
                    sendError('Product not found', 404);
                }
                
                // Convert JSON fields
                if ($product['image_urls']) {
                    $product['image_urls'] = json_decode($product['image_urls'], true);
                }
                if ($product['translations']) {
                    $product['translations'] = json_decode($product['translations'], true);
                }
                
                // Convert featured to boolean for consistency
                $product['featured'] = (bool)$product['featured'];
                
                sendResponse($product);
            } else {
                // Get all products or by category
                $category = $_GET['category'] ?? null;
                
                if ($category && $category !== 'all') {
                    $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC");
                    $stmt->execute([$category]);
                } else {
                    $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
                }
                
                $products = $stmt->fetchAll();
                
                // Convert JSON fields for each product
                foreach ($products as &$product) {
                    if ($product['image_urls']) {
                        $product['image_urls'] = json_decode($product['image_urls'], true);
                    }
                    if ($product['translations']) {
                        $product['translations'] = json_decode($product['translations'], true);
                    }
                    
                    // Convert featured to boolean for consistency
                    $product['featured'] = (bool)$product['featured'];
                    $product['show_price'] = (bool)$product['show_price'];
                }
                
                sendResponse($products);
            }
            break;
            
        case 'POST':
            // Create new product
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Debug: Log the received input
            error_log('Creating product with input: ' . json_encode($input));
            error_log('Featured value received: ' . var_export($input['featured'] ?? 'NOT_SET', true));
            
            validateRequired($input, ['name', 'category', 'price']);
            
            $id = bin2hex(random_bytes(16));
            $now = date('Y-m-d H:i:s');
            
            // Ensure featured is properly handled as boolean
            $featured = isset($input['featured']) ? (bool)$input['featured'] : false;
            error_log('Featured value after processing: ' . var_export($featured, true));
            
            $stmt = $pdo->prepare("
                INSERT INTO products (id, name, category, description, price, show_price, dimensions, image_urls, translations, featured, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $id,
                $input['name'],
                $input['category'],
                $input['description'] ?? null,
                $input['price'],
                isset($input['show_price']) ? (bool)$input['show_price'] : false,
                $input['dimensions'] ?? null,
                json_encode($input['image_urls'] ?? []),
                json_encode($input['translations'] ?? []),
                $featured,
                $now,
                $now
            ]);
            
            // Return created product
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch();
            
            if ($product['image_urls']) {
                $product['image_urls'] = json_decode($product['image_urls'], true);
            }
            if ($product['translations']) {
                $product['translations'] = json_decode($product['translations'], true);
            }
            
            // Convert featured to boolean for consistency
            $product['featured'] = (bool)$product['featured'];
            $product['show_price'] = (bool)$product['show_price'];
            
            sendResponse($product, 201);
            break;
            
        case 'PUT':
            // Update product
            if (!$productId) {
                sendError('Product ID is required', 400);
            }
            
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Debug: Log the received input for update
            error_log('Updating product ' . $productId . ' with input: ' . json_encode($input));
            error_log('Featured value received for update: ' . var_export($input['featured'] ?? 'NOT_SET', true));
            
            $updateFields = [];
            $params = [];
            
            $allowedFields = ['name', 'category', 'description', 'price', 'show_price', 'dimensions', 'image_urls', 'translations', 'featured'];
            
            foreach ($allowedFields as $field) {
                if (isset($input[$field])) {
                    $updateFields[] = "$field = ?";
                    if ($field === 'image_urls' || $field === 'translations') {
                        $params[] = json_encode($input[$field]);
                    } else if ($field === 'featured' || $field === 'show_price') {
                        // Ensure boolean fields are properly handled
                        $boolValue = (bool)$input[$field];
                        $params[] = $boolValue;
                        error_log("Setting $field to: " . var_export($boolValue, true));
                    } else {
                        $params[] = $input[$field];
                    }
                }
            }
            
            if (empty($updateFields)) {
                sendError('No fields to update', 400);
            }
            
            $updateFields[] = "updated_at = ?";
            $params[] = date('Y-m-d H:i:s');
            $params[] = $productId;
            
            $sql = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            if ($stmt->rowCount() === 0) {
                sendError('Product not found or no changes made', 404);
            }
            
            // Return updated product
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$productId]);
            $product = $stmt->fetch();
            
            if ($product['image_urls']) {
                $product['image_urls'] = json_decode($product['image_urls'], true);
            }
            if ($product['translations']) {
                $product['translations'] = json_decode($product['translations'], true);
            }
            
            // Convert featured to boolean for consistency
            $product['featured'] = (bool)$product['featured'];
            $product['show_price'] = (bool)$product['show_price'];
            
            sendResponse($product);
            break;
            
        case 'DELETE':
            // Delete product
            if (!$productId) {
                sendError('Product ID is required', 400);
            }
            
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$productId]);
            
            if ($stmt->rowCount() === 0) {
                sendError('Product not found', 404);
            }
            
            sendResponse(['message' => 'Product deleted successfully']);
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
} catch (Exception $e) {
    sendError('Server error: ' . $e->getMessage(), 500);
}
?>