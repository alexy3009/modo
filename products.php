<?php
require_once __DIR__ . '/public/api/config.php';

// Get category filter
$category = isset($_GET['category']) ? trim($_GET['category']) : 'all';

// Fetch products
try {
    if ($category && $category !== 'all') {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ? ORDER BY created_at DESC");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
    }
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    error_log("Error fetching products: " . $e->getMessage());
    $products = [];
}

$current_page = 'products';
$page_title = 'Продукти - MODO Mebel';
if ($category && $category !== 'all') {
    $category_names = [
        'divani' => 'Дивани',
        'spalni' => 'Спални',
        'stolove' => 'Столове',
        'masi' => 'Маси'
    ];
    $page_title = ($category_names[$category] ?? ucfirst($category)) . ' - MODO Mebel';
}
?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Разгледайте нашите колекции от луксозни мебели - дивани, спални, столове, маси. Ръчна изработка, премиум качество.">
    <meta name="keywords" content="мебели, дивани, спални, столове, маси, луксозни мебели, ръчна изработка, Петрич">

    <title><?php echo htmlspecialchars($page_title); ?></title>

    <link rel="icon" href="/icon.png">
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
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-menu" id="nav-menu">
                <li><a href="/" class="nav-link">Начало</a></li>
                <li><a href="/products.php" class="nav-link active">Продукти</a></li>
                <li><a href="/#manufacturing" class="nav-link">Производство</a></li>
                <li><a href="/about.php" class="nav-link">За нас</a></li>
                <li><a href="/contact.php" class="nav-link">Контакт</a></li>
            </ul>

            <div class="nav-actions">
                <div class="language-switcher" id="language-switcher">
                    <button class="lang-btn active" data-lang="bg">BG</button>
                    <button class="lang-btn" data-lang="en">EN</button>
                    <button class="lang-btn" data-lang="el">EL</button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main style="padding-top: 100px;">
        <section class="products-section">
            <div class="container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="/">Начало</a> &gt;
                    <span>Продукти</span>
                </nav>

                <div class="section-header">
                    <h1 class="section-title">
                        <?php
                        if ($category && $category !== 'all') {
                            echo htmlspecialchars($category_names[$category] ?? ucfirst($category));
                        } else {
                            echo 'Всички продукти';
                        }
                        ?>
                    </h1>
                    <p class="section-subtitle">
                        Разгледайте нашите колекции, създадени с внимание към всеки детайл
                    </p>
                </div>

                <!-- Category Filter -->
                <div class="category-filter">
                    <a href="/products.php" class="filter-btn <?php echo $category === 'all' ? 'active' : ''; ?>">Всички</a>
                    <a href="/products.php?category=divani" class="filter-btn <?php echo $category === 'divani' ? 'active' : ''; ?>">Дивани</a>
                    <a href="/products.php?category=spalni" class="filter-btn <?php echo $category === 'spalni' ? 'active' : ''; ?>">Спални</a>
                    <a href="/products.php?category=stolove" class="filter-btn <?php echo $category === 'stolove' ? 'active' : ''; ?>">Столове</a>
                    <a href="/products.php?category=masi" class="filter-btn <?php echo $category === 'masi' ? 'active' : ''; ?>">Маси</a>
                </div>

                <!-- Products Grid -->
                <div class="products-grid">
                    <?php if (empty($products)): ?>
                        <div class="no-products">
                            <p>Няма налични продукти в тази категория.</p>
                        </div>
                    <?php else: ?>
                        <?php foreach ($products as $product):
                            $image_urls = json_decode($product['image_urls'], true);
                            $cover_image = !empty($image_urls) ? $image_urls[0] : '/modoLogo.png';
                            $price_display = $product['show_price'] && $product['price'] ? $product['price'] : 'По запитване';
                        ?>
                        <div class="product-card animate-on-scroll">
                            <a href="/product.php?id=<?php echo htmlspecialchars($product['id']); ?>" class="product-image-container">
                                <img src="<?php echo htmlspecialchars($cover_image); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" class="product-image">
                                <div class="product-badge"><?php echo ucfirst($product['category']); ?></div>
                            </a>
                            <div class="product-content">
                                <h3 class="product-title">
                                    <a href="/product.php?id=<?php echo htmlspecialchars($product['id']); ?>">
                                        <?php echo htmlspecialchars($product['name']); ?>
                                    </a>
                                </h3>
                                <?php if ($product['description']): ?>
                                <p class="product-description">
                                    <?php echo htmlspecialchars(mb_substr($product['description'], 0, 100)); ?>...
                                </p>
                                <?php endif; ?>
                                <div class="product-price"><?php echo htmlspecialchars($price_display); ?></div>
                                <a href="/product.php?id=<?php echo htmlspecialchars($product['id']); ?>" class="btn btn-primary">Детайли</a>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
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
                    <p class="footer-description">
                        Производители на висококачествени луксозни мебели за вашия дом. Всеки продукт е създаден с любов и внимание към детайлите.
                    </p>
                    <div class="footer-social">
                        <a href="#" class="social-link" aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Навигация</h4>
                    <ul class="footer-links">
                        <li><a href="/">Начало</a></li>
                        <li><a href="/products.php">Продукти</a></li>
                        <li><a href="/#manufacturing">Производство</a></li>
                        <li><a href="/about.php">За нас</a></li>
                        <li><a href="/contact.php">Контакт</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Контакт</h4>
                    <ul class="footer-contacts">
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            Петрич, Ильо Войвода №50
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            +359 888822839
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <path d="M22 6l-10 7L2 6"/>
                            </svg>
                            bfoam.office@gmail.com
                        </li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4 class="footer-title">Категории</h4>
                    <ul class="footer-links">
                        <li><a href="/products.php?category=divani">Дивани</a></li>
                        <li><a href="/products.php?category=spalni">Спални</a></li>
                        <li><a href="/products.php?category=stolove">Столове</a></li>
                        <li><a href="/products.php?category=masi">Маси</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p class="copyright">
                    © 2025 MODO Mebel. Всички права запазени.
                </p>
            </div>
        </div>
    </footer>

    <!-- Toast Container -->
    <div id="toast-container" class="toast-container"></div>

    <!-- Cookie Banner -->
    <div id="cookie-banner" class="cookie-banner">
        <div class="cookie-content">
            <p class="cookie-text">
                Използваме бисквитки за да подобрим вашето изживяване на сайта. Като продължите да използвате сайта, вие се съгласявате с нашата политика за бисквитки.
            </p>
            <div class="cookie-actions">
                <button class="btn btn-primary btn-sm" id="cookie-accept">Приемам</button>
                <button class="btn btn-outline btn-sm" id="cookie-decline">Отказвам</button>
            </div>
        </div>
    </div>

    <!-- JavaScript Files -->
    <script src="/js/utils.js"></script>
    <script src="/js/animations.js"></script>
    <script src="/js/cookies.js"></script>
    <script src="/js/toast.js"></script>
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-toggle')?.addEventListener('click', function() {
            document.getElementById('nav-menu')?.classList.toggle('active');
        });

        // Cookie banner
        const cookieAccept = document.getElementById('cookie-accept');
        const cookieDecline = document.getElementById('cookie-decline');
        if (cookieAccept) cookieAccept.addEventListener('click', CookieManager.accept);
        if (cookieDecline) cookieDecline.addEventListener('click', CookieManager.decline);

        CookieManager.showBanner();

        // Initialize animations
        observeElements();
    </script>
</body>
</html>
