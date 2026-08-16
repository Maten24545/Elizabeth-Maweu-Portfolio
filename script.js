// ===================================
// Elizabeth Maweu - Portfolio JavaScript
// ===================================

// === Dark Mode Toggle ===
function initThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    
    // Create theme toggle button and add to nav
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.setAttribute('title', 'Toggle dark/light mode');
    
    // Add toggle to navigation
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        const li = document.createElement('li');
        li.appendChild(themeToggle);
        navMenu.appendChild(li);
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    });
}

// === Mobile Navigation Toggle ===
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// === Sticky Navigation ===
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px var(--color-shadow)';
        } else {
            navbar.style.boxShadow = '0 2px 10px var(--color-shadow)';
        }
        
        lastScroll = currentScroll;
    });
}

// === Active Navigation Link ===
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.backgroundColor = '';
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--color-primary)';
                        link.style.backgroundColor = 'rgba(44, 95, 124, 0.08)';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Call once on load
}

// === Smooth Scroll ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for links that don't point to sections
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.philosophy-card, .timeline-item, .expertise-category, ' +
        '.programme-block, .framework-step, .stat-card, ' +
        '.value-card, .value-reason-card, .testimonial-card, .contact-card'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// === Back to Top Button ===
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px var(--color-shadow);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.backgroundColor = 'var(--color-accent)';
        backToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.backgroundColor = 'var(--color-primary)';
        backToTopBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// === Loading Animation ===
function initLoadingAnimation() {
    // Add fade-in class to hero on load
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        hero.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
}

// === Dynamic Year in Footer ===
function updateFooterYear() {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Elizabeth Maweu. All rights reserved.`;
    }
}

// === Form Validation (if contact form is added later) ===
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                console.log('Form is valid and ready to submit');
                // Add form submission logic here
            } else {
                console.log('Please fill in all required fields');
            }
        });
    });
}

// === Typing Effect for Hero (Optional Enhancement) ===
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (tagline && tagline.textContent) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 30;
        
        function type() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
}

// === Initialize All Functions ===
function init() {
    initThemeToggle();
    initMobileNav();
    initStickyNav();
    initActiveNav();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initLoadingAnimation();
    updateFooterYear();
    initFormValidation();
    // initTypingEffect(); // Uncomment if you want the typing effect
    
    console.log('Portfolio initialized successfully ✓');
}

// === Run on DOM Content Loaded ===
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// === Performance Optimization: Lazy Loading Images ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// === Accessibility: Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// === Print Styles Support ===
window.addEventListener('beforeprint', () => {
    console.log('Preparing document for printing...');
});

// === Export functions for testing (if needed) ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initThemeToggle,
        initMobileNav,
        initStickyNav,
        initSmoothScroll
    };
}
