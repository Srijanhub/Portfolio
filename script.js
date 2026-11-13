/**
 * Personal Portfolio - Srijan Halder
 * Bosscoder School of Technology - First Year Computer Science
 * Vanilla JavaScript: Theme Switcher, Smooth Navigation, Scrollspy,
 * Animated Progress Bars, Real Project Details Modals, and Client-Side Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initTheme();
  initNavigation();
  initScrollspy();
  initSkillBars();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initToastDemoButtons();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('bst_portfolio_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('bst_portfolio_theme', newTheme);

      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, '🌓');
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggleBtn && navMenu) {
    // Toggle mobile drawer
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggleBtn.classList.toggle('active', isOpen);
      navToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggleBtn.classList.remove('active');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu upon clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggleBtn.classList.remove('active');
          navToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

/* ==========================================================================
   3. ACTIVE SECTION HIGHLIGHT ON SCROLL (SCROLLSPY)
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.scrollY + 140; // Offset for navbar

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Initial check
}

/* ==========================================================================
   4. ANIMATED SKILL PROGRESS BARS (ON SCROLL)
   ========================================================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  if (!skillBars.length) return;

  const observerOptions = {
    threshold: 0.25
  };

  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetPercent = fill.getAttribute('data-progress');
        fill.style.width = `${targetPercent}%`;
        observer.unobserve(fill); // Animate once
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => skillsObserver.observe(bar));
}

/* ==========================================================================
   5. REAL PROJECT DETAILS MODAL (SRIJAN'S AUTHENTIC GITHUB REPOSITORIES)
   ========================================================================== */
