// Elements
const themeToggle = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;
const body = document.body;

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('nav-menu');

let menuOpen = false;

// Unified theme setter
function setTheme(theme) {
  // Update data-theme attribute for CSS variables
  root.setAttribute('data-theme', theme);

  // Also toggle body class for second theme style block
  if (theme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }

  // Update icon or button text (if themeIcon exists)
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // If you want a button with text instead of icon:
  if (themeToggle && !themeIcon) {
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  // Save to localStorage
  localStorage.setItem('theme', theme);
}

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme('dark');
} else {
  setTheme('light');
}

// Theme toggle event
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || (body.classList.contains('dark') ? 'dark' : 'light');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

// Hamburger menu toggle logic
if (hamburger && mobileMenu) {
  function toggleMenu() {
    menuOpen = !menuOpen;
    if (mobileMenu.style) {
      // For inline style toggling
      mobileMenu.style.display = menuOpen ? 'flex' : 'none';
    }
    mobileMenu.classList.toggle('open', menuOpen);
    hamburger.classList.toggle('active', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
  }

  hamburger.addEventListener('click', toggleMenu);

  hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking a mobile nav link
  mobileMenu.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      if (mobileMenu.style) mobileMenu.style.display = 'none';
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Highlight active navbar links on scroll
const sectionIds = ['hero', 'features', 'testimonials', 'pricing', 'cta'];
const navbarLinks = document.querySelectorAll('.navbar-link');

function highlightNav() {
  let index = sectionIds.length - 1;
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const section = document.getElementById(sectionIds[i]);
    if (section && window.scrollY + 80 >= section.offsetTop) {
      index = i;
      break;
    }
  }
  navbarLinks.forEach((link, i) => {
    link.classList.toggle('active', i === index);
  });
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.navbar-link').forEach((link, i) => {
      link.classList.toggle('active', i === index);
    });
  }
}

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);
