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

// A simple animation for numbers, for example, counting up
function animateValue(element) {
    if (!element) return;
    const finalValueText = element.textContent;
    let numericPart = finalValueText.replace(/[^\d.-]/g, '');
    if (numericPart === '') return;
    const numericValue = parseFloat(numericPart);
    if (isNaN(numericValue)) return;
    const suffix = finalValueText.substring(numericPart.length);
    const duration = 1500;
    const frameDuration = 16;
    const totalFrames = Math.max(1, duration / frameDuration);
    let increment = numericValue / totalFrames;

    if (numericValue === 0) {
        element.textContent = '0' + suffix;
        return;
    }
    if (Math.abs(increment) < 0.0001 && numericValue !== 0) {
      increment = (numericValue / Math.abs(numericValue)) * 0.001;
    }

    let currentValue = 0;
    const initialDisplayValue = (numericValue < 1 && numericValue > 0 && !Number.isInteger(numericValue)) ? '0.0' : '0';
    element.textContent = initialDisplayValue + suffix;

    const timer = setInterval(() => {
        currentValue += increment;
        let animationComplete = false;
        if ((increment > 0 && currentValue >= numericValue) || (increment < 0 && currentValue <= numericValue)) {
            currentValue = numericValue;
            animationComplete = true;
        } else if (numericValue === 0) {
            currentValue = 0;
            animationComplete = true;
        }

        let displayValue;
        if (numericPart.includes('.') && !Number.isInteger(numericValue) ) {
            const decimalPlaces = (numericPart.split('.')[1] || '').length;
            displayValue = currentValue.toFixed(decimalPlaces);
        } else {
            displayValue = Math.round(currentValue);
        }
        element.textContent = displayValue + suffix;

        if(animationComplete){
            clearInterval(timer);
        }
    }, frameDuration);
}

