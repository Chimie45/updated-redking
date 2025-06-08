// Portfolio Page Specific JavaScript

// Gallery Modal Functions
function openGalleryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) { 
        console.error('Gallery modal not found:', modalId); 
        return; 
    }
    
    modal.style.removeProperty('display');
    modal.classList.add('modal--is-open');
    document.body.style.overflow = 'hidden';
    
    // Reset modal scroll position
    setTimeout(() => {
        if(modal.contains(document.activeElement)) modal.blur();
        modal.scrollTop = 0;
        const content = modal.querySelector('.gallery-modal-content');
        if(content) content.scrollTop = 0;
    }, 0);
}

function closeGalleryModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--is-open');
        modal.style.display = 'none';
    }
    checkAndRestoreScroll();
}

// Gallery Filter Functionality
function initializeGalleryFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterTabs.length === 0 || galleryItems.length === 0) return;
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterGalleryItems(filter, galleryItems);
        });
    });
}

function filterGalleryItems(filter, items) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            // Show item
            item.classList.remove('hidden');
            item.style.display = 'block';
            
            // Add fade-in animation
            setTimeout(() => {
                item.classList.add('fade-in');
            }, 50);
        } else {
            // Hide item
            item.classList.add('hidden');
            item.classList.remove('fade-in');
            
            // Hide after transition
            setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Re-trigger intersection observer for newly visible items
    if (typeof animatedElementsObserver !== 'undefined') {
        items.forEach(item => {
            if (!item.classList.contains('hidden') && !item.classList.contains('element--in-view')) {
                animatedElementsObserver.observe(item);
            }
        });
    }
}

// Gallery Item Animation on Scroll
function initializeGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (typeof animatedElementsObserver !== 'undefined' && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            animatedElementsObserver.observe(item);
        });
    }
}

// Close gallery modals when clicking outside of content
function setupGalleryModalCloseEvents() {
    // Close modals when clicking outside of content (on the overlay)
    window.addEventListener('click', function(event) {
        if (event.target.matches('.gallery-modal')) {
            if (event.target.classList.contains('modal--is-open')) {
                const modalId = event.target.id;
                if (modalId) {
                    closeGalleryModal(modalId);
                }
            }
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.gallery-modal.modal--is-open').forEach(modal => {
                const modalId = modal.id;
                closeGalleryModal(modalId);
            });
        }
    });
}

// Lazy loading for gallery images
function initializeGalleryLazyLoading() {
    const lazyImages = document.querySelectorAll('.gallery-item img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Gallery Search Functionality (optional enhancement)
function initializeGallerySearch() {
    const searchInput = document.getElementById('gallerySearch');
    if (!searchInput) return;
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        galleryItems.forEach(item => {
            const title = item.querySelector('.gallery-item-info h4').textContent.toLowerCase();
            const description = item.querySelector('.gallery-item-info p').textContent.toLowerCase();
            
            if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        });
    });
}

// Portfolio page specific form handling
function initializePortfolioForms() {
    // Newsletter form for portfolio page
    const portfolioNewsletterForm = document.getElementById('newsletterFormPortfolioPage');
    if (portfolioNewsletterForm) {
        portfolioNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = formData.get('email');
            const messageDiv = this.querySelector('.form-submission-feedback');
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage(messageDiv, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showFormMessage(messageDiv, 'Thank you for subscribing to our newsletter!', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

// Utility function for form messages
function showFormMessage(messageDiv, message, type) {
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = `form-submission-feedback ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Gallery Statistics Animation (for gallery items with numbers)
function animateGalleryStats() {
    const statNumbers = document.querySelectorAll('.gallery-stat-number');
    
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Enhanced gallery grid layout (Masonry-like effect for different sized items)
function initializeMasonryLayout() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    // Check if CSS Grid supports masonry (future enhancement)
    if (CSS.supports('grid-template-rows', 'masonry')) {
        galleryGrid.style.gridTemplateRows = 'masonry';
    }
}

// Portfolio page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all portfolio-specific functionality
    initializeGalleryFilter();
    initializeGalleryAnimations();
    setupGalleryModalCloseEvents();
    initializeGalleryLazyLoading();
    initializeGallerySearch();
    initializePortfolioForms();
    animateGalleryStats();
    initializeMasonryLayout();
    
    // Set initial filter state
    const defaultFilter = document.querySelector('.filter-tab.active');
    if (defaultFilter) {
        const filter = defaultFilter.getAttribute('data-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        filterGalleryItems(filter, galleryItems);
    }
    
    // Add smooth scrolling for portfolio page internal links
    const portfolioAnchors = document.querySelectorAll('a[href*="#gallery"], a[href*="#featured-portfolio"]');
    portfolioAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.getElementById(href.substring(1));
                if (targetElement) {
                    const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    console.log('Portfolio page initialized successfully');
});

// Portfolio performance tracking (optional analytics)
function trackGalleryInteraction(action, category, item) {
    // This can be connected to Google Analytics or other tracking services
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'Gallery',
            'event_label': `${category} - ${item}`,
        });
    }
    
    console.log(`Gallery interaction: ${action} on ${category} - ${item}`);
}

// Add click tracking to gallery items
document.addEventListener('click', function(e) {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const category = galleryItem.getAttribute('data-category');
        const title = galleryItem.querySelector('.gallery-item-info h4')?.textContent || 'Unknown';
        trackGalleryInteraction('click', category, title);
    }
});

// Intersection Observer for gallery item view tracking
function initializeGalleryViewTracking() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const viewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const category = item.getAttribute('data-category');
                const title = item.querySelector('.gallery-item-info h4')?.textContent || 'Unknown';
                trackGalleryInteraction('view', category, title);
                viewObserver.unobserve(item);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    galleryItems.forEach(item => {
        viewObserver.observe(item);
    });
}

// Initialize view tracking after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeGalleryViewTracking, 1000); // Delay to avoid immediate triggers
});
