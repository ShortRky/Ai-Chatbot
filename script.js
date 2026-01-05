// Animation replay system
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animationElements = new Set();
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.lastScrollTop = 0;
        this.scrollDirection = 'down';
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollHandling();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupParallax();
        this.setupKeyboardNavigation();
        this.setupTouchGestures();
        this.setupPerformanceOptimizations();
        
        console.log('🚀 Advanced Space website initialized!');
        console.log('✨ Features: Animation replay, mobile optimization, performance enhancements');
    }

    setupIntersectionObserver() {
        // Create different observers for different animation types
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateHero(entry.target);
                } else {
                    this.resetHero(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSection(entry.target);
                } else {
                    // Reset when leaving viewport
                    this.resetSection(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    // Remove animation class when out of view
                    entry.target.classList.remove('animate-in');
                }
            });
        }, { threshold: 0.2 });

        // Observe different elements
        const heroSection = document.querySelector('.hero-section');
        const contentSections = document.querySelectorAll('.content-section');
        const animatedElements = document.querySelectorAll('.section-title, .text-content');

        if (heroSection) heroObserver.observe(heroSection);
        contentSections.forEach(section => sectionObserver.observe(section));
        animatedElements.forEach(element => elementObserver.observe(element));

        this.observers.set('hero', heroObserver);
        this.observers.set('section', sectionObserver);
        this.observers.set('element', elementObserver);
    }

    animateHero(hero) {
        const title = hero.querySelector('.hero-title');
        const subtitle = hero.querySelector('.hero-subtitle');
        
        if (title) {
            title.style.animation = 'none';
            title.offsetHeight; // Trigger reflow
            title.style.animation = 'glow 2s ease-in-out infinite alternate';
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                subtitle.style.transition = 'all 1s ease-out';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 500);
        }
    }

    resetHero(hero) {
        const subtitle = hero.querySelector('.hero-subtitle');
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(30px)';
        }
    }

    animateSection(section) {
        const title = section.querySelector('.section-title');
        const textContent = section.querySelector('.text-content');
        
        if (title) {
            title.style.transition = 'all 0.8s ease-out';
            title.style.opacity = '1';
            title.style.transform = 'translateX(0)';
        }
        
        if (textContent) {
            textContent.style.transition = 'all 0.8s ease-out 0.3s';
            textContent.style.opacity = '1';
            textContent.style.transform = 'translateX(0)';
        }

        // Special animations for specific sections
        if (section.id === 'mission') {
            this.animatePlanets(section);
        } else if (section.id === 'explore') {
            this.animateNebula(section);
        } else if (section.id === 'discover') {
            this.animateAsteroids(section);
        } else if (section.id === 'future') {
            this.animateWormhole(section);
        }
    }

    resetSection(section) {
        const title = section.querySelector('.section-title');
        const textContent = section.querySelector('.text-content');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateX(-50px)';
        }
        
        if (textContent) {
            textContent.style.opacity = '0';
            textContent.style.transform = 'translateX(-50px)';
        }
    }

    animatePlanets(section) {
        const planets = section.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            planet.style.animation = 'none';
            planet.offsetHeight; // Trigger reflow
            planet.style.animation = `float 6s ease-in-out infinite`;
            planet.style.animationDelay = `${index * 3}s`;
        });
    }

    animateNebula(section) {
        const nebula = section.querySelector('.nebula-bg');
        if (nebula) {
            nebula.style.animation = 'none';
            nebula.offsetHeight;
            nebula.style.animation = 'pulse 4s ease-in-out infinite';
        }
    }

    animateAsteroids(section) {
        const asteroidField = section.querySelector('.asteroid-field');
        if (asteroidField) {
            asteroidField.style.animation = 'none';
            asteroidField.offsetHeight;
            asteroidField.style.animation = 'asteroid-move 10s linear infinite';
        }
    }

    animateWormhole(section) {
        const wormhole = section.querySelector('.wormhole');
        if (wormhole) {
            wormhole.style.animation = 'none';
            wormhole.offsetHeight;
            wormhole.style.animation = 'wormhole-spin 3s linear infinite';
        }
    }

    setupScrollHandling() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;

            // Clear existing timeout
            clearTimeout(this.scrollTimeout);
            
            // Add scrolling class for performance
            document.body.classList.add('scrolling');
            
            // Remove scrolling class after delay
            this.scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);

            // Parallax effect
            this.updateParallax();
        }, { passive: true });
    }

    updateParallax() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const stars = document.querySelector('.stars');
            const twinkling = document.querySelector('.twinkling');
            
            if (stars) {
                stars.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            if (twinkling) {
                twinkling.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            this.isScrolling = false;
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    document.querySelector('.nav-links')?.classList.remove('active');
                }
            });
        });

        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.scrollY + 200;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navigation')) {
                    navLinks.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });
        }
    }

    setupParallax() {
        // Add mouse movement effect for desktop
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                const floatingElements = document.querySelectorAll('.planet');
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;

                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.3;
                    const x = (mouseX - 0.5) * speed * 15;
                    const y = (mouseY - 0.5) * speed * 15;
                    
                    element.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollToNextSection();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollToPreviousSection();
                    break;
                case 'Home':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                    e.preventDefault();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    break;
            }
        });
    }

    scrollToNextSection() {
        const sections = document.querySelectorAll('section');
        const currentScroll = window.scrollY + 100;
        
        for (let section of sections) {
            if (section.offsetTop > currentScroll) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            }
        }
    }

    scrollToPreviousSection() {
        const sections = Array.from(document.querySelectorAll('section')).reverse();
        const currentScroll = window.scrollY - 100;
        
        for (let section of sections) {
            if (section.offsetTop < currentScroll) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
            }
        }
    }

    setupTouchGestures() {
        let touchStartY = 0;
        let touchEndY = 0;
        let touchStartTime = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
            touchStartTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Only handle quick swipes
            if (touchDuration < 300) {
                this.handleSwipe(touchStartY, touchEndY);
            }
        }, { passive: true });
    }

    handleSwipe(startY, endY) {
        const swipeThreshold = 50;
        const diff = startY - endY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - scroll down
                this.scrollToNextSection();
            } else {
                // Swipe down - scroll up
                this.scrollToPreviousSection();
            }
        }
    }

    setupPerformanceOptimizations() {
        // Add will-change to animated elements
        const animatedElements = document.querySelectorAll('.planet, .nebula-bg, .wormhole, .asteroid-field');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });

        // Optimize scroll performance
        let ticking = false;
        
        const updateScroll = () => {
            // Update navigation active state
            const scrollPosition = window.scrollY + 200;
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
            
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });

        // Handle visibility change for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when tab is not visible
                document.body.classList.add('paused');
            } else {
                // Resume animations when tab becomes visible
                document.body.classList.remove('paused');
            }
        });
    }
}

// Initialize the animation controller
const animationController = new AnimationController();

// Add additional CSS for animation replay
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Animation reset states */
    .hero-subtitle {
        transition: none;
    }
    
    .section-title,
    .text-content {
        opacity: 0;
        transform: translateX(-50px);
    }
    
    .section-title.animate-in,
    .text-content.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Performance optimizations */
    .paused * {
        animation-play-state: paused !important;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Improve scrolling performance */
    body {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }
`;
document.head.appendChild(additionalStyles);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize animations on resize
        animationController.setupIntersectionObserver();
    }, 250);
});

// Preload critical resources
window.addEventListener('load', () => {
    // Add loaded class for any post-load animations
    document.body.classList.add('loaded');
    
    // Remove loading indicator if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
});