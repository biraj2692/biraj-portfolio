// ===== GSAP INITIALIZATION =====
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Global GSAP timeline
let masterTimeline = gsap.timeline();

document.addEventListener('DOMContentLoaded', function() {
    // Add emergency fallback to ensure content is always visible
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const body = document.body;
        if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
            console.warn('Emergency fallback: Removing loading screen');
            gsap.to(loadingScreen, { opacity: 0, duration: 0.5, onComplete: () => {
                loadingScreen.style.display = 'none';
                body.classList.remove('loading');
                initializeWebsite();
            }});
        }
    }, 8000); // 8 second emergency fallback

    setupLoadingScreen();
});

function initializeWebsite() {
    setupNavigation();
    setupCustomCursor();
    setupScrollAnimations();
    setupSkillBars();
    setupProjectFilters();
    setupContactForm();
    setupMobileMenu();
    setupHeaderScroll();
    setupThemeToggle();
    initializeGSAPAnimations();
}

// ===== GSAP ANIMATIONS INITIALIZATION =====
function initializeGSAPAnimations() {
    // Hero section animations
    animateHeroSection();

    // Scroll-triggered animations
    setupScrollTriggerAnimations();

    // Parallax effects
    setupParallaxEffects();
}

// ===== HERO SECTION ANIMATIONS =====
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    const heroCTA = document.querySelector('.hero-cta');
    const socialLinks = document.querySelector('.social-links');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!heroContent) return;

    // Create timeline for hero animations
    const heroTL = gsap.timeline({ delay: 0.5 });

    // Set initial states
    gsap.set([heroTitle, heroSubtitle, heroCTA, socialLinks, scrollIndicator], {
        opacity: 0,
        y: 30
    });

    // Animate elements in sequence
    heroTL
        .to(heroTitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        })
        .to(heroSubtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
        .to(heroCTA, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .to(socialLinks, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3")
        .to(scrollIndicator, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");

    // Animate social icons individually
    gsap.to('.social-icon', {
        y: -3,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.1,
        paused: true,
        id: "socialHover"
    });
}

// ===== SCROLL TRIGGER ANIMATIONS =====
function setupScrollTriggerAnimations() {
    // Fade in animations for sections
    gsap.utils.toArray('.fade-in, section').forEach((element) => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Skill bars animation
    gsap.utils.toArray('.progress-bar').forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width');

        gsap.fromTo(bar,
            { width: '0%' },
            {
                width: targetWidth,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Project cards stagger animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 30,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            }
        );
    });

    // Contact items animation
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            }
        );
    });
}

// ===== PARALLAX EFFECTS =====
function setupParallaxEffects() {
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        gsap.to(hero, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: hero,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Floating animation for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            y: 10,
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true
        });
    }
}

// ===== LOADING SCREEN WITH GSAP =====
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingLogo = document.querySelector('.loading-logo');
    const loadingDots = document.querySelector('.loading-dots');
    const body = document.body;

    if (!loadingScreen || !loadingProgress || !loadingPercentage) {
        console.error('Loading screen elements not found!');
        return;
    }

    // Add loading class to body
    body.classList.add('loading');

    // GSAP Timeline for loading animations
    const loadingTL = gsap.timeline();

    // Initial setup - hide elements
    gsap.set([loadingLogo, loadingProgress.parentElement, loadingDots], {
        opacity: 0,
        y: 30
    });

    // Animate loading elements in sequence
    loadingTL
        .to(loadingLogo, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        })
        .to(loadingProgress.parentElement, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
        .to(loadingDots, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");

    // Animate loading dots with GSAP
    gsap.to(loadingDots.children, {
        y: -10,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.1,
        repeat: -1,
        yoyo: true
    });

    // Progress animation with GSAP
    const progressObj = { value: 0 };
    const minimumDuration = 3000;
    const startTime = Date.now();

    gsap.to(progressObj, {
        value: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
            const progress = Math.floor(progressObj.value);
            loadingProgress.style.width = progress + '%';
            loadingPercentage.textContent = progress + '%';

            // Update accessibility
            const progressBar = document.querySelector('.loading-bar');
            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', progress);
            }

            // Milestone effects with GSAP
            if (progress % 25 === 0 && progress > 0 && progress < 100) {
                gsap.to(loadingPercentage, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }
        },
        onComplete: function() {
            // Completion effect with GSAP
            gsap.to(loadingPercentage, {
                scale: 1.2,
                color: "var(--secondary-color)",
                textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    setTimeout(() => completeLoading(), 1000);
                }
            });
        }
    });

    // Fallback timer
    const fallbackTimer = setTimeout(() => {
        console.warn('Loading screen fallback triggered');
        completeLoading();
    }, 6000);

    function completeLoading() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumDuration - elapsedTime);

        if (remainingTime > 0) {
            setTimeout(() => actuallyCompleteLoading(), remainingTime);
        } else {
            actuallyCompleteLoading();
        }
    }

    function actuallyCompleteLoading() {
        clearTimeout(fallbackTimer);

        // GSAP fade out animation
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                loadingScreen.style.display = 'none';
                body.classList.remove('loading');
                initializeWebsite();
            }
        });
    }

    // Skip loading interactions with GSAP
    const handleSkip = () => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= minimumDuration) {
            completeLoading();
        } else {
            gsap.to(loadingPercentage, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }
    };

    loadingScreen.addEventListener('click', handleSkip);
    document.addEventListener('keydown', handleSkip);

    // Auto-skip after DOM loaded
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if (loadingScreen.style.display !== 'none') {
                completeLoading();
            }
        }, 3500);
    }
}

