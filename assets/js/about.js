// About Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all about page features
    initTimelineAnimations();
    initParallaxEffects();
    initPhilosophyCards();
});

// Timeline animations on scroll
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                const index = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const hero = document.querySelector('.about-hero');
    const heroContent = document.querySelector('.about-hero .hero-content');
    const particles = document.querySelector('.hero-particles');
    
    if (hero && heroContent && particles) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const scrollPercent = scrolled / heroHeight;
            
            if (scrollPercent <= 1) {
                // Parallax effect for hero content
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                
                // Faster parallax for particles
                particles.style.transform = `translateY(${scrolled * 0.5}px)`;
                
                // Fade out effect
                const opacity = 1 - scrollPercent;
                heroContent.style.opacity = opacity;
            }
        });
    }
}

// Enhanced philosophy cards interactions
function initPhilosophyCards() {
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    philosophyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle tilt effect
            this.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            this.style.transformStyle = 'preserve-3d';
            this.style.perspective = '1000px';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
        
        // Mouse move effect for dynamic tilt
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Enhanced scroll animations for other elements
window.addEventListener('scroll', function() {
    // Philosophy cards staggered animation
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
});

// Initialize elements with initial hidden state
document.addEventListener('DOMContentLoaded', function() {
    // Hide philosophy cards initially
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Crown animation enhancement
function enhanceCrownAnimation() {
    const crown = document.querySelector('.crown-animation i');
    if (crown) {
        crown.addEventListener('mouseenter', function() {
            this.style.animation = 'crownSpin 1s ease-in-out';
        });
        
        crown.addEventListener('animationend', function() {
            this.style.animation = 'crownFloat 3s ease-in-out infinite';
        });
    }
}

// Initialize crown enhancement
document.addEventListener('DOMContentLoaded', enhanceCrownAnimation);

// Smooth scroll enhancement for internal links
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
