// Throttle utility function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeWebsite();
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

function initializeWebsite() {
    initializeLoadingScreen();
    initializeParticles();
    initializeSmoothScrolling();
    initializeScrollWheelNavigation();
    initializeInteractiveElements();
    initializeFormHandling();
    initializeHeaderScroll();
    initializeNavigationHighlight();
    initializeHeroParallax();
    initializeCardsTilt();
    initializeDarkModeToggle();
    initializeScrollAnimations();
    initializePortfolioFilter();
    initializeFAQAccordion();
    updateCurrentYear();
}

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

function initializeParticles() {
    if (typeof particlesJS === 'undefined') return;

    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeScrollWheelNavigation() {
    let isScrolling = false;
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    function getCurrentSectionIndex() {
        let index = 0;
        let minDiff = Infinity;
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            const diff = Math.abs(rect.top);
            if (diff < minDiff) {
                minDiff = diff;
                index = i;
            }
        });
        return index;
    }

    window.addEventListener('wheel', throttle((e) => {
        if (isScrolling) return;
        isScrolling = true;

        const currentSectionIndex = getCurrentSectionIndex();
        let targetIndex = currentSectionIndex;

        if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            targetIndex++;
        } else if (e.deltaY < 0 && currentSectionIndex > 0) {
            targetIndex--;
        }

        sections[targetIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }, 200));
}

function initializeInteractiveElements() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .portfolio-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMouseMove);
        card.addEventListener('mouseleave', handleCardMouseLeave);
    });

    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', handleButtonHover);
        btn.addEventListener('mouseleave', handleButtonLeave);
        btn.addEventListener('click', handleButtonClickAnimation);
    });
}

function handleCardMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * 10;
    const rotateY = -(x / rect.width) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    card.style.transition = 'transform 0.1s ease-out';
}

function handleCardMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.transition = 'transform 0.3s ease-out';
}

function handleButtonHover(e) {
    const btn = e.currentTarget;
    btn.style.transform = 'translateY(-3px) scale(1.02)';
    btn.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
}

function handleButtonLeave(e) {
    const btn = e.currentTarget;
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = 'none';
}

function handleButtonClickAnimation(e) {
    const btn = e.currentTarget;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
}

/* ======================
   FORMULARIO DE CONTACTO
   (Con envío/redirección a WhatsApp)
   ====================== */

function initializeFormHandling() {
    console.log('Buscando formulario...');
    const contactForm = document.querySelector('.contact-form');
    console.log('Formulario encontrado:', contactForm);
    if (!contactForm) {
        console.error('Formulario no encontrado. Verifica que exista <form class="contact-form"> en el HTML.');
        return;
    }

    // Forzar visibilidad de los campos del formulario (para arreglar el problema de que no se veía)
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea, .btn-submit');
    inputs.forEach(input => {
        input.style.display = 'block';
        input.style.visibility = 'visible';
        input.style.opacity = '1';
        input.style.width = '100%';
        input.style.padding = '1rem';
        input.style.marginBottom = '1rem';
        input.style.background = 'rgba(255, 255, 255, 0.1)';
        input.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        input.style.borderRadius = '8px';
        input.style.color = 'white';
        input.style.fontSize = '1rem';
        input.style.boxSizing = 'border-box';
    });

    const labels = contactForm.querySelectorAll('.form-label');
    labels.forEach(label => {
        label.style.display = 'block';
        label.style.color = '#ccc';
        label.style.marginBottom = '0.5rem';
        label.style.fontWeight = '600';
    });

    const submitBtn = contactForm.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.style.background = 'linear-gradient(45deg, #ffd700, #00ffff, #ff073a, #bc13fe)';
        submitBtn.style.cursor = 'pointer';
        submitBtn.style.transition = 'transform 0.3s ease';
        submitBtn.addEventListener('mouseenter', () => submitBtn.style.transform = 'translateY(-2px)');
        submitBtn.addEventListener('mouseleave', () => submitBtn.style.transform = 'translateY(0)');
    }

    // Envío del formulario redirigiendo a WhatsApp
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        const submitButton = this.querySelector('.btn-submit');
        const originalText = submitButton ? submitButton.innerHTML : '';

        if (submitButton) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>Abriendo WhatsApp...';
            submitButton.disabled = true;
        }

        // 👉 Reemplaza este número por TU número en formato internacional (sin +, sin espacios)
        // Ejemplo México: +52 1 55 1234 5678  ->  5215512345678
        const phoneNumber = '5215658491918';

        const whatsappMessage = `Hola, soy ${name}.
Mi correo es: ${email}

Mensaje:
${message}

(Enviado desde el formulario de tu sitio web)`;

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Abrir WhatsApp (app en móvil o WhatsApp Web en escritorio)
        window.open(whatsappURL, '_blank');

        showNotification('Te estamos redirigiendo a WhatsApp 😊', 'success');

        // Restaurar botón y limpiar formulario después de unos segundos
        setTimeout(() => {
            if (submitButton) {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
            contactForm.reset();
        }, 3000);
    });

    // Check específico para contacto.html
    if (document.body.classList.contains('page-contacto') || window.location.pathname.includes('contacto.html')) {
        console.log('Inicializando formulario en contacto.html');
    }
}

