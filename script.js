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

const RELEASE_VERSION = '1.1.5';
const RELEASE_BASE = `https://github.com/mathilad/StudyArc/releases/download/v${RELEASE_VERSION}`;
const DOWNLOADS = {
  android: `${RELEASE_BASE}/StudyArc-v${RELEASE_VERSION}.apk`,
  ios: `${RELEASE_BASE}/StudyArc-v${RELEASE_VERSION}-unsigned.ipa`,
  windows: `${RELEASE_BASE}/StudyArc-v${RELEASE_VERSION}-Windows.exe`,
  source: `${RELEASE_BASE}/StudyArc-v${RELEASE_VERSION}-source.zip`,
  web: 'https://mathilad.github.io/StudyArc/',
};

// Keep every download entry on the site pointed at the current release.
document.querySelectorAll('a').forEach((link) => {
  const label = link.textContent?.trim().toLowerCase() ?? '';

  if (label === 'download') {
    link.href = '#download';
  } else if (label.includes('download android app')) {
    link.href = DOWNLOADS.android;
  }
});

const downloadCard = document.querySelector('.download-card');
if (downloadCard) {
  const copy = downloadCard.querySelector('p');
  if (copy) {
    copy.textContent = `Get Study Arc v${RELEASE_VERSION} for Android, iPhone/iPad, Windows, the web, or download the complete source ZIP.`;
  }

  const actions = downloadCard.querySelector('.download-actions');
  if (actions) {
    actions.innerHTML = `
      <a class="btn btn-primary download-btn" href="${DOWNLOADS.web}">Open Web App</a>
      <a class="btn btn-primary download-btn" href="${DOWNLOADS.android}">Android APK · v${RELEASE_VERSION}</a>
      <a class="btn btn-secondary download-btn" href="${DOWNLOADS.ios}">Apple iOS IPA · v${RELEASE_VERSION}</a>
      <a class="btn btn-secondary download-btn" href="${DOWNLOADS.windows}">Windows EXE · v${RELEASE_VERSION}</a>
      <a class="btn btn-secondary download-btn" href="${DOWNLOADS.source}">Source ZIP · v${RELEASE_VERSION}</a>
    `;
  }

  const note = downloadCard.querySelector('.download-note');
  if (note) {
    note.textContent = 'Android uses the APK. The iOS download is an unsigned IPA and requires signing/sideloading before installation. The Windows download is a portable EXE.';
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
