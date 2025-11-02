<?php
require_once 'config.php';

session_start();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

try {
    if (strpos($path, '/signin') !== false) {
        if ($method !== 'POST') {
            sendError('Method not allowed', 405);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        validateRequired($input, ['email', 'password']);
        
        // Simple hardcoded admin check (you can extend this with a users table)
        $adminEmail = 'admin@modomebel.com';
        $adminPassword = 'admin123'; // In production, use hashed passwords!
        
        if ($input['email'] === $adminEmail && $input['password'] === $adminPassword) {
            $_SESSION['user'] = [
                'id' => 'admin',
                'email' => $adminEmail,
                'role' => 'admin'
            ];
            
            sendResponse([
                'user' => $_SESSION['user'],
                'message' => 'Login successful'
            ]);
        } else {
            sendError('Invalid credentials', 401);
        }
        
    } elseif (strpos($path, '/user') !== false) {
        if ($method !== 'GET') {
            sendError('Method not allowed', 405);
        }
        
        if (isset($_SESSION['user'])) {
            sendResponse(['user' => $_SESSION['user']]);
        } else {
            sendResponse(['user' => null]);
        }
        
    } elseif (strpos($path, '/signout') !== false) {
        if ($method !== 'POST') {
            sendError('Method not allowed', 405);
        }
        
        session_destroy();
        sendResponse(['message' => 'Logout successful']);
        
    } else {
        sendError('Endpoint not found', 404);
    }
    
} catch (Exception $e) {
    sendError('Server error: ' . $e->getMessage(), 500);
}
?>