const DataLoader = {
    async loadFeaturedProducts() {
        try {
            const response = await fetch('/public/api/products.php?featured=1&limit=6');
            const data = await response.json();

            if (data.success && data.products) {
                return data.products;
            }
            return [];
        } catch (error) {
            console.error('Error loading featured products:', error);
            return [];
        }
    },

    async loadAllProducts(category = null) {
        try {
            const url = category && category !== 'all'
                ? `/public/api/products.php?category=${encodeURIComponent(category)}`
                : '/public/api/products.php';

            const response = await fetch(url);
            const data = await response.json();

            if (data.success && data.products) {
                return data.products;
            }
            return [];
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    },

    async loadSiteMetrics() {
        try {
            const response = await fetch('/public/api/site-metrics.php');
            const data = await response.json();

            if (data.success && data.metrics) {
                return data.metrics;
            }
            return {
                years_experience: 15,
                satisfied_clients: 500,
                handmade_percentage: 100
            };
        } catch (error) {
            console.error('Error loading site metrics:', error);
            return {
                years_experience: 15,
                satisfied_clients: 500,
                handmade_percentage: 100
            };
        }
    },

    renderProduct(product) {
        const imageUrls = JSON.parse(product.image_urls || '[]');
        const coverImage = imageUrls.length > 0 ? imageUrls[0] : '/modoLogo.png';
        const priceDisplay = product.show_price && product.price ? product.price : 'По запитване';

        return `
            <div class="product-card animate-on-scroll">
                <a href="/product.php?id=${encodeURIComponent(product.id)}" class="product-image-container">
                    <img src="${coverImage}" alt="${product.name}" class="product-image">
                    <div class="product-badge">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                </a>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    ${product.description ? `<p class="product-description">${product.description.substring(0, 100)}...</p>` : ''}
                    <div class="product-price">${priceDisplay}</div>
                    <a href="/product.php?id=${encodeURIComponent(product.id)}" class="btn btn-primary">Детайли</a>
                </div>
            </div>
        `;
    },

    updateMetrics(metrics) {
        document.querySelectorAll('[data-metric="years_experience"]').forEach(el => {
            el.textContent = `${metrics.years_experience}+`;
        });

        document.querySelectorAll('[data-metric="satisfied_clients"]').forEach(el => {
            el.textContent = `${metrics.satisfied_clients}+`;
        });

        document.querySelectorAll('[data-metric="handmade_percentage"]').forEach(el => {
            el.textContent = `${metrics.handmade_percentage}%`;
        });

        document.querySelectorAll('[data-metric-inline="years_experience"]').forEach(el => {
            el.textContent = metrics.years_experience;
        });
    },

    async loadHomepageData() {
        const [products, metrics] = await Promise.all([
            this.loadFeaturedProducts(),
            this.loadSiteMetrics()
        ]);

        const grid = document.getElementById('featured-products-grid');
        if (grid && products.length > 0) {
            grid.innerHTML = products.map(p => this.renderProduct(p)).join('');

            if (typeof observeElements === 'function') {
                observeElements();
            }
        } else if (grid) {
            grid.innerHTML = '<p class="no-products">Няма налични продукти в момента.</p>';
        }

        this.updateMetrics(metrics);
    },

    async loadProductsPageData(category = null) {
        const [products, metrics] = await Promise.all([
            this.loadAllProducts(category),
            this.loadSiteMetrics()
        ]);

        const grid = document.getElementById('products-grid');
        if (grid && products.length > 0) {
            grid.innerHTML = products.map(p => this.renderProduct(p)).join('');

            if (typeof observeElements === 'function') {
                observeElements();
            }
        } else if (grid) {
            grid.innerHTML = '<div class="no-products"><p>Няма налични продукти в тази категория.</p></div>';
        }

        this.updateMetrics(metrics);
    },

    async loadAboutPageData() {
        const metrics = await this.loadSiteMetrics();
        this.updateMetrics(metrics);
    }
};
