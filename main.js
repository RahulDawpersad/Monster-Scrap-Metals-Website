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

// Thumbnail Card Navigation
const thumbnailCards = document.querySelectorAll('.thumbnail-card');
const detailPages = document.querySelectorAll('.detail-page');
const heroGrid = document.querySelector('.hero-grid');
const backButtons = document.querySelectorAll('.back-btn');

thumbnailCards.forEach(card => {
    card.addEventListener('click', () => {
        const targetPage = card.getAttribute('data-page');
        const targetSection = document.getElementById(`${targetPage}-page`);
        
        if (targetSection) {
            // Hide hero grid
            heroGrid.style.display = 'none';
            
            // Hide all detail pages
            detailPages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            targetSection.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Back Button Navigation
backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Hide all detail pages
        detailPages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show hero grid
        heroGrid.style.display = 'flex';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Smooth scrolling for anchor links
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
            // Go back to hero grid
            detailPages.forEach(page => {
                page.classList.remove('active');
            });
            heroGrid.style.display = 'flex';
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        // Format phone number
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            let raw = phoneInput.value.replace(/[^\d+]/g, '');
            phoneInput.value = `Phone: ${raw}`;
        }
        
        const formData = new FormData(form);
        const action = form.action || '/';
        
        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Oops! Something went wrong. Please try calling us directly.');
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
