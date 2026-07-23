// Enhances the page without making its core content dependent on JavaScript.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#year').textContent = new Date().getFullYear();

  // Close the mobile navigation after an in-page link is selected.
  document.querySelectorAll('#siteNav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('#siteNav');
      const instance = bootstrap.Collapse.getInstance(menu);
      if (instance) instance.hide();
    });
  });

  // Reveal content as it enters the viewport while respecting reduced-motion preferences.
  const items = document.querySelectorAll('.reveal');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else items.forEach((item) => item.classList.add('is-visible'));

  // Temporarily hide the fixed control near the footer so footer links remain clear.
  const floatingCta = document.querySelector('.floating-cta');
  const footer = document.querySelector('footer');
  if (floatingCta && footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      floatingCta.classList.toggle('is-hidden', entry.isIntersecting);
    }, { threshold: 0.15 });
    footerObserver.observe(footer);
  }
});
