<?php
header('Content-Type: application/xml; charset=utf-8');
require_once __DIR__ . '/public/api/config.php';

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

// Homepage
echo '<url><loc>https://modo-mebel.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>';

// Static pages
echo '<url><loc>https://modo-mebel.com/products/</loc><changefreq>daily</changefreq><priority>0.9</priority></url>';
echo '<url><loc>https://modo-mebel.com/about.php</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>';
echo '<url><loc>https://modo-mebel.com/contact.php</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>';

// Products
try {
    $stmt = $pdo->query("SELECT id, updated_at FROM products ORDER BY updated_at DESC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $lastmod = date('Y-m-d', strtotime($row['updated_at']));
        echo '<url>';
        echo '<loc>https://modo-mebel.com/product.php?id=' . htmlspecialchars($row['id']) . '</loc>';
        echo '<lastmod>' . $lastmod . '</lastmod>';
        echo '<changefreq>weekly</changefreq>';
        echo '<priority>0.8</priority>';
        echo '</url>';
    }
} catch (Exception $e) {
    error_log("Sitemap error: " . $e->getMessage());
}

echo '</urlset>';
