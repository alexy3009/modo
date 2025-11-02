const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', observeElements);
