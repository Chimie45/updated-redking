// Define the observer in the global scope so other scripts can access it.
let animatedElementsObserver;

// Portfolio modal functions
function openPortfolioModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Portfolio modal not found:', modalId); return; }
    const modalHeader = modal.querySelector('.portfolio-modal-header');
    const modalImg = modalHeader ? modalHeader.querySelector('img') : null;
    if (modalImg && modalImg.src && modalHeader) modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    
    modal.style.removeProperty('display'); // Remove inline display:none if present
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelectorAll('.metric-number').forEach(num => animateValue(num));
}
function closePortfolioModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--is-open');
        modal.style.display = 'none'; // Explicitly hide
    }
    checkAndRestoreScroll();
}

// Team Member Modal Functions
function openTeamModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Team modal not found:', modalId); return; }
    const modalHeader = modal.querySelector('.team-modal-header');
    const modalImg = modalHeader ? modalHeader.querySelector('.team-modal-img-main') : null;
    if (modalImg && modalImg.src && modalHeader) modalHeader.style.backgroundImage = `url(${modalImg.src})`;
    
    modal.style.removeProperty('display');
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelectorAll('.metric-number').forEach(num => animateValue(num));
}
function closeTeamModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--is-open');
        modal.style.display = 'none';
    }
    checkAndRestoreScroll();
}

// Job Modal Functions
function openJobModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Job modal not found:', modalId); return; }
    
    modal.style.removeProperty('display');
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    
    const form = modal.querySelector('.job-application-form');
    if (form) form.reset();
    const messageDiv = modal.querySelector('.form-submission-feedback');
    if (messageDiv) { messageDiv.style.display = 'none'; messageDiv.textContent = ''; messageDiv.className = 'form-submission-feedback'; }
    const charCounter = modal.querySelector('.char-counter');
    const messageTextarea = modal.querySelector('textarea[name="message"]');
    if (charCounter && messageTextarea && messageTextarea.maxLength) {
        charCounter.textContent = `${messageTextarea.maxLength} characters remaining`;
        charCounter.style.color = '#aaa';
    } else if (charCounter && messageTextarea) {
        charCounter.textContent = `Check character limit`;
    }
}
function closeJobModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--is-open');
        modal.style.display = 'none';
    }
    checkAndRestoreScroll();
}

// Service Detail Modal Functions
function openServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { console.error('Service modal not found:', modalId); return; }
    
    modal.style.removeProperty('display'); // Clear any inline display:none
    modal.classList.add('modal--is-open'); // Add class to trigger display:flex and transitions
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
       if(modal.contains(document.activeElement)) modal.blur();
       modal.scrollTop = 0;
       const content = modal.querySelector('.service-modal-content');
       if(content) content.scrollTop = 0;
    },0);
}
function closeServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--is-open');
        modal.style.display = 'none'; 
    }
    checkAndRestoreScroll();
}

// Function for Service Modal CTA buttons: Scroll to contact and close modal
function scrollToContactAndCloseModal(event, modalId) {
    event.preventDefault(); 

    if (modalId) {
        closeServiceModal(modalId);
    }

    const targetElement = document.getElementById('contact');
    if (targetElement) {
        const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    } else {
        console.error("Contact section with ID 'contact' not found for scrolling.");
    }
}


// Helper function to check if any modal is open and restore scroll if not
function checkAndRestoreScroll() {
    const anyModalOpen = document.querySelector('.modal--is-open'); // Simpler check for the open class
    if (!anyModalOpen) {
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside of content (on the overlay)
window.addEventListener('click', function(event) {
    if (event.target.matches('.portfolio-modal, .team-modal, .blog-modal, .job-modal, .service-detail-modal')) {
        if (event.target.classList.contains('modal--is-open')) { // Check for the open class
            const modalId = event.target.id;
            if (modalId) {
                if (event.target.classList.contains('portfolio-modal')) closePortfolioModal(modalId);
                else if (event.target.classList.contains('team-modal')) closeTeamModal(modalId);
                else if (event.target.classList.contains('blog-modal') && typeof closeBlogModal === 'function') closeBlogModal(modalId);
                else if (event.target.classList.contains('job-modal')) closeJobModal(modalId);
                else if (event.target.classList.contains('service-detail-modal')) closeServiceModal(modalId);
            }
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal--is-open').forEach(modal => { // Iterate over currently open modals
            const modalId = modal.id;
            if (modal.classList.contains('portfolio-modal')) closePortfolioModal(modalId);
            else if (modal.classList.contains('team-modal')) closeTeamModal(modalId);
            else if (modal.classList.contains('blog-modal') && typeof closeBlogModal === 'function') closeBlogModal(modalId);
            else if (modal.classList.contains('job-modal')) closeJobModal(modalId);
            else if (modal.classList.contains('service-detail-modal')) closeServiceModal(modalId);
        });
    }
});

// Contact form handling (omitted for brevity - no changes needed)
// ...

// Newsletter form handling (omitted for brevity - no changes needed)
// ...

// Job Application Form Handler (omitted for brevity - no changes needed)
// ...

// DOMContentLoaded for general initializations
document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target; img.src = img.dataset.src; img.removeAttribute('data-src'); observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    const navAnchors = document.querySelectorAll('nav .nav-links a[href*="#"], .logo[href*="#"], .cta-button[href*="#"]');
    const mobileMenuIcon = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    navAnchors.forEach(anchor => {
        if (!anchor.classList.contains('service-modal-cta')) { // Exclude service modal CTAs
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#') || href.startsWith(window.location.pathname + '#') || (href.startsWith('index.html#') && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')))) {
                    e.preventDefault();
                    const hash = href.substring(href.lastIndexOf('#') + 1);
                    const targetElement = document.getElementById(hash);

                    if (targetElement) {
                        if (navLinks && navLinks.classList.contains('nav-links--active')) {
                            navLinks.classList.remove('nav-links--active');
                            if (mobileMenuIcon) mobileMenuIcon.classList.remove('active');
                        }
                        const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                }
            });
        }
    });

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', function() { navLinks.classList.toggle('nav-links--active'); this.classList.toggle('active'); });
    }

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 100);
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    
    // Initialize the globally scoped observer
    animatedElementsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                entry.target.classList.add('element--in-view'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
        '.portfolio-card, .service-card, .about-text > *, .client-logos, ' +
        '.contact-info > *, .contact-form > *, ' +
        '.team-member-card, .job-posting, .mission-content'
        // IMPORTANT: .blog-card is removed from this initial query
    );
    elementsToObserve.forEach(el => {
        animatedElementsObserver.observe(el);
    });
});

// Animate stat numbers (omitted for brevity - no changes needed)
// ...

// Image error handling (omitted for brevity - no changes needed)
// ...
