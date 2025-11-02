<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // Get site metrics
            $stmt = $pdo->query("SELECT * FROM site_metrics ORDER BY updated_at DESC LIMIT 1");
            $metrics = $stmt->fetch();
            
            if (!$metrics) {
                // Return default metrics if none exist
                $metrics = [
                    'id' => 'default',
                    'years_experience' => 15,
                    'satisfied_clients' => 500,
                    'handmade_percentage' => 100,
                    'updated_at' => date('Y-m-d H:i:s')
                ];
            }
            
            sendResponse($metrics);
            break;
            
        case 'PUT':
            // Update site metrics
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Check if metrics exist
            $stmt = $pdo->query("SELECT id FROM site_metrics LIMIT 1");
            $existing = $stmt->fetch();
            
            $now = date('Y-m-d H:i:s');
            
            if ($existing) {
                // Update existing
                $updateFields = [];
                $params = [];
                
                $allowedFields = ['years_experience', 'satisfied_clients', 'handmade_percentage'];
                
                foreach ($allowedFields as $field) {
                    if (isset($input[$field])) {
                        $updateFields[] = "$field = ?";
                        $params[] = $input[$field];
                    }
                }
                
                if (!empty($updateFields)) {
                    $updateFields[] = "updated_at = ?";
                    $params[] = $now;
                    $params[] = $existing['id'];
                    
                    $sql = "UPDATE site_metrics SET " . implode(', ', $updateFields) . " WHERE id = ?";
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute($params);
                }
                
                // Return updated metrics
                $stmt = $pdo->prepare("SELECT * FROM site_metrics WHERE id = ?");
                $stmt->execute([$existing['id']]);
                $metrics = $stmt->fetch();
            } else {
                // Create new
                $id = bin2hex(random_bytes(16));
                
                $stmt = $pdo->prepare("
                    INSERT INTO site_metrics (id, years_experience, satisfied_clients, handmade_percentage, updated_at) 
                    VALUES (?, ?, ?, ?, ?)
                ");
                
                $stmt->execute([
                    $id,
                    $input['years_experience'] ?? 15,
                    $input['satisfied_clients'] ?? 500,
                    $input['handmade_percentage'] ?? 100,
                    $now
                ]);
                
                // Return created metrics
                $stmt = $pdo->prepare("SELECT * FROM site_metrics WHERE id = ?");
                $stmt->execute([$id]);
                $metrics = $stmt->fetch();
            }
            
            sendResponse($metrics);
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
} catch (Exception $e) {
    sendError('Server error: ' . $e->getMessage(), 500);
}
?>