// ===== THEME TOGGLE =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }

    // Check for saved theme preference or detect system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize theme
    if (savedTheme) {
        applyTheme(savedTheme === 'light-mode');
    } else if (!systemPrefersDark) {
        // If system prefers light mode, apply it
        applyTheme(true);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isCurrentlyLight = body.classList.contains('light-mode');
        applyTheme(!isCurrentlyLight);

        // Save preference
        localStorage.setItem('theme', !isCurrentlyLight ? 'light-mode' : 'dark-mode');
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(!e.matches);
        }
    });

    function applyTheme(isLight) {
        if (isLight) {
            body.classList.add('light-mode');
            themeToggle.classList.add('light-mode');
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            body.classList.remove('light-mode');
            themeToggle.classList.remove('light-mode');
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        }
    }
}

// ===== NAVIGATION =====
function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                updateActiveNavLink(this);

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateNavOnScroll);
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }
    });
}

// ===== CUSTOM CURSOR WITH GSAP =====
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;

    // Update cursor position with GSAP
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Animate cursor with GSAP for smoother movement
        gsap.to(cursor, {
            left: mouseX,
            top: mouseY,
            duration: 0.1,
            ease: "power2.out"
        });

        // Animate follower with GSAP
        gsap.to(cursorFollower, {
            left: mouseX,
            top: mouseY,
            duration: 0.3,
            ease: "power2.out"
        });

        // Update opacity states
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
        gsap.to(cursorFollower, { opacity: 0.6, duration: 0.2 });
    });

    // Enhanced hover effects for different element types
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item, .filter-btn, #themeToggle');
    const textElements = document.querySelectorAll('h1, h2, h3, .highlight');
    const formElements = document.querySelectorAll('input, textarea');
    const magneticElements = document.querySelectorAll('.btn, .social-icon, .logo a');

    // Regular interactive elements
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Magnetic effect for special elements
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            cursor.style.transform = `translate(-50%, -50%) scale(1.5)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Text elements - subtle effect
    textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
            cursor.style.opacity = '0.8';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });

    // Form elements - different style
    formElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.background = 'var(--secondary-color)';
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorFollower.style.borderColor = 'var(--secondary-color)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.background = 'var(--primary-color)';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });

    // Click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        cursorFollower.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        cursorFollower.classList.remove('click');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.6';
    });

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // Cursor behavior during scrolling
    let scrollTimeout;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            cursor.style.opacity = '0.3';
            cursorFollower.style.opacity = '0.2';
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '0.6';
        }, 150);
    });

    // Add cursor ripple effect on click
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(212, 175, 55, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9998';
        ripple.style.transition = 'all 0.6s ease-out';

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.style.width = '60px';
            ripple.style.height = '60px';
            ripple.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 600);
    });
}

// ===== SCROLL ANIMATIONS WITH GSAP =====
function setupScrollAnimations() {
    // This function is now handled by setupScrollTriggerAnimations()
    // Keeping for compatibility but GSAP ScrollTrigger handles all scroll animations
    console.log('Scroll animations now handled by GSAP ScrollTrigger');
}

// ===== SKILL BARS WITH GSAP =====
function setupSkillBars() {
    // Set initial state with GSAP
    gsap.set('.progress-bar', { width: '0%' });
}

function animateSkillBars() {
    // This is now handled by setupScrollTriggerAnimations()
    // Keeping for compatibility
    console.log('Skill bar animations now handled by GSAP ScrollTrigger');
}

// ===== PROJECT FILTERS WITH GSAP =====
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active filter button with GSAP
            filterButtons.forEach(btn => {
                gsap.to(btn, {
                    scale: btn === button ? 1.05 : 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Filter projects with GSAP animations
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    // Show card with animation
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        delay: index * 0.1,
                        onStart: () => {
                            card.classList.remove('hidden');
                            card.style.pointerEvents = 'auto';
                        }
                    });
                } else {
                    // Hide card with animation
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                        duration: 0.4,
                        ease: "power2.in",
                        delay: index * 0.05,
                        onComplete: () => {
                            card.classList.add('hidden');
                            card.style.pointerEvents = 'none';
                        }
                    });
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
    });

    document.body.appendChild(notification);

    // GSAP animation for notification
    gsap.fromTo(notification,
        {
            x: 100,
            opacity: 0,
            scale: 0.8
        },
        {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        }
    );

    // Remove after 3 seconds with GSAP
    gsap.to(notification, {
        x: 100,
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        delay: 3,
        onComplete: () => {
            document.body.removeChild(notification);
        }
    });
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) {
        console.error('Mobile menu elements not found:', { hamburger, navLinks });
        return;
    }

    console.log('Mobile menu setup successful');

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked');
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== HEADER SCROLL EFFECT =====
function setupHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== ADDITIONAL ANIMATIONS =====
// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(revealOnScroll, 10));

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.content-loading').forEach(el => {
            el.classList.add('loaded');
        });
    }, 500);
});
