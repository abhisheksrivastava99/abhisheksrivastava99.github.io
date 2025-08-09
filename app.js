// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const typingText = document.getElementById('typing-text');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Typing Animation
const textArray = [
    'MSc in Fintech at NTU \'26',
    'Ex Data Engineer @ TCS',
    'Data Scientist',
    'Cybersecurity Enthusiast',
    'Machine Learning Engineer',
    'Financial Technology Expert'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Initialize typing animation
if (typingText) {
    setTimeout(typeWriter, 1000);
}

// Mobile Menu Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Improved Smooth Scrolling Function
function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId.replace('#', ''));
    if (!targetSection) {
        console.warn(`Section ${targetId} not found`);
        return;
    }
    
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    const targetPosition = targetSection.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Handle navigation link clicks with improved error handling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        
        if (target && target.startsWith('#')) {
            // Update active link immediately
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll to section
            scrollToSection(target);
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Scroll indicator click
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        scrollToSection('#about');
    });
}

// Navbar Background on Scroll
function updateNavbar() {
    const scrolled = window.pageYOffset;
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
}

// Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150; // Increased offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
function initScrollAnimations() {
    // Add fade-in class to elements that should animate
    const animateElements = [
        '.about-content',
        '.featured-card',
        '.experience-item',
        '.skill-category',
        '.project-card',
        '.contact-item',
        '.contact-message'
    ];
    
    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
    
    // Special animations for skill chips
    const skillChips = document.querySelectorAll('.skill-chip');
    skillChips.forEach((chip, index) => {
        chip.style.transitionDelay = `${(index % 10) * 0.05}s`;
    });
}

// Experience Timeline Interactions
function initExperienceInteractions() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const marker = item.querySelector('.experience-marker');
            const content = item.querySelector('.experience-content');
            
            if (marker) {
                marker.style.transform = 'scale(1.1)';
                marker.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            }
            
            if (content) {
                content.style.transform = 'translateX(10px)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const marker = item.querySelector('.experience-marker');
            const content = item.querySelector('.experience-content');
            
            if (marker) {
                marker.style.transform = 'scale(1)';
                marker.style.boxShadow = '';
            }
            
            if (content) {
                content.style.transform = 'translateX(5px)';
            }
        });
    });
}

// Project Cards Hover Effects
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Featured Cards Special Effects
function initFeaturedInteractions() {
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateY(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
            card.style.boxShadow = '';
        });
    });
}

// Skill Chips Animation
function animateSkillChips() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const chips = category.querySelectorAll('.skill-chip');
        
        category.addEventListener('mouseenter', () => {
            chips.forEach((chip, index) => {
                setTimeout(() => {
                    chip.style.transform = 'translateY(-3px) scale(1.05)';
                }, index * 50);
            });
        });
        
        category.addEventListener('mouseleave', () => {
            chips.forEach((chip, index) => {
                setTimeout(() => {
                    chip.style.transform = 'translateY(0) scale(1)';
                }, index * 30);
            });
        });
    });
}

// Contact Form Interactions
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.querySelector('a');
            if (link) {
                window.open(link.href, link.target || '_self');
            }
        });
    });
}

// Loading Animation
function showLoadingAnimation() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    });
}

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-teal-400));
        z-index: 1001;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize navigation functionality on page load
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Test navigation elements
    console.log('Nav links found:', navLinks.length);
    console.log('Sections found:', document.querySelectorAll('section[id]').length);
    
    // Set initial active nav link
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
        console.log('Home link set as active');
    }
    
    // Verify section IDs match navigation href values
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (correspondingLink) {
            console.log(`✓ Navigation link found for section: ${sectionId}`);
        } else {
            console.warn(`✗ No navigation link found for section: ${sectionId}`);
        }
    });
}

// Experience Timeline Scroll Effect
function initTimelineScrollEffect() {
    const timelineLine = document.querySelector('.experience-timeline::before');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    experienceItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Profile Picture Error Handling
function initProfilePicture() {
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('error', function() {
            console.warn('Profile picture failed to load, showing placeholder');
            this.style.display = 'none';
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'avatar-placeholder';
            placeholder.innerHTML = '<i class="fas fa-user"></i>';
            this.parentNode.appendChild(placeholder);
        });
    }
}

// Enhanced Featured Cards Interactions
function initEnhancedFeaturedInteractions() {
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add click interaction for verification links
        const verifyLink = card.querySelector('.featured-verify');
        if (verifyLink) {
            card.addEventListener('click', (e) => {
                if (e.target === card || card.contains(e.target)) {
                    if (!e.target.closest('.featured-verify')) {
                        verifyLink.click();
                    }
                }
            });
        }
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            
            const icon = card.querySelector('.featured-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
            
            const icon = card.querySelector('.featured-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio app...');
    
    showLoadingAnimation();
    initNavigation();
    initProfilePicture();
    initScrollAnimations();
    initExperienceInteractions();
    initTimelineScrollEffect();
    initProjectInteractions();
    initEnhancedFeaturedInteractions();
    animateSkillChips();
    initContactInteractions();
    createScrollProgress();
    
    console.log('Portfolio app initialized successfully!');
});

// Event Listeners
window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveNavLink();
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
});

// Add click outside to close mobile menu
document.addEventListener('click', (e) => {
    if (navToggle && navMenu) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateNavbar = debounce(updateNavbar, 10);
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);

window.addEventListener('scroll', debouncedUpdateNavbar);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// Console welcome message
console.log(`
🚀 Welcome to Abhishek Srivastava's Portfolio
👨‍💻 Data Scientist | Data Engineer | Cybersecurity Enthusiast
🎯 Currently pursuing MSc in Fintech at NTU Singapore

📍 Section Order: Home → About → Featured → Experience → Skills → Projects → Contact

Connect with me:
📧 abhisheksrivastavacapncook@gmail.com
🔗 https://www.linkedin.com/in/abhisheksrivastava99
🐙 https://github.com/abhisheksrivastava99

🏆 Recent Achievements:
• Australian Government Hall of Fame for Vulnerability Disclosure
• Samsung Electronics Certificates of Excellence (2)
• TCS Service and Commitment Award
• Coursera & IBM AI Certifications
`);

// Export functions for potential testing or external use
window.portfolioApp = {
    scrollToSection,
    updateNavbar,
    updateActiveNavLink,
    typeWriter,
    initExperienceInteractions,
    initEnhancedFeaturedInteractions
};