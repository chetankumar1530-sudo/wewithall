/* ============================================
   NexusAI - Complete JavaScript
   Theme Toggle, Navigation, Animations, 
   Accordions, Forms, Counters & More
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // 1. THEME SWITCHER
  // ============================================
  function initThemeSwitcher() {
    const themeStyle = document.getElementById('theme-style');
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeStyle || !themeToggle) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('nexusai-theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = themeStyle.href.includes('theme-light.css') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('nexusai-theme', newTheme);
    });

    function applyTheme(theme) {
      if (theme === 'dark') {
        themeStyle.href = 'theme-dark.css';
      } else {
        themeStyle.href = 'theme-light.css';
      }
    }
  }

  // ============================================
  // 2. NAVIGATION
  // ============================================
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const backToTopBtn = document.getElementById('backToTop');

    // Scroll effects
    if (navbar) {
      window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (backToTopBtn) {
          if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
        }
      });
    }

    // Hamburger menu
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      // Close menu when clicking a link
      const allNavLinks = navLinks.querySelectorAll('a');
      allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    }

    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ============================================
  // 3. SMOOTH SCROLLING
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!targetId || targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // 4. SCROLL REVEAL ANIMATIONS
  // ============================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ============================================
  // 5. COUNTER ANIMATION
  // ============================================
  function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    if (statNumbers.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          
          if (target && !el.classList.contains('counted')) {
            el.classList.add('counted');
            animateCounter(el, target);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        
        if (step >= steps) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, duration / steps);
    }
  }

  // ============================================
  // 6. SYLLABUS ACCORDION
  // ============================================
  function initSyllabusAccordion() {
    const syllabusModules = document.querySelectorAll('.syllabus-module');
    
    if (syllabusModules.length === 0) return;

    syllabusModules.forEach(module => {
      const header = module.querySelector('.syllabus-module__header');
      if (!header) return;

      header.addEventListener('click', () => {
        // Optional: Close other modules
        // syllabusModules.forEach(other => {
        //   if (other !== module) other.classList.remove('active');
        // });
        
        module.classList.toggle('active');
      });
    });
  }

  // ============================================
  // 7. LAUNCHPAD ACCORDION
  // ============================================
  function initLaunchpadAccordion() {
    const launchpadPhases = document.querySelectorAll('.launchpad-phase');
    
    if (launchpadPhases.length === 0) return;

    launchpadPhases.forEach(phase => {
      const header = phase.querySelector('.launchpad-phase__header');
      if (!header) return;

      header.addEventListener('click', () => {
        // Close other phases (accordion behavior)
        launchpadPhases.forEach(other => {
          if (other !== phase) {
            other.classList.remove('active');
          }
        });
        
        // Toggle current phase
        phase.classList.toggle('active');
      });
    });
  }

  // ============================================
  // 8. FAQ ACCORDION
  // ============================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        // Close other FAQ items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });
        
        // Toggle current
        item.classList.toggle('active');
      });
    });
  }

  // ============================================
  // 9. CONTACT FORM
  // ============================================
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const phoneField = document.getElementById('phone');
      const interestField = document.getElementById('interest');
      const messageField = document.getElementById('message');
      
      // Validate required fields
      const name = nameField?.value.trim();
      const email = emailField?.value.trim();
      const interest = interestField?.value;
      
      // Check required fields
      if (!name) {
        showFormError(nameField, 'Please enter your full name');
        return;
      }
      
      if (!email) {
        showFormError(emailField, 'Please enter your email address');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormError(emailField, 'Please enter a valid email address');
        return;
      }
      
      if (!interest) {
        showFormError(interestField, 'Please select your interest');
        return;
      }
      
      // Clear any previous errors
      clearFormErrors();
      
      // Build response message based on interest
      let responseMessage = `Thank you, ${name}! `;
      
      switch(interest) {
        case 'placement':
          responseMessage += 'Our placement team will contact you within 24 hours to discuss your career goals and job preparation.';
          break;
        case 'startup':
          responseMessage += 'Our startup coach will reach out within 24 hours to discuss your business idea and the incorporation process.';
          break;
        case 'both':
          responseMessage += 'A career counselor will call you within 24 hours to help you decide between placement and startup paths.';
          break;
        case 'syllabus':
          responseMessage += 'We\'ve noted your request for the detailed syllabus. Check your email in the next few minutes!';
          break;
        default:
          responseMessage += 'We\'ll contact you within 24 hours to discuss how we can help you achieve your goals.';
      }
      
      // Show success message
      alert(responseMessage);
      
      // Reset form
      contactForm.reset();
      
      // Remove any error styling
      clearFormErrors();
    });

    function showFormError(field, message) {
      if (!field) return;
      
      // Remove previous error styling
      clearFormErrors();
      
      // Add error styling
      field.style.borderColor = '#ef4444';
      field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      
      // Show error message
      alert(message);
      
      // Focus the field
      field.focus();
      
      // Remove error styling after 3 seconds
      setTimeout(() => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      }, 3000);
    }

    function clearFormErrors() {
      const formFields = contactForm.querySelectorAll('input, select, textarea');
      formFields.forEach(field => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      });
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  // ============================================
  // 10. NEWSLETTER FORM
  // ============================================
  function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput?.value.trim();
      
      if (!email) {
        alert('Please enter your email address.');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      alert('Thank you for subscribing! You\'ll receive our latest updates and resources.');
      emailInput.value = '';
    });

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  // ============================================
  // 11. PRODUCT FILTERS (Products Page)
  // ============================================
  function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length === 0 || productCards.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter products
        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            // Add fade-in animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'all 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================
  // 12. PRODUCT MODALS (Products Page)
  // ============================================
  function initProductModals() {
    const modalTriggers = document.querySelectorAll('.open-modal');
    const modals = document.querySelectorAll('.product-modal');
    
    if (modalTriggers.length === 0 || modals.length === 0) return;

    // Open modal
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
      });
    });

    // Close modal
    modals.forEach(modal => {
      // Close button
      const closeBtn = modal.querySelector('.product-modal__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          closeModal(modal);
        });
      }
      
      // Click outside to close
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
      
      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    });

    function closeModal(modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  // ============================================
  // 13. TESTIMONIAL SLIDER
  // ============================================
  function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    
    if (!track || !prevBtn || !nextBtn) return;

    const slides = track.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    
    // Set initial position
    updateSlidePosition();
    
    // Auto-advance every 5 seconds
    let autoAdvance = setInterval(nextSlide, 5000);

    // Previous button
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoAdvance();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoAdvance();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoAdvance();
      }
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlidePosition();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
    }

    function updateSlidePosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      track.style.transition = 'transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
    }

    function resetAutoAdvance() {
      clearInterval(autoAdvance);
      autoAdvance = setInterval(nextSlide, 5000);
    }
  }

  // ============================================
  // 14. SUCCESS STORIES TABS (If needed)
  // ============================================
  function initSuccessTabs() {
    const tabs = document.querySelectorAll('.success-tab');
    const contents = document.querySelectorAll('.success-content');
    
    if (tabs.length === 0 || contents.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active to clicked tab
        tab.classList.add('active');
        
        // Hide all content
        contents.forEach(c => c.classList.remove('active'));
        
        // Show target content
        const targetId = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(`${targetId}-content`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // ============================================
  // 15. PRICING TOGGLE (Monthly/Yearly)
  // ============================================
  function initPricingToggle() {
    const pricingBtns = document.querySelectorAll('.pricing-toggle-btn');
    const pricingPrices = document.querySelectorAll('.pricing-price');
    
    if (pricingBtns.length === 0 || pricingPrices.length === 0) return;

    pricingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        pricingBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const period = btn.getAttribute('data-period');
        
        // Update prices
        pricingPrices.forEach(priceEl => {
          const monthly = priceEl.getAttribute('data-monthly');
          const yearly = priceEl.getAttribute('data-yearly');
          
          if (period === 'yearly' && yearly && yearly !== 'Custom') {
            priceEl.innerHTML = yearly + '<span>/yr</span>';
          } else if (period === 'monthly' && monthly && monthly !== 'Custom') {
            priceEl.innerHTML = monthly + '<span>/mo</span>';
          }
        });
      });
    });
  }

  // ============================================
  // 16. HERO CANVAS PARTICLES
  // ============================================
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = -1000;
    let mouseY = -1000;

    function resizeCanvas() {
      const hero = document.getElementById('hero');
      if (hero) {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        createParticles();
      }
    }

    function createParticles() {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 14000),
        100
      );
      
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          originalOpacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 150;

        if (distToMouse < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distToMouse) / mouseRadius;
          p.x -= Math.cos(angle) * force * 2;
          p.y -= Math.sin(angle) * force * 2;
          p.opacity = Math.min(0.9, p.originalOpacity + force * 0.5);
        } else {
          p.opacity = p.originalOpacity;
        }

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 234, 212, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const maxDist = 130;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    }

    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Touch tracking
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 250);
    });

    // Initialize
    resizeCanvas();
    drawParticles();
  }

  // ============================================
  // 17. ACTIVE NAV LINK HIGHLIGHTING
  // ============================================
  function initActiveNavHighlight() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove any existing active class
      link.classList.remove('active');
      
      // Check if this link matches current page
      if (href === currentPath || 
          (href !== '#' && currentPath.includes(href)) ||
          (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html')))) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // 18. LAZY LOADING IMAGES
  // ============================================
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      return;
    }
    
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }

  // ============================================
  // 19. ERROR HANDLING FOR IMAGES
  // ============================================
  function initImageFallback() {
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        const img = e.target;
        const placeholder = img.nextElementSibling;
        
        if (placeholder && placeholder.classList.contains('team-card__image-placeholder')) {
          img.style.display = 'none';
          placeholder.style.display = 'flex';
        } else if (placeholder && placeholder.classList.contains('success-card__placeholder')) {
          img.style.display = 'none';
          placeholder.style.display = 'flex';
        }
      }
    }, true);
  }

  // ============================================
  // 20. INITIALIZATION
  // ============================================
  function init() {
    initThemeSwitcher();
    initNavigation();
    initSmoothScroll();
    initScrollReveal();
    initCounters();
    initSyllabusAccordion();
    initLaunchpadAccordion();
    initFaqAccordion();
    initContactForm();
    initNewsletterForm();
    initProductFilters();
    initProductModals();
    initTestimonialSlider();
    initSuccessTabs();
    initPricingToggle();
    initHeroCanvas();
    initActiveNavHighlight();
    initLazyLoading();
    initImageFallback();
  }

  // Start everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();