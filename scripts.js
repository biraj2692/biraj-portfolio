// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Add emergency fallback to ensure content is always visible
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const body = document.body;
        if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
            console.warn('Emergency fallback: Removing loading screen');
            loadingScreen.style.display = 'none';
            body.classList.remove('loading');
            initializeWebsite();
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
}

// ===== LOADING SCREEN =====
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const body = document.body;

    // Add loading class to body
    body.classList.add('loading');

    let progress = 0;
    const duration = 2000; // Reduced to 2 seconds for better UX
    const interval = 50; // Update every 50ms for smoother animation
    const increment = (100 / (duration / interval));

    // Simulate realistic loading stages
    const loadingStages = [
        { end: 30, speed: 2.0, label: "Initializing..." },
        { end: 60, speed: 1.5, label: "Loading assets..." },
        { end: 85, speed: 1.2, label: "Setting up..." },
        { end: 100, speed: 0.8, label: "Complete!" }
    ];

    let currentStage = 0;
    let progressInterval;

    // Add fallback timer to ensure loading completes
    const fallbackTimer = setTimeout(() => {
        console.warn('Loading screen fallback triggered');
        completeLoading();
    }, 5000); // 5 second fallback

    progressInterval = setInterval(() => {
        const stage = loadingStages[currentStage];

        // Calculate increment based on current stage
        let stageIncrement = increment * stage.speed;

        // Add some randomness for realism
        const randomFactor = Math.random() * 0.3;
        progress += stageIncrement + randomFactor;

        // Check if we've reached the current stage end
        if (progress >= stage.end) {
            progress = stage.end;
            currentStage++;

            // If we've completed all stages
            if (currentStage >= loadingStages.length) {
                progress = 100;
                loadingProgress.style.width = progress + '%';
                loadingPercentage.textContent = Math.floor(progress) + '%';

                // Add completion effect
                loadingPercentage.style.transform = 'scale(1.2)';
                loadingPercentage.style.color = 'var(--secondary-color)';
                loadingPercentage.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';

                clearInterval(progressInterval);
                clearTimeout(fallbackTimer);

                // Hold at 100% for dramatic effect
                setTimeout(() => {
                    completeLoading();
                }, 600); // Reduced hold time
                return;
            }
        }

        // Update progress bar and percentage
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';

        // Add milestone effects
        const currentPercent = Math.floor(progress);
        if (currentPercent % 25 === 0 && currentPercent > 0 && currentPercent < 100) {
            loadingPercentage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                loadingPercentage.style.transform = 'scale(1)';
            }, 200);
        }
    }, interval);

    function completeLoading() {
        // Clear any remaining timers
        clearInterval(progressInterval);
        clearTimeout(fallbackTimer);

        // Fade out loading screen
        loadingScreen.classList.add('fade-out');

        // Remove loading class from body immediately
        body.classList.remove('loading');

        // Initialize website after loading
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initializeWebsite();
        }, 800);
    }

    // Skip loading on click (for development/testing)
    loadingScreen.addEventListener('click', () => {
        if (!loadingScreen.classList.contains('fade-out')) {
            completeLoading();
        }
    });

    // Skip loading on any key press
    document.addEventListener('keydown', () => {
        if (!loadingScreen.classList.contains('fade-out')) {
            completeLoading();
        }
    });

    // Auto-skip after DOM is fully loaded
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if (!loadingScreen.classList.contains('fade-out')) {
                completeLoading();
            }
        }, 1000); // Skip after 1 second if page is already loaded
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

// ===== CUSTOM CURSOR =====
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let isMoving = false;
    let moveTimeout;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Add moving state
        if (!isMoving) {
            isMoving = true;
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '0.6';
        }

        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });

    // Smooth follower animation with easing
    function animateFollower() {
        const ease = 0.15;
        followerX += (mouseX - followerX) * ease;
        followerY += (mouseY - followerY) * ease;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

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

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bar animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe fade-in elements
    document.querySelectorAll('.fade-in, .reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ===== SKILL BARS =====
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');

    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');

        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// ===== PROJECT FILTERS =====
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }, index * 100);
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
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
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
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.add('loaded');
        });
    }, 500);
});
