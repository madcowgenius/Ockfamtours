/* ============================================
   OCKFAM - Website JavaScript
   Guided Safari Tours & Car Rentals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');

    // ---- Video Intro ----
    const videoIntro = document.getElementById('video-intro');
    const introVideo = document.getElementById('intro-video');
    const videoSkip = document.getElementById('video-skip');
    const videoUnmute = document.getElementById('video-unmute');

    function dismissVideoIntro() {
        if (videoIntro.classList.contains('hiding')) return;
        videoIntro.classList.add('hiding');
        introVideo.pause();
        document.body.style.overflow = '';
        videoUnmute.style.display = 'none';
        setTimeout(() => {
            videoIntro.style.display = 'none';
        }, 800);
    }

    function showVideoIntro() {
        videoIntro.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Try playing with sound; if browser blocks, play muted and show unmute button
        introVideo.muted = false;
        introVideo.play().catch(() => {
            introVideo.muted = true;
            introVideo.play();
            videoUnmute.style.display = 'flex';
        });
    }

    videoUnmute.addEventListener('click', () => {
        introVideo.muted = false;
        videoUnmute.style.display = 'none';
    });

    introVideo.addEventListener('ended', dismissVideoIntro);
    videoSkip.addEventListener('click', dismissVideoIntro);

    let introStarted = false;

    function startIntro() {
        if (introStarted) return;
        introStarted = true;
        showVideoIntro();
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 300);
    }

    window.addEventListener('load', () => {
        setTimeout(startIntro, 1500);
    });

    // Fallback: hide preloader after 4 seconds max
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            startIntro();
        }
    }, 4000);

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ---- Mobile Navigation Toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Hero Slider ----
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 6000);
    }

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll(
        '.service-card, .fleet-card, .gallery-item, .about-feature, .stat-item, .contact-item, .about-img-main, .about-content, .video-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ---- Gallery Lightbox ----
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentGalleryIndex = 0;

    const galleryImages = Array.from(galleryItems).map(item => 
        item.querySelector('img').src
    );

    function openLightbox(index) {
        currentGalleryIndex = index;
        lightboxImg.src = galleryImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryIndex];
    }

    function nextImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentGalleryIndex];
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Contact Form Handler ----
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');

        // Build WhatsApp message
        const whatsappMsg = encodeURIComponent(
            `Hello OCKFAM!\n\n` +
            `*Name:* ${name}\n` +
            `*Email:* ${email}\n` +
            `*Phone:* ${phone || 'N/A'}\n` +
            `*Service:* ${service}\n` +
            `*Message:* ${message}`
        );

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/264813747209?text=${whatsappMsg}`, '_blank');

        // Show success feedback
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        btn.style.background = '#28a745';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });

    // ---- Stagger animation delays for grid items ----
    document.querySelectorAll('.services-grid .service-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.fleet-grid .fleet-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.gallery-grid .gallery-item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.08}s`;
    });

});