const projectDetailsData = {
  mandate: {
    title: 'Mandate — Autonomous AI Agent Spending Firewall for PayPal',
    badge: 'Security & FinTech Engine',
    image: 'assets/projects/mandate.svg',
    github: 'https://github.com/Srijanhub/mandate',
    summary: 'When AI shopping agents call payment APIs, standard rails only check who holds the key, not whether human intent was respected. Mandate sits between autonomous agents and money movement as a deterministic, cryptographically auditable spending firewall integrated with PayPal Orders v2.',
    tech: ['Python 3.11+', 'FastAPI & Pydantic v2', 'PostgreSQL / SQLite', 'PayPal Orders v2', 'Cryptographic SHA-256 Ledger'],
    features: [
      'Deterministic Policy Core: Enforces hard price ceilings, merchant whitelists, and item category constraints before executing PayPal settlements.',
      'Hidden HTML/CSS Sanitizer: Strips zero-pixel tracking and hidden CSS prompt injections before models ingest product catalog pages.',
      'Cryptographic Intent Receipts: Issues tamper-proof, hash-chained receipts proving exactly what condition allowed the payment.',
      'Fail-Closed Posture: If advisory evaluation times out or anomalies are detected, the transaction safely flags or blocks.'
    ],
    learnings: 'Engineered a clean separation of concerns between deterministic policy execution and advisory LLM layers, with rigorous AST-enforced isolation and automated pytest coverage.'
  },
  listingforge: {
    title: 'ListingForge ⚡ — Open-Weight AI E-Commerce Listing Studio',
    badge: 'Open-Weight AI & E-Commerce',
    image: 'assets/projects/listingforge.svg',
    github: 'https://github.com/Srijanhub/ListingForge',
    summary: 'An e-commerce listing studio designed for independent vintage pickers, Etsy artisans, and eBay resellers. Converts raw product photos into top-ranking, platform-tailored listings in seconds using 100% open-weight vision & language models.',
    tech: ['JavaScript (Node.js)', 'Open-Weight Vision Models', 'Ollama / Local ONNX', 'CSS Grid & Flexbox', 'Etsy / eBay Tag Engine'],
    features: [
      'Multi-Platform Optimization: Generates compliant 13-tag lists for Etsy (<20 chars), Cassini-optimized eBay titles, and clean Shopify descriptions.',
      'Zero Marginal Cost: Runs on open-weight models locally, cutting listing generation costs from $0.25/item to $0.00.',
      'Dispute-Proof Notes: Uses vision models to detect micro-flaws, fabric distress, or vintage patina to protect sellers against return disputes.',
      'Time Savings: Reduces listing preparation time from 20 minutes to under 30 seconds per product.'
    ],
    learnings: 'Deepened practical knowledge of prompt engineering for structured JSON schemas, multimodal image processing, and building intuitive user workflows for non-technical merchants.'
  },
  touchgrass: {
    title: 'TouchGrass 🌱 — Outing & Weather Activity Engine',
    badge: 'Zero-Dependency Web App',
    image: 'assets/projects/touchgrass.svg',
    github: 'https://github.com/Srijanhub/TouchGrass',
    summary: 'A fast, client-side static web app that inspects current weather conditions and nearby geographic amenities to recommend a refreshing outdoor outing—or a curated indoor activity when rain is forecasted.',
    tech: ['Semantic HTML5', 'Vanilla JavaScript', 'OpenStreetMap Overpass API', 'Open-Meteo API', 'Leaflet.js'],
    features: [
      'Key-less Architecture: Runs with zero API keys and zero build dependencies.',
      'Local Privacy: All location coordinates and user preferences stay strictly in the client browser.',
      'Resilient Proxy Fallback: Includes an optional Vercel serverless proxy with multi-server Overpass failover for rate-limited public networks.',
      'Contextual Recommendations: Infers scenic, quiet, or fitness-oriented outings from map topology.'
    ],
    learnings: 'Mastered geolocation browser APIs, resilient HTTP fallback patterns across distributed public endpoints, and lean web architecture without build bloat.'
  },
  moneym8: {
    title: 'MoneyM8 (mywallet) — Offline-Ready Expense Tracker PWA',
    badge: 'Mobile-First PWA',
    image: 'assets/projects/moneym8.svg',
    github: 'https://github.com/Srijanhub/mywallet',
    summary: 'A sleek, mobile-optimized progressive web app engineered for students and developers to track expenses, set category limits, and sync records seamlessly without intrusive cloud servers or trackers.',
    tech: ['HTML5 Web App Manifest', 'CSS Custom Properties (Variables)', 'Vanilla JavaScript', 'Service Workers / Cache API', 'Encrypted Local Storage'],
    features: [
      'Installable PWA: Adds directly to mobile home screen with native app-like appearance and offline capability.',
      'Budget Insights: Real-time calculation of remaining monthly allowances and categorical breakdowns.',
      'Zero Tracker Footprint: Complete client-side security with no third-party analytics or external telemetry.',
      'Dark & Light Mode: High-contrast responsive styling designed with smooth micro-interactions.'
    ],
    learnings: 'Built hands-on experience with Progressive Web App service workers, offline cache manifests, and designing high-density financial UI layouts that look native on iOS and Android.'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-dynamic-content');
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

  if (!modal || !modalBody) return;

  // Open modal with project info
  viewDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-target');
      const data = projectDetailsData[projectId];

      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-meta-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="badge" style="background: var(--primary-light); color: var(--primary); font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">
            ${data.badge}
          </span>
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: var(--primary); font-weight: 600; text-decoration: underline;">
            GitHub Repository ↗
          </a>
        </div>
        <h3 class="modal-title" id="modal-title">${data.title}</h3>
        <img src="${data.image}" alt="${data.title}" class="modal-img">
        <p class="modal-desc">${data.summary}</p>
        
        <h4 class="modal-section-title">Technologies Used</h4>
        <div class="project-tags" style="margin-bottom: 16px;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <h4 class="modal-section-title">Key Architectural Features</h4>
        <ul class="modal-list">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h4 class="modal-section-title">Developer Learnings &amp; Takeaway</h4>
        <p class="modal-desc" style="background: var(--bg-surface-elevated); padding: 14px; border-radius: 8px; border-left: 3px solid var(--primary);">
          ${data.learnings}
        </p>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="flex: 1; text-align: center;">
            View Source Code on GitHub
          </a>
        </div>
      `;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close modal helper
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');
  const successAlert = document.getElementById('form-success-alert');
  const closeAlertBtn = document.getElementById('close-alert');

  if (!contactForm) return;

  // Real-time validation helpers
  function validateName() {
    const val = nameInput.value.trim();
    const group = nameInput.closest('.form-group');
    if (val.length < 2) {
      group.classList.add('has-error');
      nameInput.classList.add('is-invalid');
      nameInput.classList.remove('is-valid');
      return false;
    } else {
      group.classList.remove('has-error');
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
      return true;
    }
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    const group = emailInput.closest('.form-group');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(val)) {
      group.classList.add('has-error');
      emailInput.classList.add('is-invalid');
      emailInput.classList.remove('is-valid');
      return false;
    } else {
      group.classList.remove('has-error');
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
      return true;
    }
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    const group = messageInput.closest('.form-group');
    if (val.length < 10) {
      group.classList.add('has-error');
      messageInput.classList.add('is-invalid');
      messageInput.classList.remove('is-valid');
      return false;
    } else {
      group.classList.remove('has-error');
      messageInput.classList.remove('is-invalid');
      messageInput.classList.add('is-valid');
      return true;
    }
  }

  // Real-time feedback on blur/input
  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('is-invalid')) validateName();
  });

  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-invalid')) validateEmail();
  });

  messageInput.addEventListener('blur', validateMessage);
  messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('is-invalid')) validateMessage();
  });

  // Handle Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      showToast('Please check the required fields in the form.', '⚠️');
      return;
    }

    // Simulate submission state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';

      // Reset form fields
      contactForm.reset();
      [nameInput, emailInput, messageInput].forEach(inp => {
        inp.classList.remove('is-valid');
      });

      // Display clean success alert
      if (successAlert) {
        successAlert.style.display = 'flex';
      }

      showToast('Message validated & submitted successfully! ✨', '✅');
    }, 700);
  });

  if (closeAlertBtn && successAlert) {
    closeAlertBtn.addEventListener('click', () => {
      successAlert.style.display = 'none';
    });
  }
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATIONS HELPER & PREVIEW BUTTONS
   ========================================================================== */
let toastTimeout;
function showToast(message, icon = '💡') {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  const iconEl = toast.querySelector('.toast-icon');
  const msgEl = toast.querySelector('.toast-message');

  if (iconEl) iconEl.textContent = icon;
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function initToastDemoButtons() {
  const demoButtons = document.querySelectorAll('.demo-toast-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projName = btn.getAttribute('data-project-name') || 'Project';
      showToast(`Opening interactive preview for ${projName}...`, '🚀');
    });
  });
}
