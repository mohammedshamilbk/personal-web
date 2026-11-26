/* ==========================================================================
   Mohammed Shamil - Portfolio & Business Hub Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollSpy();
  initHero4KCanvas();
  init3DParallaxTilt();
});

/* ==========================================================================
   THEME TOGGLER (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
}

/* ==========================================================================
   NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  mobileToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (isActive) {
      icon.className = 'fa-solid fa-xmark';
      document.body.style.overflow = 'hidden';
    } else {
      icon.className = 'fa-solid fa-bars';
      document.body.style.overflow = '';
    }
  });

  // Close Mobile Nav on Click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
      document.body.style.overflow = '';
    });
  });
}

// ScrollSpy Active Section Highlighting
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   PROJECT FILTERING (Software Solutions)
   ========================================================================== */
function filterProjects(category) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==========================================================================
   CASE STUDY MODAL DETAILS
   ========================================================================== */
const caseStudyData = {
  pos: {
    title: "Enterprise Retail POS System",
    subtitle: "High-Performance Retail Point-Of-Sale Application",
    description: "A comprehensive enterprise POS solution that automates retail checkout, prints instant thermal receipts, and manages real-time stock balances across desktop terminals.",
    tech: ["Java Swing", "Python 3", "MySQL", "SQLite", "ReportLab PDF"],
    highlights: [
      "Instant barcode scanning & quick checkout pipeline",
      "Thermal receipt printing with auto sales invoice log",
      "Multi-user permission levels (Cashier vs Manager)",
      "Daily revenue breakdown & GST tax reporting"
    ],
    snippet: `def process_checkout(cart_items, tax_rate=0.18):\n    subtotal = sum(item.price * item.qty for item in cart_items)\n    tax = subtotal * tax_rate\n    total = subtotal + tax\n    db.commit_transaction(cart_items, total)\n    print_thermal_receipt(cart_items, subtotal, tax, total)\n    return total`
  },
  id: {
    title: "Digital ID & Document Verification",
    subtitle: "Encrypted Document & Verification Engine",
    description: "A secure digital verification suite engineered for identity authentication, document checksum validation, and encrypted storage.",
    tech: ["Python", "Cryptography AES", "SQLite", "Tkinter GUI"],
    highlights: [
      "SHA-256 document fingerprinting",
      "Tamper-proof encrypted database storage",
      "High-speed verification lookup under 50ms"
    ],
    snippet: `def verify_document_hash(doc_path, expected_hash):\n    hasher = hashlib.sha256()\n    with open(doc_path, 'rb') as f:\n        while chunk := f.read(8192):\n            hasher.update(chunk)\n    return hasher.hexdigest() == expected_hash`
  },
  qr: {
    title: "Branded QR Code Generator",
    subtitle: "Custom Logo Embedding Engine",
    description: "Generates high-resolution vector and raster QR codes featuring custom logo overlays while retaining 100% scanner readability.",
    tech: ["Python", "Pillow Image Lib", "JavaScript", "SVG Export"],
    highlights: [
      "Automated error correction level adjustment (H-Level)",
      "High-res PNG & SVG vector print output",
      "Custom brand color palette application"
    ],
    snippet: `def generate_branded_qr(data, logo_path, output_file):\n    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)\n    qr.add_data(data)\n    img = qr.make_image().convert('RGBA')\n    logo = Image.open(logo_path)\n    img.paste(logo, logo_position, logo)\n    img.save(output_file)`
  },
  inventory: {
    title: "Inventory Management Platform",
    subtitle: "Automated Stock & ERP Dashboard",
    description: "Comprehensive stock control system created to monitor inventory movements, track reorder thresholds, and provide sales velocity insight.",
    tech: ["Python", "Flask", "SQLAlchemy", "Chart.js"],
    highlights: [
      "Automated low-stock threshold email alerts",
      "Multi-category product variant & SKU matrix tracking",
      "Sales velocity analytics graphs"
    ],
    snippet: `class InventoryItem(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    name = db.Column(db.String(100), nullable=False)\n    stock_qty = db.Column(db.Integer, default=0)\n    min_reorder_level = db.Column(db.Integer, default=5)`
  },
  gst: {
    title: "Transaction & GST Management",
    subtitle: "Tax-Compliant Financial Ledger",
    description: "Financial accounting tool engineered to calculate GST tax brackets, generate tax invoices, and output fiscal compliance reports.",
    tech: ["Full-Stack JavaScript", "Python Backend", "SQL DB"],
    highlights: [
      "B2B and B2C invoice format support",
      "Automated tax ledger consolidation",
      "Exportable GSTR financial summaries"
    ],
    snippet: `function calculateGST(subtotal, ratePercent) {\n  const taxAmount = (subtotal * ratePercent) / 100;\n  const cgst = taxAmount / 2;\n  const sgst = taxAmount / 2;\n  return { subtotal, taxAmount, cgst, sgst, total: subtotal + taxAmount };\n}`
  }
};

