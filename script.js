/**
 * Portfolio Website JavaScript
 * David Baraka - Social Media & Content Manager
 * Premium interactive functionality
 */

(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorTrail = document.querySelector('.custom-cursor-trail');
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const typingText = document.getElementById('typing-text');
    const particlesContainer = document.getElementById('particles');
    const revealElements = document.querySelectorAll('[data-reveal]');
    const skillBars = document.querySelectorAll('.skill-progress');
    const counters = document.querySelectorAll('.counter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const contactForm = document.getElementById('contact-form');
    const portfolioViews = document.querySelectorAll('.portfolio-view');

    // ============================================
    // LOADING SCREEN
    // ============================================
    function hideLoadingScreen() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 2200);
    }

    // ============================================
    // CUSTOM CURSOR (Desktop Only)
    // ============================================
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let isTouch = window.matchMedia('(pointer: coarse)').matches;

    function initCustomCursor() {
        if (isTouch || !customCursor) return;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const hoverElements = document.querySelectorAll('a, button, input, textarea, .portfolio-view, .service-card, .brand-card, .portfolio-item, .filter-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            trailX += (mouseX - trailX) * 0.08;
            trailY += (mouseY - trailY) * 0.08;

            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
            customCursorTrail.style.left = trailX + 'px';
            customCursorTrail.style.top = trailY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = progress + '%';
    }

    // ============================================
    // STICKY HEADER
    // ============================================
    function updateHeader() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    function initMobileNav() {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // SMOOTH SCROLLING & ACTIVE SECTION
    // ============================================
    function initSmoothScroll() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function highlightActiveSection() {
        const pathName = window.location.pathname.split('/').pop() || 'index.html';
        const currentPage = pathName === 'index.html' ? 'home' : pathName.replace('.html', '');

        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            link.classList.toggle('active', page === currentPage || (currentPage === 'home' && page === 'home'));
        });

        if (document.querySelector('section[id]')) {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 150;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    }

    // ============================================
    // THEME TOGGLE
    // ============================================
    function initThemeToggle() {
        if (!themeToggle) return;

        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', initialTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
        });

        themeToggle.setAttribute('aria-pressed', initialTheme === 'dark');
    }

    // ============================================
    // BACK TO TOP
    // ============================================
    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function initBackToTop() {
        if (!backToTop) return;
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // TYPING ANIMATION
    // ============================================
    function initTypingAnimation() {
        if (!typingText) return;

        const words = [
            'Social Media Manager',
            'Content Creator',
            'Brand Strategist',
            'Digital Marketer',
            'Community Builder'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // ============================================
    // PARTICLES
    // ============================================
    function initParticles() {
        if (!particlesContainer || isTouch) return;

        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // ============================================
    // SCROLL REVEAL
    // ============================================
    function initScrollReveal() {
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    function initSkillBars() {
        if (!skillBars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    function initCounters() {
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    function updateCounter() {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ============================================
    // PORTFOLIO FILTERING
    // ============================================
    function initPortfolioFilter() {
        if (!filterBtns.length || !portfolioItems.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                const filter = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // LIGHTBOX
    // ============================================
    function initLightbox() {
        if (!lightbox || !lightboxClose) return;

        portfolioViews.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = portfolioItems[index];
                if (!item) return;

                const title = item.querySelector('.portfolio-info h3')?.textContent || 'Project preview';
                const desc = item.querySelector('.portfolio-info p')?.textContent || 'A closer look at this project.';
                const imageEl = item.querySelector('.portfolio-image img');

                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
                lightboxImage.innerHTML = '';

                if (imageEl) {
                    const previewImage = imageEl.cloneNode(true);
                    previewImage.alt = title;
                    lightboxImage.appendChild(previewImage);
                } else {
                    lightboxImage.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-family:var(--font-secondary);">Preview unavailable</div>';
                }

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const successMsg = document.getElementById('form-success');

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(err => err.textContent = '');

            // Validate name
            if (!name.value.trim()) {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                isValid = false;
            }

            // Validate subject
            if (!subject.value.trim()) {
                document.getElementById('subject-error').textContent = 'Please enter a subject';
                isValid = false;
            }

            // Validate message
            if (!message.value.trim()) {
                document.getElementById('message-error').textContent = 'Please enter your message';
                isValid = false;
            } else if (message.value.trim().length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }

            if (isValid) {
                // Show success message
                successMsg.classList.add('show');
                contactForm.reset();

                // Hide success after 5 seconds
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
        });
    }

    // ============================================
    // MOUSE PARALLAX (Hero)
    // ============================================
    function initParallax() {
        if (isTouch) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            parallaxElements.forEach(el => {
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ============================================
    // SCROLL EVENT HANDLER
    // ============================================
    function handleScroll() {
        updateScrollProgress();
        updateHeader();
        updateBackToTop();
        highlightActiveSection();
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        document.body.style.overflow = 'hidden';
        hideLoadingScreen();
        initCustomCursor();
        initMobileNav();
        initSmoothScroll();
        initThemeToggle();
        initBackToTop();
        initTypingAnimation();
        initParticles();
        initScrollReveal();
        initSkillBars();
        initCounters();
        initPortfolioFilter();
        initLightbox();
        initContactForm();
        initParallax();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', () => {
            isTouch = window.matchMedia('(pointer: coarse)').matches;
        });

        // Trigger initial scroll handler
        handleScroll();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
