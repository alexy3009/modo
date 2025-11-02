const Router = {
  currentPage: 'home',
  
  navigateTo: (page) => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    const pageEl = $('#page-' + page);
    if (pageEl) {
      pageEl.classList.add('active');
      Router.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      document.querySelectorAll(`[data-page="${page}"]`).forEach(l => l.classList.add('active'));
      
      if (page === 'products') Router.loadProductsPage();
      else if (page === 'home') Router.loadHomePage();
    }
  },
  
  loadHomePage: async () => {
    try {
      const products = await API.getFeaturedProducts();
      const metrics = await API.getSiteMetrics();
      Router.renderCategories();
      Router.renderFeaturedProducts(products);
      Router.renderStats(metrics);
    } catch (error) {
      console.error('Error loading home page:', error);
    }
  },
  
  renderCategories: () => {
    const grid = $('#categories-grid');
    if (!grid) return;
    
    const categories = [
      { name: 'divani', image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'spalni', image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'stolove', image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800' },
      { name: 'masi', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' }
    ];
    
    grid.innerHTML = categories.map(cat => `
      <div class="category-card animate-on-scroll" onclick="Router.navigateTo('products')">
        <img src="${cat.image}" alt="${I18N.t(cat.name)}">
        <div class="category-overlay"></div>
        <div class="category-content">
          <h3 class="category-title">${I18N.t(cat.name)}</h3>
        </div>
      </div>
    `).join('');
    
    observeElements();
  },
  
  renderFeaturedProducts: (products) => {
    const grid = $('#featured-products-grid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => {
      const name = I18N.getTranslatedProductField(product, 'name');
      const price = product.show_price && product.price ? product.price : I18N.t('onRequest');
      const image = API.getProductCoverImage(product);
      
      return `
        <div class="product-card animate-on-scroll">
          <div class="product-image-container">
            <img src="${image}" alt="${name}" class="product-image">
            <div class="product-badge">${I18N.t(product.category)}</div>
          </div>
          <div class="product-content">
            <h3 class="product-title">${name}</h3>
            <div class="product-price">${price}</div>
            <button class="btn btn-primary">${I18N.t('details')}</button>
          </div>
        </div>
      `;
    }).join('');
    
    observeElements();
  },
  
  renderStats: (metrics) => {
    const grid = $('#stats-grid');
    if (!grid) return;
    
    grid.innerHTML = `
      <div class="stat-card animate-on-scroll">
        <h4 class="stat-number">${metrics.years_experience}+</h4>
        <p>${I18N.t('yearsExperience')}</p>
      </div>
      <div class="stat-card animate-on-scroll">
        <h4 class="stat-number">${metrics.satisfied_clients}+</h4>
        <p>${I18N.t('satisfiedClients')}</p>
      </div>
      <div class="stat-card animate-on-scroll">
        <h4 class="stat-number">${metrics.handmade_percentage}%</h4>
        <p>Ръчна изработка</p>
      </div>
    `;
    
    observeElements();
  },
  
  loadProductsPage: async () => {
    const pageEl = $('#page-products');
    if (!pageEl) return;
    
    pageEl.innerHTML = `
      <section class="products-section">
        <div class="container">
          <h1 class="section-title">${I18N.t('productsTitle')}</h1>
          <div class="products-grid" id="all-products-grid"></div>
        </div>
      </section>
    `;
    
    try {
      const products = await API.getProducts();
      const grid = $('#all-products-grid');
      if (grid) {
        grid.innerHTML = products.map(product => {
          const name = I18N.getTranslatedProductField(product, 'name');
          const price = product.show_price && product.price ? product.price : I18N.t('onRequest');
          const image = API.getProductCoverImage(product);
          
          return `
            <div class="product-card">
              <div class="product-image-container">
                <img src="${image}" alt="${name}" class="product-image">
                <div class="product-badge">${I18N.t(product.category)}</div>
              </div>
              <div class="product-content">
                <h3 class="product-title">${name}</h3>
                <div class="product-price">${price}</div>
                <button class="btn btn-primary">${I18N.t('details')}</button>
              </div>
            </div>
          `;
        }).join('');
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
};