function openCaseStudyModal(key) {
  const data = caseStudyData[key];
  if (!data) return;

  const contentContainer = document.getElementById('caseStudyContent');
  contentContainer.innerHTML = `
    <h3 style="font-size: 1.6rem; font-weight:800; color:var(--text-primary); margin-bottom:0.25rem;">${data.title}</h3>
    <div style="color:var(--accent-tech); font-weight:600; font-size:0.9rem; margin-bottom:1.25rem;">${data.subtitle}</div>
    
    <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">${data.description}</p>
    
    <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.75rem;">Key Architecture Highlights</h4>
    <ul style="margin-bottom:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
      ${data.highlights.map(h => `<li style="font-size:0.875rem; color:var(--text-secondary); display:flex; align-items:center; gap:0.5rem;"><i class="fa-solid fa-check" style="color:var(--accent-tech);"></i> ${h}</li>`).join('')}
    </ul>

    <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.75rem;">Core Code Snippet</h4>
    <pre style="background:#0f172a; border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); font-family:monospace; font-size:0.8rem; color:#38bdf8; overflow-x:auto; margin-bottom:1.5rem;"><code>${data.snippet}</code></pre>

    <button class="btn btn-primary" style="width:100%;" onclick="openConsultationModal()">Build Similar System for Your Enterprise</button>
  `;

  openModal('caseStudyModal');
}

/* ==========================================================================
   MODAL CONTROLLERS
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add backdrop click close
    if (!modal.dataset.hasListener) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modalId);
        }
      });
      modal.dataset.hasListener = 'true';
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openConsultationModal(topic) {
  openModal('consultationModal');
}

/* ==========================================================================
   FORM HANDLING & TOAST NOTIFICATIONS (REAL EMAIL DISPATCH VIA FORMSUBMIT)
   ========================================================================== */
