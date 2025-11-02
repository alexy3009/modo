<?php
require_once __DIR__ . '/public/api/config.php';

// Fetch featured products for homepage
try {
    $stmt = $pdo->query("SELECT * FROM products WHERE featured = 1 ORDER BY created_at DESC LIMIT 6");
    $featuredProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    error_log("Error fetching products: " . $e->getMessage());
    $featuredProducts = [];
}

// Site metrics
try {
    $stmt = $pdo->query("SELECT * FROM site_metrics LIMIT 1");
    $metrics = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (Exception $e) {
    error_log("Error fetching metrics: " . $e->getMessage());
    $metrics = [
        'years_experience' => 15,
        'satisfied_clients' => 500,
        'handmade_percentage' => 100
    ];
}

$current_page = 'home';
?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="MODO Mebel - Производители на висококачествени луксозни мебели. Ръчна изработка, премиум материали, индивидуален подход.">
    <meta name="keywords" content="мебели, дивани, спални, столове, маси, луксозни мебели, ръчна изработка, Петрич">
    <meta name="author" content="MODO Mebel">

    <!-- Open Graph -->
    <meta property="og:title" content="MODO Mebel - Луксозни мебели с ръчна изработка">
    <meta property="og:description" content="Създаваме мебели с любов и майсторство. Всеки продукт е изработен ръчно в нашата работилница.">
    <meta property="og:image" content="/modoLogo.png">
    <meta property="og:type" content="website">

    <title>MODO Mebel - Луксозни мебели с ръчна изработка</title>

    <!-- Favicon -->
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
                <li><a href="/" class="nav-link active">Начало</a></li>
                <li><a href="/products.php" class="nav-link">Продукти</a></li>
                <li><a href="#manufacturing" class="nav-link scroll-link">Производство</a></li>
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
    <main>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-background"></div>
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1 class="hero-title fade-in">
                    <span class="hero-title-line1">Създаваме мебели</span>
                    <span class="hero-title-line2">с любов и майсторство</span>
                </h1>
                <p class="hero-subtitle fade-in delay-1">
                    Всеки продукт е изработен ръчно в нашата работилница с внимание към всеки детайл
                </p>
                <div class="hero-buttons fade-in delay-2">
                    <a href="/products.php" class="btn btn-primary">
                        <span>Разгледай продуктите</span>
                        <svg class="icon-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                    <a href="#manufacturing" class="btn btn-outline scroll-link">
                        <span>Нашето производство</span>
                        <svg class="icon-factory" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 20h20v-8l-4 4V10l-4 4V4l-4 4v12z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="scroll-indicator">
                <div class="scroll-indicator-dot"></div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="categories-section">
            <div class="container">
                <div class="section-header animate-on-scroll">
                    <h2 class="section-title">Нашите категории</h2>
                    <p class="section-subtitle">
                        Открийте перфектните мебели за вашия дом от нашите специализирани колекции
                    </p>
                </div>
                <div class="categories-grid">
                    <a href="/products.php?category=divani" class="category-card animate-on-scroll">
                        <img src="https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Дивани">
                        <div class="category-overlay"></div>
                        <div class="category-content">
                            <h3 class="category-title">Дивани</h3>
                        </div>
                    </a>
                    <a href="/products.php?category=spalni" class="category-card animate-on-scroll">
                        <img src="https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Спални">
                        <div class="category-overlay"></div>
                        <div class="category-content">
                            <h3 class="category-title">Спални</h3>
                        </div>
                    </a>
                    <a href="/products.php?category=stolove" class="category-card animate-on-scroll">
                        <img src="https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Столове">
                        <div class="category-overlay"></div>
                        <div class="category-content">
                            <h3 class="category-title">Столове</h3>
                        </div>
                    </a>
                    <a href="/products.php?category=masi" class="category-card animate-on-scroll">
                        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Маси">
                        <div class="category-overlay"></div>
                        <div class="category-content">
                            <h3 class="category-title">Маси</h3>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Featured Products Section -->
        <section class="featured-products-section">
            <div class="container">
                <div class="section-header animate-on-scroll">
                    <h2 class="section-title">Нашите продукти</h2>
                    <p class="section-subtitle">
                        Разгледайте нашите колекции, създадени с внимание към всеки детайл
                    </p>
                </div>
                <div class="products-grid">
                    <?php foreach ($featuredProducts as $product):
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
                            <h3 class="product-title"><?php echo htmlspecialchars($product['name']); ?></h3>
                            <div class="product-price"><?php echo htmlspecialchars($price_display); ?></div>
                            <a href="/product.php?id=<?php echo htmlspecialchars($product['id']); ?>" class="btn btn-primary">Детайли</a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
                <div class="section-footer animate-on-scroll">
                    <a href="/products.php" class="btn btn-primary">
                        <span>Виж всички</span>
                        <svg class="icon-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- Manufacturing Section -->
        <section class="manufacturing-section" id="manufacturing">
            <div class="container">
                <div class="section-header animate-on-scroll">
                    <h2 class="section-title">Ние сме производители</h2>
                    <p class="section-subtitle">
                        За разлика от други, ние не внасяме или препродаваме мебели. Всеки продукт е създаден в нашата работилница с любов и внимание към детайлите.
                    </p>
                </div>

                <div class="manufacturing-content">
                    <div class="manufacturing-text animate-on-scroll">
                        <h3 class="content-title">Нашата работилница</h3>
                        <p class="content-description">
                            В сърцето на нашето производство се намира модерна работилница, оборудвана с най-новите технологии и водена от опитни майстори с десетилетия опит.
                        </p>
                        <div class="features-grid">
                            <div class="feature-item animate-on-scroll">
                                <div class="feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M6 20h8M12 4v12m0 0l3-3m-3 3l-3-3"/>
                                    </svg>
                                </div>
                                <p class="feature-text">Ръчна изработка на всеки продукт</p>
                            </div>
                            <div class="feature-item animate-on-scroll">
                                <div class="feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7-5.5-4h7z"/>
                                    </svg>
                                </div>
                                <p class="feature-text">Използване на премиум материали</p>
                            </div>
                            <div class="feature-item animate-on-scroll">
                                <div class="feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                                    </svg>
                                </div>
                                <p class="feature-text">Индивидуален подход към всеки клиент</p>
                            </div>
                            <div class="feature-item animate-on-scroll">
                                <div class="feature-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <p class="feature-text">Гаранция за качество и дълготрайност</p>
                            </div>
                        </div>
                    </div>
                    <div class="manufacturing-image animate-on-scroll">
                        <img src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Работилница">
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card animate-on-scroll">
                        <h4 class="stat-number"><?php echo $metrics['years_experience']; ?>+</h4>
                        <p>Години опит</p>
                    </div>
                    <div class="stat-card animate-on-scroll">
                        <h4 class="stat-number"><?php echo $metrics['satisfied_clients']; ?>+</h4>
                        <p>Доволни клиенти</p>
                    </div>
                    <div class="stat-card animate-on-scroll">
                        <h4 class="stat-number"><?php echo $metrics['handmade_percentage']; ?>%</h4>
                        <p>Ръчна изработка</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about-section">
            <div class="container">
                <div class="about-content">
                    <div class="about-image animate-on-scroll">
                        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" alt="За нас">
                    </div>
                    <div class="about-text animate-on-scroll">
                        <h2 class="section-title">Нашата история</h2>
                        <p class="about-paragraph">
                            Започнахме като малка семейна работилница с мечтата да създаваме мебели, които не само са красиви, но и издържливи. Днес, след <?php echo $metrics['years_experience']; ?> години упорита работа, сме горди, че можем да предложим на нашите клиенти продукти от най-високо качество.
                        </p>
                        <p class="about-paragraph">
                            Всеки продукт носи частичка от нашата страст към майсторството и стремежа ни към съвършенство. Ние не просто правим мебели - ние създаваме произведения на изкуството за вашия дом.
                        </p>
                        <div class="about-stats">
                            <div class="stat-card">
                                <h4 class="stat-number"><?php echo $metrics['satisfied_clients']; ?>+</h4>
                                <p class="stat-label">Доволни клиенти</p>
                            </div>
                            <div class="stat-card">
                                <h4 class="stat-number"><?php echo $metrics['years_experience']; ?>+</h4>
                                <p class="stat-label">Години опит</p>
                            </div>
                        </div>
                        <a href="/about.php" class="btn btn-primary">Научете повече</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section">
            <div class="container">
                <div class="section-header animate-on-scroll">
                    <h2 class="section-title">Свържете се с нас</h2>
                    <p class="section-subtitle">
                        Готови сме да отговорим на всички ваши въпроси и да ви помогнем с избора на перфектните мебели
                    </p>
                </div>
                <div class="contact-content">
                    <div class="contact-info animate-on-scroll">
                        <h3 class="content-title">Информация за контакт</h3>
                        <div class="contact-items">
                            <div class="contact-item">
                                <div class="contact-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <div class="contact-details">
                                    <p class="contact-label">Телефон</p>
                                    <a href="tel:+359888822839" class="contact-value">+359 888822839</a>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                </div>
                                <div class="contact-details">
                                    <p class="contact-label">Email</p>
                                    <a href="mailto:bfoam.office@gmail.com" class="contact-value">bfoam.office@gmail.com</a>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <div class="contact-details">
                                    <p class="contact-label">Адрес</p>
                                    <p class="contact-value">Петрич, Ильо Войвода №50</p>
                                </div>
                            </div>
                        </div>
                        <a href="/contact.php" class="btn btn-primary">Изпратете запитване</a>
                    </div>
                    <div class="contact-form-wrapper animate-on-scroll">
                        <h3 class="content-title">Бърза форма за контакт</h3>
                        <form id="contact-form" class="contact-form" action="/public/api/contact.php" method="POST">
                            <div class="form-group">
                                <input type="text" id="contact-name" name="name" class="form-input" required>
                                <label for="contact-name" class="form-label">Вашето име</label>
                            </div>
                            <div class="form-group">
                                <input type="email" id="contact-email" name="email" class="form-input" required>
                                <label for="contact-email" class="form-label">Вашият email</label>
                            </div>
                            <div class="form-group">
                                <input type="tel" id="contact-phone" name="phone" class="form-input">
                                <label for="contact-phone" class="form-label">Вашият телефон</label>
                            </div>
                            <div class="form-group">
                                <textarea id="contact-message" name="message" class="form-textarea" rows="5" required></textarea>
                                <label for="contact-message" class="form-label">Вашето съобщение</label>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" id="contact-submit">
                                <span>Изпрати запитване</span>
                                <svg class="icon-send" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                                </svg>
                            </button>
                        </form>
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
                        <li><a href="#manufacturing" class="scroll-link">Производство</a></li>
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
                    <h4 class="footer-title">Бюлетин</h4>
                    <form class="newsletter-form" id="newsletter-form">
                        <input type="email" class="newsletter-input" placeholder="Вашият имейл" required>
                        <button type="submit" class="newsletter-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </form>
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

        // Smooth scroll for anchor links
        document.querySelectorAll('.scroll-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Contact form submission
        document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = document.getElementById('contact-submit');

            if (submitBtn) submitBtn.disabled = true;

            try {
                const response = await fetch('/public/api/contact.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    Toast.success('Успешно!', 'Вашето запитване е изпратено успешно!');
                    this.reset();
                } else {
                    Toast.error('Грешка!', 'Възникна грешка при изпращането.');
                }
            } catch (error) {
                Toast.error('Грешка!', 'Възникна грешка при изпращането.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
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
