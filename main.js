/**
 * MONSTER SCRAP METALS - Thumbnail Navigation System
 */
// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const lines = document.querySelectorAll('.line');
const navItems = document.querySelectorAll('.nav-links a');
const closeMenu = () => {
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
    lines[0].style.transform = "none";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "none";
};
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        lines[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        lines[1].style.opacity = "0";
        lines[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
    } else {
        closeMenu();
    }
});
navItems.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Core navigation function
const thumbnailCards = document.querySelectorAll('.thumbnail-card');
const detailPages = document.querySelectorAll('.detail-page');
const heroGrid = document.querySelector('.hero-grid');
const backButtons = document.querySelectorAll('.back-btn');

function showSection(sectionId) {
    if (sectionId === 'home') {
        heroGrid.style.display = 'flex';
        detailPages.forEach(page => page.classList.remove('active'));
    } else {
        heroGrid.style.display = 'none';
        detailPages.forEach(page => page.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Thumbnail clicks: Show section and push history state
thumbnailCards.forEach(card => {
    card.addEventListener('click', () => {
        const targetPage = card.getAttribute('data-page');
        const targetSectionId = `${targetPage}-page`;
        showSection(targetSectionId);
        history.pushState(null, '', `#${targetPage}`);
    });
});

// Back buttons: Use history.back() to trigger popstate
backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        history.back();
    });
});

// Handle browser/phone back (popstate) and hash changes
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(`${hash}-page`);
    } else {
        showSection('home');
    }
});

// Handle initial load (e.g., if URL has #hash)
const initialHash = window.location.hash.substring(1);
if (initialHash) {
    showSection(`${initialHash}-page`);
} else {
    showSection('home');
}

// Smooth scrolling for anchor links (updated for #home)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== "#" && targetId !== "#home") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else if (targetId === "#home") {
            e.preventDefault();
            showSection('home');
            history.pushState(null, '', window.location.pathname); // Remove hash
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.98)";
        navbar.style.padding = "10px 0";
    } else {
        navbar.style.background = "rgba(10, 10, 10, 0.98)";
        navbar.style.padding = "12px 0";
    }
});

// Form submission
const form = document.getElementById('monster-contact-form');
const successMessage = document.getElementById('form-success');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Get the data for WhatsApp formatting BEFORE we send the email
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const rawPhone = form.querySelector('input[name="phone"]').value;
        const message = formData.get('message');
        
        // 2. Format phone number for the Netlify Email (Optional, purely aesthetic for email)
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            let cleanPhone = rawPhone.replace(/[^\d+]/g, '');
            phoneInput.value = `Phone: ${cleanPhone}`; 
        }

        // 3. Construct the WhatsApp URL
        // This is the Client's phone number
        const clientPhoneNumber = "27744277928"; 
        
        // Create the text message
        const whatsappText = `*NEW QUOTE REQUEST*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${rawPhone}%0A*Items:* ${message}`;
        
        // Create the link
        const whatsappUrl = `https://wa.me/${clientPhoneNumber}?text=${whatsappText}`;

        // 4. Send the Email to Netlify (Background Process)
        const action = form.action || '/';
        
        try {
            const response = await fetch(action, {
                method: 'POST',
                body: new FormData(form), // Re-grab form data with updated phone value
            });
            
            if (response.ok) {
                // 5. SUCCESS: Hide form, show message, AND Open WhatsApp
                form.style.display = 'none';
                successMessage.style.display = 'block';
                form.reset();
                
                // --- THE MAGIC PART ---
                // Open WhatsApp in a new tab/window
                window.open(whatsappUrl, '_blank');
                
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Oops! The email failed, but we will open WhatsApp for you now.');
            // Even if email fails, try to open WhatsApp so the lead isn't lost
            window.open(whatsappUrl, '_blank');
        }
    });
}

// Add entrance animations
window.addEventListener('load', () => {
    const heroHeader = document.querySelector('.hero-header');
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    const quickContact = document.querySelector('.quick-contact');
    
    setTimeout(() => {
        heroHeader.style.opacity = '1';
        heroHeader.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        thumbnailGrid.style.opacity = '1';
        thumbnailGrid.style.transform = 'translateY(0)';
    }, 200);
    
    setTimeout(() => {
        quickContact.style.opacity = '1';
        quickContact.style.transform = 'translateY(0)';
    }, 300);
});

// Initial animation setup
document.addEventListener('DOMContentLoaded', () => {
    const heroHeader = document.querySelector('.hero-header');
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    const quickContact = document.querySelector('.quick-contact');
    
    heroHeader.style.opacity = '0';
    heroHeader.style.transform = 'translateY(20px)';
    heroHeader.style.transition = 'all 0.5s ease';
    
    thumbnailGrid.style.opacity = '0';
    thumbnailGrid.style.transform = 'translateY(20px)';
    thumbnailGrid.style.transition = 'all 0.5s ease';
    
    quickContact.style.opacity = '0';
    quickContact.style.transform = 'translateY(20px)';
    quickContact.style.transition = 'all 0.5s ease';
});
