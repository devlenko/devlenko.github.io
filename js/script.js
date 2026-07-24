/**
 * Progressive enhancements for the portfolio.
 * The page remains readable and navigable without JavaScript; this file only
 * adds small interaction and motion conveniences once the DOM is available.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Keep the copyright year current without needing a manual annual edit.
  document.querySelector('#year').textContent = new Date().getFullYear();

  // Collapse Bootstrap's mobile navigation after a section link is selected.
  document.querySelectorAll('#siteNav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('#siteNav');
      const instance = bootstrap.Collapse.getInstance(menu);
      if (instance) instance.hide();
    });
  });

  // Reveal sections only when motion is allowed. The fallback makes every
  // section visible immediately in older browsers and reduced-motion mode.
  const items = document.querySelectorAll('.reveal');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else items.forEach((item) => item.classList.add('is-visible'));

  // Show the persistent email link only after the hero has scrolled away,
  // then hide it again near the footer to prevent any overlapping controls.
  const floatingCta = document.querySelector('.floating-cta');
  const footer = document.querySelector('footer');
  const hero = document.querySelector('.hero');
  if (floatingCta && footer && hero && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let footerVisible = false;
    const updateFloatingCta = () => floatingCta.classList.toggle('is-hidden', heroVisible || footerVisible);

    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateFloatingCta();
    }, { threshold: 0.08 }).observe(hero);

    new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      updateFloatingCta();
    }, { threshold: 0.15 }).observe(footer);
  }
});
