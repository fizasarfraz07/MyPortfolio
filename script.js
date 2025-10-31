// Portfolio JS: smooth scrolling, reveal on scroll, mobile menu, contact form handler
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        document.getElementById('navLinks')?.classList.remove('show');
      }
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold:0.12});
  revealEls.forEach(el => obs.observe(el));

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle?.addEventListener('click', () => navLinks.classList.toggle('show'));

  // Active section highlight
  const sections = document.querySelectorAll('main section, #hero');
  const navItems = document.querySelectorAll('.nav-links a');
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, {threshold:0.45});
  sections.forEach(s => secObserver.observe(s));

  // Contact form (simple demo handler)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    // Simple UI feedback
    alert(`Thanks ${formData.get('name')}! Message received — (demo).`);
    contactForm.reset();
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});