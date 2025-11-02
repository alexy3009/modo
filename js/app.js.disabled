document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 500);

  I18N.updatePage();
  Router.loadHomePage();
  CookieManager.showBanner();

  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.getAttribute('data-page');
      if (page) Router.navigateTo(page);
    });
  });

  document.querySelectorAll('[data-scroll-to]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-scroll-to');
      scrollToElement('#' + target);
    });
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      I18N.setLanguage(lang);
    });
  });

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        message: document.getElementById('contact-message').value,
        product_id: null
      };

      const submitBtn = document.getElementById('contact-submit');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const result = await API.createContactInquiry(formData);
        if (result) {
          Toast.success('#A?5H=>!', '0H5B> 70?8B20=5 5 87?@0B5=> CA?5H=>!');
          contactForm.reset();
        } else {
          Toast.error('@5H:0!', 'J7=8:=0 3@5H:0 ?@8 87?@0I0=5B>.');
        }
      } catch (error) {
        Toast.error('@5H:0!', 'J7=8:=0 3@5H:0 ?@8 87?@0I0=5B>.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');
  if (cookieAccept) cookieAccept.addEventListener('click', CookieManager.accept);
  if (cookieDecline) cookieDecline.addEventListener('click', CookieManager.decline);

  const modalClose = document.getElementById('modal-close');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const imageModal = document.getElementById('image-modal');

  if (modalClose) modalClose.addEventListener('click', Modal.hide);
  if (modalPrev) modalPrev.addEventListener('click', Modal.prev);
  if (modalNext) modalNext.addEventListener('click', Modal.next);
  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) Modal.hide();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (document.getElementById('image-modal').classList.contains('active')) {
      if (e.key === 'Escape') Modal.hide();
      else if (e.key === 'ArrowLeft') Modal.prev();
      else if (e.key === 'ArrowRight') Modal.next();
    }
  });

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }
    }
  });

  const adminAccess = document.querySelector('.admin-access');
  if (adminAccess) {
    adminAccess.addEventListener('click', () => {
      Router.navigateTo('admin');
    });
  }
});
