<?php
// Dynamic Product Detail Page with SEO
require_once __DIR__ . '/public/api/config.php';

// Get product ID from URL
$product_id = isset($_GET['id']) ? trim($_GET['id']) : null;

if (!$product_id) {
    header('HTTP/1.0 404 Not Found');
    include '404.php';
    exit;
}

// Fetch product data
try {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id LIMIT 1");
    $stmt->execute(['id' => $product_id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        header('HTTP/1.0 404 Not Found');
        include '404.php';
        exit;
    }
} catch (Exception $e) {
    error_log("Error fetching product: " . $e->getMessage());
    header('HTTP/1.0 500 Internal Server Error');
    exit;
}

// Parse translations
$translations = !empty($product['translations']) ? json_decode($product['translations'], true) : [];
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'bg';
if (!in_array($lang, ['bg', 'en', 'el'])) $lang = 'bg';

// Get translated fields
$product_name = $translations[$lang]['name'] ?? $product['name'];
$product_description = $translations[$lang]['description'] ?? $product['description'];
$product_dimensions = $translations[$lang]['dimensions'] ?? $product['dimensions'];

// Parse image URLs
$image_urls = !empty($product['image_urls']) ? json_decode($product['image_urls'], true) : [];
$cover_image = !empty($image_urls) ? $image_urls[0] : '/modoLogo.png';

// SEO Meta Data
$page_title = $product_name . ' - MODO Mebel';
$meta_description = substr($product_description, 0, 155) . '...';
$meta_keywords = 'мебели, ' . $product_name . ', ' . $product['category'] . ', луксозни мебели, Петрич';
$canonical_url = 'https://modo-mebel.com/product.php?id=' . $product_id;

// Open Graph
$og_title = $product_name;
$og_description = $product_description;
$og_image = $cover_image;

// Structured Data for Google
$structured_data = [
    '@context' => 'https://schema.org/',
    '@type' => 'Product',
    'name' => $product_name,
    'image' => array_map(function($url) {
        return preg_match('/^https?:\/\//i', $url) ? $url : 'https://modo-mebel.com' . $url;
    }, $image_urls),
    'description' => $product_description,
    'brand' => [
        '@type' => 'Brand',
        'name' => 'MODO Mebel'
    ],
    'offers' => [
        '@type' => 'Offer',
        'price' => $product['show_price'] && $product['price'] ? $product['price'] : 'На запитване',
        'priceCurrency' => 'BGN',
        'availability' => 'https://schema.org/InStock',
        'url' => $canonical_url
    ]
];

$current_page = 'products';
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($meta_description); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($meta_keywords); ?>">

    <!-- Open Graph -->
    <meta property="og:title" content="<?php echo htmlspecialchars($og_title); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($og_description); ?>">
    <meta property="og:image" content="<?php echo htmlspecialchars($og_image); ?>">
    <meta property="og:type" content="product">
    <meta property="og:url" content="<?php echo $canonical_url; ?>">

    <title><?php echo htmlspecialchars($page_title); ?></title>
    <link rel="canonical" href="<?php echo $canonical_url; ?>">
    <link rel="icon" href="/icon.png">

    <!-- CSS Files -->
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/animations.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/responsive.css">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17599341656"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-17599341656');
    </script>

    <!-- Structured Data -->
    <script type="application/ld+json">
    <?php echo json_encode($structured_data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
    </script>
</head>
<body>
    <!-- Navigation -->
    <nav id="main-nav" class="main-nav">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="/">
                    <img src="/modoLogo.png" alt="MODO Mebel Logo" class="logo-img">
                    <span class="logo-text">MODO Mebel</span>
                </a>
            </div>

            <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                <span></span><span></span><span></span>
            </button>

            <ul class="nav-menu" id="nav-menu">
                <li><a href="/" class="nav-link">Начало</a></li>
                <li><a href="/products/" class="nav-link active">Продукти</a></li>
                <li><a href="/#manufacturing" class="nav-link">Производство</a></li>
                <li><a href="/about.php" class="nav-link">За нас</a></li>
                <li><a href="/contact.php" class="nav-link">Контакт</a></li>
            </ul>

            <div class="nav-actions">
                <div class="language-switcher" id="language-switcher">
                    <a href="?id=<?php echo $product_id; ?>&lang=bg" class="lang-btn <?php echo $lang == 'bg' ? 'active' : ''; ?>">BG</a>
                    <a href="?id=<?php echo $product_id; ?>&lang=en" class="lang-btn <?php echo $lang == 'en' ? 'active' : ''; ?>">EN</a>
                    <a href="?id=<?php echo $product_id; ?>&lang=el" class="lang-btn <?php echo $lang == 'el' ? 'active' : ''; ?>">EL</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Product Detail Content -->
    <main style="padding-top: 100px;">
        <section class="product-detail-section">
            <div class="container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="/">Начало</a> &gt;
                    <a href="/products/">Продукти</a> &gt;
                    <span><?php echo htmlspecialchars($product_name); ?></span>
                </nav>

                <div class="product-detail-grid">
                    <!-- Image Gallery -->
                    <div class="product-gallery">
                        <div class="main-image">
                            <img id="main-product-image" src="<?php echo htmlspecialchars($cover_image); ?>" alt="<?php echo htmlspecialchars($product_name); ?>">
                        </div>
                        <?php if (count($image_urls) > 1): ?>
                        <div class="thumbnail-images">
                            <?php foreach ($image_urls as $index => $url): ?>
                            <img src="<?php echo htmlspecialchars($url); ?>"
                                 alt="<?php echo htmlspecialchars($product_name); ?> - Image <?php echo $index + 1; ?>"
                                 onclick="document.getElementById('main-product-image').src = this.src"
                                 class="thumbnail">
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>
                    </div>

                    <!-- Product Info -->
                    <div class="product-info">
                        <h1 class="product-title"><?php echo htmlspecialchars($product_name); ?></h1>

                        <?php if ($product_dimensions): ?>
                        <p class="product-dimensions">
                            <strong>Размери:</strong> <?php echo htmlspecialchars($product_dimensions); ?>
                        </p>
                        <?php endif; ?>

                        <div class="product-price-box">
                            <?php if ($product['show_price'] && $product['price']): ?>
                            <span class="product-price"><?php echo htmlspecialchars($product['price']); ?></span>
                            <?php else: ?>
                            <span class="product-price">По запитване</span>
                            <?php endif; ?>
                        </div>

                        <?php if ($product_description): ?>
                        <div class="product-description">
                            <h3>Описание</h3>
                            <p><?php echo nl2br(htmlspecialchars($product_description)); ?></p>
                        </div>
                        <?php endif; ?>

                        <!-- CTA Buttons -->
                        <div class="product-actions">
                            <a href="/contact.php?product=<?php echo urlencode($product_id); ?>" class="btn btn-primary">
                                Запитване за продукта
                            </a>
                            <a href="tel:+359888822839" class="btn btn-outline">
                                Обади се: +359 888822839
                            </a>
                        </div>

                        <!-- Features -->
                        <div class="product-features">
                            <div class="feature-badge">✓ Ръчна изработка</div>
                            <div class="feature-badge">✓ Премиум материали</div>
                            <div class="feature-badge">✓ Гаранция качество</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <div class="footer-logo">
                        <img src="/modoLogo.png" alt="MODO Mebel Logo" class="footer-logo-img">
                        <h3 class="footer-brand">MODO Mebel</h3>
                    </div>
                    <p class="footer-description">Производители на висококачествени луксозни мебели за вашия дом.</p>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Навигация</h4>
                    <ul class="footer-links">
                        <li><a href="/">Начало</a></li>
                        <li><a href="/products/">Продукти</a></li>
                        <li><a href="/about.php">За нас</a></li>
                        <li><a href="/contact.php">Контакт</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Контакт</h4>
                    <ul class="footer-contacts">
                        <li>Петрич, Ильо Войвода №50</li>
                        <li>+359 888822839</li>
                        <li>bfoam.office@gmail.com</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p class="copyright">© 2025 MODO Mebel. Всички права запазени.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="/js/utils.js"></script>
    <script src="/js/i18n.js"></script>
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-toggle')?.addEventListener('click', function() {
            document.getElementById('nav-menu')?.classList.toggle('active');
        });

        // Image gallery lightbox
        document.querySelectorAll('.product-gallery img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                // Simple lightbox functionality
                const modal = document.createElement('div');
                modal.className = 'image-modal active';
                modal.innerHTML = '<img src="' + this.src + '" class="modal-image"><button class="modal-close" onclick="this.parentElement.remove()">×</button>';
                document.body.appendChild(modal);
            });
        });
    </script>
</body>
</html>
