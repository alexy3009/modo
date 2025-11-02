<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Extract inquiry ID if present
$inquiryId = null;
if (count($pathParts) >= 3 && $pathParts[2] !== '') {
    $inquiryId = $pathParts[2];
}

try {
    switch ($method) {
        case 'GET':
            // Get all inquiries (admin only)
            $stmt = $pdo->query("
                SELECT ci.*, p.name as product_name 
                FROM contact_inquiries ci 
                LEFT JOIN products p ON ci.product_id = p.id 
                ORDER BY ci.created_at DESC
            ");
            $inquiries = $stmt->fetchAll();
            
            // Format the response to match expected structure
            foreach ($inquiries as &$inquiry) {
                if ($inquiry['product_name']) {
                    $inquiry['products'] = ['name' => $inquiry['product_name']];
                }
                unset($inquiry['product_name']);
            }
            
            sendResponse($inquiries);
            break;
            
        case 'POST':
            // Create new inquiry
            $input = json_decode(file_get_contents('php://input'), true);
            
            validateRequired($input, ['name', 'email', 'message']);
            
            $id = bin2hex(random_bytes(16));
            $now = date('Y-m-d H:i:s');
            
            $stmt = $pdo->prepare("
                INSERT INTO contact_inquiries (id, name, email, phone, message, product_id, status, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, 'new', ?)
            ");
            
            $stmt->execute([
                $id,
                $input['name'],
                $input['email'],
                $input['phone'] ?? null,
                $input['message'],
                $input['product_id'] ?? null,
                $now
            ]);
            
            // Return created inquiry
            $stmt = $pdo->prepare("SELECT * FROM contact_inquiries WHERE id = ?");
            $stmt->execute([$id]);
            $inquiry = $stmt->fetch();
            
            sendResponse($inquiry, 201);
            break;
            
        case 'PUT':
            // Update inquiry status
            if (!$inquiryId) {
                sendError('Inquiry ID is required', 400);
            }
            
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['status'])) {
                sendError('Status is required', 400);
            }
            
            $allowedStatuses = ['new', 'in_progress', 'completed'];
            if (!in_array($input['status'], $allowedStatuses)) {
                sendError('Invalid status', 400);
            }
            
            $stmt = $pdo->prepare("UPDATE contact_inquiries SET status = ? WHERE id = ?");
            $stmt->execute([$input['status'], $inquiryId]);
            
            if ($stmt->rowCount() === 0) {
                sendError('Inquiry not found', 404);
            }
            
            // Return updated inquiry
            $stmt = $pdo->prepare("SELECT * FROM contact_inquiries WHERE id = ?");
            $stmt->execute([$inquiryId]);
            $inquiry = $stmt->fetch();
            
            sendResponse($inquiry);
            break;
            
        case 'DELETE':
            // Delete inquiry
            if (!$inquiryId) {
                sendError('Inquiry ID is required', 400);
            }
            
            // Debug: Log the delete attempt
            error_log('Attempting to delete inquiry with ID: ' . $inquiryId);
            
            $stmt = $pdo->prepare("DELETE FROM contact_inquiries WHERE id = ?");
            $stmt->execute([$inquiryId]);
            
            $rowsAffected = $stmt->rowCount();
            error_log('Rows affected by delete: ' . $rowsAffected);
            
            if ($rowsAffected === 0) {
                error_log('No inquiry found with ID: ' . $inquiryId);
                sendError('Inquiry not found', 404);
            }
            
            error_log('Successfully deleted inquiry with ID: ' . $inquiryId);
            sendResponse(['message' => 'Inquiry deleted successfully']);
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
} catch (Exception $e) {
    sendError('Server error: ' . $e->getMessage(), 500);
}
?>