// Smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-reveal animations
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

const items = document.querySelectorAll('.rail-item');
const panels = document.querySelectorAll('.panel');

/* ---------- NOTION EMBED FALLBACK ----------
   Some sites set headers (X-Frame-Options / CSP frame-ancestors)
   that block being embedded in an iframe. There's no fully
   reliable way to detect this from the parent page, so this
   uses a load-timeout heuristic: if the iframe hasn't fired its
   "load" event within a few seconds, assume it's blocked and
   swap in a direct link to the board instead.
   ------------------------------------------------------------ */
const roleFrame = document.getElementById('roles-frame');
const roleFallback = document.getElementById('roles-fallback');
let frameLoaded = false;
 
roleFrame.addEventListener('load', () => {
  frameLoaded = true;
});
 
setTimeout(() => {
  if (!frameLoaded) {
    roleFrame.style.display = 'none';
    roleFallback.classList.add('show');
  }
}, 4000);