/* ======================
   HEADER Y NAVEGACIÓN
   ====================== */

function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    // Solo cambiar el fondo, sin ocultar
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        header.style.background = currentScrollY > 100 ? 'rgba(0, 0, 0, 0.85)' : 'transparent';
        header.style.backdropFilter = currentScrollY > 100 ? 'blur(10px)' : 'none';
    }, 100));
}

function initializeNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
        let currentSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);

            if (distance < minDistance && rect.top < window.innerHeight * 0.6) {
                minDistance = distance;
                currentSection = section;
            }
        });

        if (!currentSection) return;

        const id = currentSection.getAttribute('id');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNav, 150));
    updateActiveNav();
}

function initializeHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const layers = hero.querySelectorAll('.parallax-layer');
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
        });
    });

    hero.addEventListener('mouseleave', () => {
        const layers = hero.querySelectorAll('.parallax-layer');
        layers.forEach(layer => {
            layer.style.transform = 'translate3d(0,0,0)';
        });
    });
}

function initializeCardsTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMouseMove);
        card.addEventListener('mouseleave', handleCardMouseLeave);
    });
}

/* ======================
   DARK MODE
   ====================== */

function initializeDarkModeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        body.classList.toggle('dark-theme', savedTheme === 'dark');
    }

    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

/* ======================
   SCROLL ANIMATIONS
   ====================== */

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!('IntersectionObserver' in window) || !animatedElements.length) {
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animatedElements.forEach(el => observer.observe(el));
}

/* ======================
   PORTAFOLIO / FILTRO
   ====================== */

function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category')?.split(',') || [];
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ======================
   FAQ ACORDEÓN
   ====================== */

function initializeFAQAccordion() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            items.forEach(i => {
                i.classList.remove('open');
                const a = i.querySelector('.faq-answer');
                if (a) {
                    a.style.maxHeight = null;
                }
            });

            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ======================
   UTILIDADES GENERALES
   ====================== */

