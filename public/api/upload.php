<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    if (!isset($_FILES['file'])) {
        sendError('No file uploaded', 400);
    }
    
    $file = $_FILES['file'];
    
    // Validate file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        sendError('File upload error: ' . $file['error'], 400);
    }
    
    // Check file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedTypes)) {
        sendError('Invalid file type. Only images are allowed.', 400);
    }
    
    // Check file size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        sendError('File too large. Maximum size is 5MB.', 400);
    }
    
    // Create upload directory if it doesn't exist
    $uploadDir = __DIR__ . '/../uploads/products/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . time() . '.' . $extension;
    $filepath = $uploadDir . $filename;
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        sendError('Failed to save file', 500);
    }
    
    // Return the relative path that will be stored in database
    $relativePath = 'uploads/products/' . $filename;
    
    sendResponse([
        'path' => $relativePath,
        'url' => '/uploads/products/' . $filename,
        'filename' => $filename
    ], 201);
    
} catch (Exception $e) {
    sendError('Server error: ' . $e->getMessage(), 500);
}
?>