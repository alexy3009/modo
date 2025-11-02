<?php
$current_page = 'contact';
$product_id = isset($_GET['product']) ? trim($_GET['product']) : null;
?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Свържете се с MODO Mebel - Телефон: +359 888822839, Email: bfoam.office@gmail.com. Адрес: Петрич, Ильо Войвода №50">
    <meta name="keywords" content="контакт, MODO Mebel, телефон, email, адрес, Петрич">

    <title>Контакт - MODO Mebel</title>

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
                <li><a href="/products.php" class="nav-link">Продукти</a></li>
                <li><a href="/#manufacturing" class="nav-link">Производство</a></li>
                <li><a href="/about.php" class="nav-link">За нас</a></li>
                <li><a href="/contact.php" class="nav-link active">Контакт</a></li>
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
        <section class="contact-page-section">
            <div class="container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="/">Начало</a> &gt;
                    <span>Контакт</span>
                </nav>

                <div class="section-header">
                    <h1 class="section-title">Свържете се с нас</h1>
                    <p class="section-subtitle">
                        Готови сме да отговорим на всички ваши въпроси и да ви помогнем с избора на перфектните мебели
                    </p>
                </div>

                <div class="contact-content">
                    <!-- Contact Information -->
                    <div class="contact-info-section animate-on-scroll">
                        <h2 class="content-title">Информация за контакт</h2>

                        <div class="contact-items">
                            <div class="contact-item">
                                <div class="contact-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <div class="contact-details">
                                    <p class="contact-label">Адрес</p>
                                    <p class="contact-value">Петрич, Ильо Войвода №50</p>
                                </div>
                            </div>

                            <div class="contact-item">
                                <div class="contact-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                </div>
                                <div class="contact-details">
                                    <p class="contact-label">Работно време</p>
                                    <p class="contact-value">Понеделник - Петък: 9:00 - 18:00</p>
                                    <p class="contact-value">Събота: 10:00 - 14:00</p>
                                    <p class="contact-value">Неделя: Почивен ден</p>
                                </div>
                            </div>
                        </div>

                        <!-- Map Section -->
                        <div class="map-container">
                            <h3 class="content-title">Къде ни намирате</h3>
                            <div class="map-embed">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.123456789!2d23.21!3d41.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI0JzM2LjAiTiAyM8KwMTInMzYuMCJF!5e0!3m2!1sen!2sbg!4v1234567890"
                                    width="100%"
                                    height="400"
                                    style="border:0; border-radius: 12px;"
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="contact-form-section animate-on-scroll">
                        <h2 class="content-title">Изпратете запитване</h2>
                        <p class="form-description">
                            Попълнете формата по-долу и ние ще се свържем с вас възможно най-скоро.
                        </p>

                        <form id="contact-form" class="contact-form" method="POST">
                            <?php if ($product_id): ?>
                            <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product_id); ?>">
                            <div class="form-notice">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 16v-4M12 8h.01"/>
                                </svg>
                                Запитване за конкретен продукт
                            </div>
                            <?php endif; ?>

                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" id="contact-name" name="name" class="form-input" required>
                                    <label for="contact-name" class="form-label">Вашето име *</label>
                                </div>

                                <div class="form-group">
                                    <input type="email" id="contact-email" name="email" class="form-input" required>
                                    <label for="contact-email" class="form-label">Вашият email *</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <input type="tel" id="contact-phone" name="phone" class="form-input">
                                <label for="contact-phone" class="form-label">Вашият телефон</label>
                            </div>

                            <div class="form-group">
                                <textarea id="contact-message" name="message" class="form-textarea" rows="6" required></textarea>
                                <label for="contact-message" class="form-label">Вашето съобщение *</label>
                            </div>

                            <div class="form-footer">
                                <p class="form-note">* Задължителни полета</p>
                                <button type="submit" class="btn btn-primary btn-large" id="contact-submit">
                                    <span>Изпрати запитване</span>
                                    <svg class="icon-send" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Why Contact Us Section -->
                <div class="why-contact-section">
                    <h2 class="section-title">Защо да се свържете с нас?</h2>
                    <div class="benefits-grid">
                        <div class="benefit-card animate-on-scroll">
                            <div class="benefit-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                            </div>
                            <h3 class="benefit-title">Бърз отговор</h3>
                            <p class="benefit-description">Отговаряме на всички запитвания в рамките на 24 часа</p>
                        </div>

                        <div class="benefit-card animate-on-scroll">
                            <div class="benefit-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <h3 class="benefit-title">Индивидуален подход</h3>
                            <p class="benefit-description">Персонализирани решения за вашите нужди</p>
                        </div>

                        <div class="benefit-card animate-on-scroll">
                            <div class="benefit-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7-5.5-4h7z"/>
                                </svg>
                            </div>
                            <h3 class="benefit-title">Експертни съвети</h3>
                            <p class="benefit-description">Професионална консултация от нашите специалисти</p>
                        </div>

                        <div class="benefit-card animate-on-scroll">
                            <div class="benefit-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <path d="M22 4L12 14.01l-3-3"/>
                                </svg>
                            </div>
                            <h3 class="benefit-title">Гарантирано качество</h3>
                            <p class="benefit-description">Всички продукти с гаранция и сертификати</p>
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
                    <p class="footer-description">
                        Производители на висококачествени луксозни мебели за вашия дом. Всеки продукт е създаден с любов и внимание към детайлите.
                    </p>
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
                        <li>Петрич, Ильо Войвода №50</li>
                        <li>+359 888822839</li>
                        <li>bfoam.office@gmail.com</li>
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
                    Toast.success('Успешно!', 'Вашето запитване е изпратено успешно! Ще се свържем с вас скоро.');
                    this.reset();
                } else {
                    Toast.error('Грешка!', result.message || 'Възникна грешка при изпращането.');
                }
            } catch (error) {
                console.error('Error:', error);
                Toast.error('Грешка!', 'Възникна грешка при изпращането. Моля опитайте отново.');
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
