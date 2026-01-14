/**
 * MONSTER SCRAP METALS - Core Logic
 */

// 1. SELECT ELEMENTS
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const lines = document.querySelectorAll('.line');
const navItems = document.querySelectorAll('.nav-links a');

// 2. MOBILE MENU LOGIC
// Function to handle closing the menu
const closeMenu = () => {
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    // Reset Burger Lines
    lines[0].style.transform = "none";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "none";
};

// Toggle Menu on Hamburger Click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        // Freeze background scroll
        document.body.style.overflow = 'hidden'; 
        
        // Animate Burger to "X"
        lines[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        lines[1].style.opacity = "0";
        lines[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
    } else {
        closeMenu();
    }
});

// Close Menu when any link is clicked
navItems.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});


// 3. SCROLL ANIMATIONS (Intersection Observer)
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Once shown, we can stop observing this specific element
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-up');
hiddenElements.forEach((el) => observer.observe(el));


// 4. SMOOTH SCROLLING
// Handles the Hero Mouse Icon and any other internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Only trigger if it's a valid ID (not just "#")
        if (targetId !== "#") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


// 5. NAVBAR BACKGROUND SCROLL EFFECT
// Adds a solid background to the navbar once you scroll down
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.95)";
        navbar.style.padding = "15px 0"; // Shrink slightly on scroll
    } else {
        navbar.style.background = "rgba(10, 10, 10, 0.9)";
        navbar.style.padding = "20px 0";
    }
});