const CONTACT_EMAIL = 'shamilmohammed926@gmail.com';

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('contactSuccessMsg');
  const errorMsg = document.getElementById('contactErrorMsg');

  if (successMsg) successMsg.style.display = 'none';
  if (errorMsg) errorMsg.style.display = 'none';

  const origBtnContent = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
  btn.disabled = true;

  const nameVal = document.getElementById('fullName')?.value || form.name?.value || '';
  const emailVal = document.getElementById('email')?.value || form.email?.value || '';
  const phoneVal = document.getElementById('phone')?.value || form.phone?.value || 'Not provided';
  const companyVal = document.getElementById('company')?.value || form.company?.value || 'Not specified';
  const interestVal = document.getElementById('interest')?.value || form.interest?.value || 'General Inquiry';
  const messageVal = document.getElementById('message')?.value || form.message?.value || '';

  const payload = {
    name: nameVal,
    email: emailVal,
    phone: phoneVal,
    company: companyVal,
    interest: interestVal,
    message: messageVal,
    _subject: `New Client Portfolio Inquiry: ${nameVal} (${interestVal})`,
    _template: 'table',
    _captcha: 'false'
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Delivered!';
      if (successMsg) {
        successMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent directly to Mohammed Shamil. We will reply within 24 hours.';
        successMsg.style.display = 'block';
      }
      showToast('Message sent successfully! Mohammed Shamil has been notified.', 'success');
      form.reset();

      setTimeout(() => {
        btn.innerHTML = origBtnContent;
        btn.disabled = false;
      }, 5000);
    } else {
      throw new Error(data.message || 'Form submission failed');
    }
  } catch (err) {
    console.error('Contact form dispatch error:', err);
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled = false;

    if (errorMsg) {
      const waMsg = encodeURIComponent(`Hi Mohammed Shamil, my name is ${nameVal}. I am interested in ${interestVal}. Requirements: ${messageVal}`);
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Inquiry: ' + interestVal)}&body=${encodeURIComponent('Name: ' + nameVal + '\nPhone: ' + phoneVal + '\nCompany: ' + companyVal + '\n\n' + messageVal)}`;
      errorMsg.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Network error sending directly. You can <a href="${mailtoLink}" style="color:#60a5fa; text-decoration:underline; font-weight:600;">Email directly</a> or message via <a href="https://wa.me/919495282744?text=${waMsg}" target="_blank" rel="noopener noreferrer" style="color:#34d399; text-decoration:underline; font-weight:600;">WhatsApp (+91 94952 82744)</a>.`;
      errorMsg.style.display = 'block';
    }
    showToast('Failed to deliver automatically. Please use direct Email or WhatsApp.', 'error');
  }
}

async function handleConsultationSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const origBtnContent = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booking...';
  btn.disabled = true;

  const nameVal = document.getElementById('consultName')?.value || '';
  const emailVal = document.getElementById('consultEmail')?.value || '';
  const dateVal = document.getElementById('consultDate')?.value || '';
  const topicVal = document.getElementById('consultTopic')?.value || 'Strategy Consultation';

  const payload = {
    name: nameVal,
    email: emailVal,
    preferred_date: dateVal,
    topic: topicVal,
    _subject: `1-on-1 Consultation Booking Request: ${nameVal} (${topicVal})`,
    _template: 'table',
    _captcha: 'false'
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));

    if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
      closeModal('consultationModal');
      showToast('Consultation request received! Mohammed Shamil has been notified.', 'success');
      form.reset();
    } else {
      throw new Error(data.message || 'Booking request failed');
    }
  } catch (err) {
    console.error('Consultation booking error:', err);
    closeModal('consultationModal');
    showToast('Consultation request saved! Feel free to WhatsApp us at +91 94952 82744', 'info');
  } finally {
    btn.innerHTML = origBtnContent;
    btn.disabled = false;
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconClass = 'fa-info-circle';
  if (type === 'success') iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-circle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${iconClass}" style="color:var(--accent-tech);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   4K HIGH-DPI PARTICLE & PHYSICS CANVAS ENGINE
   ========================================================================== */
function initHero4KCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 220 };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resizeCanvas() {
    width = canvas.parentElement.clientWidth || window.innerWidth;
    height = canvas.parentElement.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 9000), 110);
    const colors = [
      { r: 56, g: 189, b: 248 },
      { r: 16, g: 185, b: 129 },
      { r: 245, g: 158, b: 11 },
      { r: 236, g: 72, b: 153 },
      { r: 129, g: 140, b: 248 }
    ];

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: color,
        alpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        isDiamond: Math.random() > 0.8
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulseAngle += p.pulseSpeed;
      const currentRadius = p.radius + Math.sin(p.pulseAngle) * 0.7;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force * 3;
          p.y -= Math.sin(angle) * force * 3;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      const radGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius * 3);
      radGlow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`);
      radGlow.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius * 3, 0, Math.PI * 2);
      ctx.fillStyle = radGlow;
      ctx.fill();

      ctx.beginPath();
      if (p.isDiamond) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.pulseAngle);
        ctx.rect(-currentRadius, -currentRadius, currentRadius * 2, currentRadius * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.min(p.alpha + 0.2, 1)})`;
        ctx.fill();
        ctx.restore();
      } else {
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.min(p.alpha + 0.3, 1)})`;
        ctx.fill();
      }

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const beamAlpha = (1 - dist / 140) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${beamAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(render);
}

/* ==========================================================================
   INTERACTIVE 3D CARD PARALLAX TILT & SPECULAR GLARE ENGINE
   ========================================================================== */
function init3DParallaxTilt() {
  if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
    return;
  }
  const tiltCards = document.querySelectorAll(
    '.service-card, .project-card, .ceo-card'
  );

  tiltCards.forEach(card => {
    if (!card.querySelector('.card-specular-shine')) {
      const shine = document.createElement('div');
      shine.className = 'card-specular-shine';
      card.appendChild(shine);
    }

    const shine = card.querySelector('.card-specular-shine');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (shine) {
        shine.style.background = 'none';
      }
    });
  });
}
