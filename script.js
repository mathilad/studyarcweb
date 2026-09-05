const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

// Keep the public download action on the Study Arc website. Cloudflare Pages
// handles /download-app and redirects straight to the APK file asset, so users
// never have to visit a GitHub repository or release page.
document.querySelectorAll('a[href*="StudyArc-v1.1.1.apk"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.assign('/download-app');
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
