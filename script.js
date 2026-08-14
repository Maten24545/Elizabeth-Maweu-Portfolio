// Smooth scroll for internal links (if any added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all grid items for animation
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Animate section numbers on scroll
const sectionNumbers = document.querySelectorAll('.section-number');
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            entry.target.style.animation = 'popIn 0.5s ease forwards';
        }
    });
}, { threshold: 0.5 });

sectionNumbers.forEach(num => {
    numberObserver.observe(num);
});

// Add pop-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.2) rotate(10deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for result numbers
const animateCounter = (element, target, duration = 2000) => {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPercent ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPercent ? '%' : '');
        }
    }, 16);
};

// Trigger counter animation when results come into view
const resultsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const resultNumbers = entry.target.querySelectorAll('.result-number');
            resultNumbers.forEach(num => {
                const text = num.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                num.textContent = '0' + (text.includes('%') ? '%' : '');
                setTimeout(() => animateCounter(num, number), 200);
            });
        }
    });
}, { threshold: 0.5 });

const resultsSection = document.querySelector('.section-results');
if (resultsSection) {
    resultsObserver.observe(resultsSection);
}

// Add hover effect to industry items
const industryItems = document.querySelectorAll('.industry-item');
industryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-2px) scale(1)';
    });
});

// Add hover effect to method cards
const methodCards = document.querySelectorAll('.method-card');
methodCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Print functionality
const addPrintStyles = () => {
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body {
                background: white;
            }
            .grid-item {
                page-break-inside: avoid;
                box-shadow: none;
                border: 1px solid #ddd;
            }
            .section-number {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            .hero-section {
                page-break-after: always;
            }
        }
    `;
    document.head.appendChild(printStyle);
};

addPrintStyles();

// Add subtle parallax effect to hero section
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrollTop < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`;
        heroSection.style.opacity = 1 - (scrollTop / window.innerHeight) * 0.5;
    }
    
    lastScrollTop = scrollTop;
}, false);

// Add stagger animation to philosophy items
const philosophyItems = document.querySelectorAll('.philosophy-item');
const philosophyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

philosophyItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    philosophyObserver.observe(item);
});

// Add stagger animation to service items
const serviceItems = document.querySelectorAll('.service-list li');
serviceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-10px)';
    item.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
});

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
            items.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.service-list').forEach(list => {
    serviceObserver.observe(list);
});

console.log('Elizabeth Maweu Portfolio loaded successfully! ✨');