function updateCurrentYear() {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Sistema de notificaciones flotantes
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification-container');
    if (existing) {
        existing.remove();
    }

    const container = document.createElement('div');
    container.className = `notification-container notification-${type}`;

    const icon = document.createElement('i');
    icon.className = `fas ${getNotificationIcon(type)}`;

    const text = document.createElement('span');
    text.textContent = message;

    const content = document.createElement('div');
    content.className = 'notification-content';
    content.appendChild(icon);
    content.appendChild(text);

    container.appendChild(content);
    document.body.appendChild(container);

    setTimeout(() => {
        container.classList.add('visible');
    }, 50);

    setTimeout(() => {
        container.classList.remove('visible');
        setTimeout(() => container.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle' };
    return icons[type] || 'fa-info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #00ff00, #00c000)',
        error: 'linear-gradient(135deg, #ff0000, #c00000)',
        warning: 'linear-gradient(135deg, #ffd700, #ff9900)'
    };
    return colors[type] || 'linear-gradient(135deg, #00ffff, #0077ff)';
}

// Add notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
.notification-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
}
.notification-container.visible {
    transform: translateY(0);
    opacity: 1;
}
.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
}
.notification-content i {
    font-size: 1.25rem;
}
`;
document.head.appendChild(styleSheet);
// --- Mobile menu toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileBtn || !mobileMenu) return; // si no existe en esa página, no hace nada

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('show-menu');
    });

    // Cerrar menú al hacer clic en un link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show-menu');
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const previews = document.querySelectorAll(".branding-image-preview");
    const modal = document.getElementById("imageModal");
    const modalImg = modal ? modal.querySelector("img") : null;
    const closeBtn = modal ? modal.querySelector(".image-modal-close") : null;
    const prevBtn = modal ? modal.querySelector(".image-modal-nav.prev") : null;
    const nextBtn = modal ? modal.querySelector(".image-modal-nav.next") : null;

    if (!modal || !modalImg || !closeBtn) return;

    let gallery = [];     // aquí guardamos las imágenes de la galería activa
    let currentIndex = 0; // índice actual

    function showImage(index) {
        if (!gallery.length) return;
        currentIndex = (index + gallery.length) % gallery.length; // loop
        modalImg.src = gallery[currentIndex];
    }

    previews.forEach(preview => {
        preview.addEventListener("click", () => {
            // Si tiene data-images => es carrusel
            if (preview.dataset.images) {
                try {
                    gallery = JSON.parse(preview.dataset.images);
                } catch (e) {
                    console.error("Error leyendo data-images:", e);
                    gallery = [];
                }
            } else if (preview.dataset.img) {
                // Solo una imagen (modo viejo)
                gallery = [preview.dataset.img];
            } else {
                gallery = [];
            }

            if (!gallery.length) return;

            showImage(0);
            modal.classList.add("active");
            function showImage(index) {
    if (!gallery.length) return;
    currentIndex = (index + gallery.length) % gallery.length;
    console.log("Mostrando:", gallery[currentIndex]); // 👀
    modalImg.src = gallery[currentIndex];
}

        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    // Navegación con teclas ← →
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;

        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
        if (e.key === "Escape") modal.classList.remove("active");
    });
});



document.addEventListener("click", (e) => {
  const preview = e.target.closest(".branding-image-preview");
  if (!preview) return;

  const src = preview.dataset.img;
  // aquí abre tu modal con src
});











document.addEventListener("DOMContentLoaded", () => {
  // Modo preview: agrega ?preview=1 para ver el sitio antes del lanzamiento
  if (new URLSearchParams(location.search).has("preview")) return;

  // 1 de enero 2026 00:00 CDMX
  const LAUNCH_AT = new Date("2026-01-01T00:00:00-06:00");
  if (new Date() >= LAUNCH_AT) return;

  const overlay = document.createElement("div");
  overlay.className = "dp-launch";
  overlay.innerHTML = `
    <section class="dp-card" role="dialog" aria-modal="true" aria-label="Sitio en construcción">
      <div class="dp-top">
        <div class="dp-badge"><span class="dp-dot"></span> EN CONSTRUCCIÓN</div>
        <div class="dp-date">Apertura automática: <strong>01/01/2026</strong> (CDMX)</div>
      </div>

      <h1 class="dp-title"><span>DARKPONY</span></h1>
      <p class="dp-sub">Estamos preparando el lanzamiento. Vuelve el <strong>1 de enero</strong>.</p>

      <div class="dp-grid">
        <div>
          <div class="dp-count" aria-label="Cuenta regresiva">
            <div class="dp-tile"><div class="dp-num" data-dp="d">--</div><div class="dp-lbl">Días</div></div>
            <div class="dp-tile"><div class="dp-num" data-dp="h">--</div><div class="dp-lbl">Horas</div></div>
            <div class="dp-tile"><div class="dp-num" data-dp="m">--</div><div class="dp-lbl">Min</div></div>
            <div class="dp-tile"><div class="dp-num" data-dp="s">--</div><div class="dp-lbl">Seg</div></div>
          </div>
        </div>

        <aside class="dp-side">
          <div style="color: var(--color-text-secondary);">
            ✨ Nuevo sitio, nuevo vibe.<br/>
            <span style="opacity:.8">Gracias por tu paciencia.</span>
          </div>
          <div class="dp-actions">
            <a class="dp-btn dp-btn--primary" href="#" onclick="return false;">Apertura 1 de Enero</a>
            
          </div>
        </aside>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("dp-no-scroll");

  const elD = overlay.querySelector('[data-dp="d"]');
  const elH = overlay.querySelector('[data-dp="h"]');
  const elM = overlay.querySelector('[data-dp="m"]');
  const elS = overlay.querySelector('[data-dp="s"]');

  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = new Date();
    if (now >= LAUNCH_AT) {
      overlay.remove();
      document.body.classList.remove("dp-no-scroll");
      return;
    }

    const diff = LAUNCH_AT - now;
    const total = Math.floor(diff / 1000);

    const days = Math.floor(total / (3600 * 24));
    const hours = Math.floor((total % (3600 * 24)) / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    elD.textContent = String(days);
    elH.textContent = pad(hours);
    elM.textContent = pad(mins);
    elS.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
});