// Handler for the contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    let formMessageDiv = document.getElementById('form-submission-message');
    if (!formMessageDiv) {
        formMessageDiv = document.createElement('div');
        formMessageDiv.id = 'form-submission-message';
        formMessageDiv.className = 'form-submission-feedback';
        formMessageDiv.style.cssText = 'margin-top: 15px; padding: 10px; border-radius: 5px; text-align: center; display: none;';
        contactForm.parentNode.insertBefore(formMessageDiv, contactForm.nextSibling);
    }
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        formMessageDiv.textContent = '';
        formMessageDiv.style.display = 'none';
        formMessageDiv.className = 'form-submission-feedback';
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        data.formType = 'contact';
        if (!data.name || !data.email || !data.message) {
            formMessageDiv.textContent = 'Please fill in all required fields.';
            formMessageDiv.classList.add('error');
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formMessageDiv.textContent = 'Please enter a valid email address.';
            formMessageDiv.classList.add('error');
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/';
        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok && result.success) {
                formMessageDiv.textContent = result.message || 'Message sent successfully!';
                formMessageDiv.classList.add('success');
                this.reset();
            } else {
                formMessageDiv.textContent = result.message || `Failed to send message. Server responded with ${response.status}.`;
                formMessageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            formMessageDiv.textContent = 'An error occurred. Please try again later.';
            formMessageDiv.classList.add('error');
        } finally {
            formMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Handler for the newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    let newsletterMessageDiv = document.getElementById('newsletter-submission-message');
    if(!newsletterMessageDiv){
        newsletterMessageDiv = document.createElement('div');
        newsletterMessageDiv.id = 'newsletter-submission-message';
        newsletterMessageDiv.className = 'form-submission-feedback';
        newsletterMessageDiv.style.cssText = 'margin-top: 10px; padding: 8px; border-radius: 4px; text-align: center; font-size: 0.9em; display: none;';
        newsletterForm.parentNode.insertBefore(newsletterMessageDiv, newsletterForm.nextSibling);
    }
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        newsletterMessageDiv.textContent = '';
        newsletterMessageDiv.style.display = 'none';
        newsletterMessageDiv.className = 'form-submission-feedback';
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        if (!email) {
            newsletterMessageDiv.textContent = 'Please enter your email address.';
            newsletterMessageDiv.classList.add('error');
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newsletterMessageDiv.textContent = 'Please enter a valid email address.';
            newsletterMessageDiv.classList.add('error');
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/';
        const data = { email: email, formType: 'newsletter' };
        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok && result.success) {
                newsletterMessageDiv.textContent = result.message || 'Successfully subscribed!';
                newsletterMessageDiv.classList.add('success');
                this.reset();
            } else {
                newsletterMessageDiv.textContent = result.message || `Subscription failed. Server responded with ${response.status}.`;
                newsletterMessageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error submitting newsletter form:', error);
            newsletterMessageDiv.textContent = 'An error occurred. Please try again later.';
            newsletterMessageDiv.classList.add('error');
        } finally {
            newsletterMessageDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Job Application Form Handler (Example for one job type)
const jobAppFormMotionDesigner = document.getElementById('jobApplicationFormMotionDesigner');
if (jobAppFormMotionDesigner) {
    const messageTextarea = document.getElementById('jobAppMessageMotionDesigner');
    const charCounterDisplay = document.getElementById('charCounterMotionDesigner');
    const maxLength = messageTextarea.maxLength > 0 ? messageTextarea.maxLength : 300; // Use attribute or default

    if (messageTextarea && charCounterDisplay) {
        charCounterDisplay.textContent = `${maxLength} characters remaining`; // Initial display
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const charsRemaining = maxLength - currentLength;
            charCounterDisplay.textContent = `${charsRemaining} characters remaining`;
            charCounterDisplay.style.color = charsRemaining < 0 ? 'var(--error-red)' : '#aaa';
        });
    }

    jobAppFormMotionDesigner.addEventListener('submit', async function(e) {
        e.preventDefault();
        const feedbackDiv = document.getElementById('jobAppSubmissionMessageMotionDesigner');
        feedbackDiv.textContent = '';
        feedbackDiv.style.display = 'none';
        feedbackDiv.className = 'form-submission-feedback';
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        const nameInput = document.getElementById('jobAppNameMotionDesigner');
        const emailInput = document.getElementById('jobAppEmailMotionDesigner');
        const resumeInput = document.getElementById('jobAppResumeMotionDesigner');

        if (!nameInput.value || !emailInput.value || !messageTextarea.value || !resumeInput.files.length) {
            feedbackDiv.textContent = 'Please fill in all required fields and attach a resume.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        if (messageTextarea.value.length > maxLength) {
            feedbackDiv.textContent = `Introduction exceeds ${maxLength} characters.`;
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            feedbackDiv.textContent = 'Please enter a valid email address.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const file = resumeInput.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxFileSize) {
            feedbackDiv.textContent = 'Resume file size exceeds 5MB.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            feedbackDiv.textContent = 'Invalid file type. Please upload PDF, DOC, DOCX, RTF or TXT.';
            feedbackDiv.classList.add('error');
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            return;
        }

        const formData = new FormData(this);
        formData.append('formType', 'job-application-motion-designer');
        const workerUrl = 'https://contact-form-handler.thomas-streetman.workers.dev/';
        try {
            const response = await fetch(workerUrl, { method: 'POST', body: formData });
            const result = await response.json();
            if (response.ok && result.success) {
                feedbackDiv.textContent = result.message || 'Application submitted successfully!';
                feedbackDiv.classList.add('success');
                this.reset();
                if (charCounterDisplay) charCounterDisplay.textContent = `${maxLength} characters remaining`;
            } else {
                feedbackDiv.textContent = result.message || `Submission failed. Server responded with ${response.status}.`;
                feedbackDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error submitting job application:', error);
            feedbackDiv.textContent = 'An error occurred. Please try again later.';
            feedbackDiv.classList.add('error');
        } finally {
            feedbackDiv.style.display = 'block';
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Image error handling
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.error('Failed to load image:', this.src);
        });
    } else if (img.naturalWidth === 0 && img.src && !img.getAttribute('src').startsWith('data:image/')) {
         img.style.display = 'none';
         console.error('Image previously failed to load (naturalWidth is 0):', img.src);
    }
});

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
        '.team-member-card, .job-posting, .mission-content, .blog-card'
    );
    elementsToObserve.forEach(el => {
        // IMPORTANT: .blog-card is removed from this initial query
        // This condition is applied to exclude blog cards within a specific parent element,
        // allowing them to be observed by a different mechanism if needed, or simply not observed.
        if (!(el.classList.contains('blog-card') && el.closest('#blog-posts'))) {
             animatedElementsObserver.observe(el);
        }
    });
});
