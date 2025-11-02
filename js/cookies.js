const CookieManager = {
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },
  set: (name, value, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  },
  showBanner: () => {
    const consent = CookieManager.get('cookie_consent');
    if (!consent) {
      setTimeout(() => $('#cookie-banner')?.classList.add('active'), 1000);
    }
  },
  accept: () => {
    CookieManager.set('cookie_consent', 'accepted');
    $('#cookie-banner')?.classList.remove('active');
  },
  decline: () => {
    CookieManager.set('cookie_consent', 'declined');
    $('#cookie-banner')?.classList.remove('active');
  }
};
