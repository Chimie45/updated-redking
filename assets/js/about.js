// About Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all about page features
    initScrollIndicator();
    initTimelineAnimations();
    initCountUpAnimations();
    initParallaxEffects();
    initPhilosophyCards();
});

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
                const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                const elementPosition = timelineSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });

        // Hide scroll indicator when user scrolls past hero
        window.addEventListener('scroll', function() {
            const heroHeight = document.querySelector('.about-hero').offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > heroHeight * 0.8) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

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

// Count-up animations for achievement numbers
function initCountUpAnimations() {
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                animateCountUp(element, target);
                countUpObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    achievementNumbers.forEach(number => {
        countUpObserver.observe(number);
    });
}

// Count-up animation function
function animateCountUp(element, target) {
    const duration = 2000; // 2 seconds
    const frameDuration = 16; // ~60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        // Easing function for smooth animation
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.round(target * easeOutExpo);
        
        // Format large numbers
        element.textContent = formatNumber(currentValue);
        
        if (frame === totalFrames) {
            clearInterval(counter);
            element.textContent = formatNumber(target);
        }
    }, frameDuration);
}

// Format numbers with appropriate suffixes
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
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
    
    // Mission section elements
    const missionElements = document.querySelectorAll('.mission-content > *');
    missionElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
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
    
    // Hide mission elements initially
    const missionElements = document.querySelectorAll('.mission-content > *');
    missionElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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

// Add crown spin keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes crownSpin {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(180deg); }
        100% { transform: translateY(0px) rotate(360deg); }
    }
`;
document.head.appendChild(style);

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

// Add subtle mouse movement effects to achievement cards
document.addEventListener('DOMContentLoaded', function() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-10px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });
});
