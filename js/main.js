// Neil Ruskin Law Firm - Main JS

document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // --- Sticky Navbar Shadow ---
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Scroll-In Animations ---
    const animatedCards = document.querySelectorAll(
        '.feature-card, .practice-card, .testimonial-card, .area-card'
    );

    if (animatedCards.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        animatedCards.forEach(function (card, index) {
            // Stagger the animation
            card.style.transitionDelay = (index % 4) * 0.1 + 's';
            observer.observe(card);
        });
    } else {
        // Fallback: show all immediately
        animatedCards.forEach(function (card) {
            card.classList.add('visible');
        });
    }

    // --- Mobile dropdown toggle (tap to open on mobile) ---
    const dropdownParents = document.querySelectorAll('.has-dropdown');

    dropdownParents.forEach(function (parent) {
        const link = parent.querySelector(':scope > a');
        if (link && window.innerWidth <= 768) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                parent.classList.toggle('dropdown-open');
            });
        }
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Chatbot Widget ---
    (function () {
        var isSubpage = window.location.pathname.indexOf('/pages/') !== -1;
        var imgBase = isSubpage ? '../images/' : 'images/';
        var chatbotURL = 'https://joelngala.github.io/sphericalassistant/?page=intake&firm=Neil+Ruskin+Law+Firm';

        // Build bubble
        var bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.setAttribute('aria-label', 'Open chat');
        bubble.innerHTML =
            '<img src="' + imgBase + 'virtual-consultant.png" alt="Gia Caruso">' +
            '<span class="bubble-pulse"></span>';

        // Build teaser message that pops up next to the bubble
        var teaser = document.createElement('div');
        teaser.className = 'chatbot-teaser';
        teaser.innerHTML =
            '<button class="chatbot-teaser-close" aria-label="Dismiss">&times;</button>' +
            '<div class="chatbot-teaser-name">Gia Caruso</div>' +
            '<div class="chatbot-teaser-text">Hi! Have a question about your case? I can help — tap to chat.</div>';

        // Build chat window
        var win = document.createElement('div');
        win.className = 'chatbot-window';
        win.innerHTML =
            '<div class="chatbot-header">' +
                '<img src="' + imgBase + 'virtual-consultant.png" alt="Gia Caruso">' +
                '<div class="chatbot-header-info">' +
                    '<div class="chatbot-header-name">Gia Caruso</div>' +
                    '<div class="chatbot-header-status">Online now</div>' +
                '</div>' +
                '<button class="chatbot-close" aria-label="Close chat">&times;</button>' +
            '</div>' +
            '<div class="chatbot-body">' +
                '<iframe src="' + chatbotURL + '" title="Chat with Gia Caruso" allow="microphone"></iframe>' +
            '</div>';

        document.body.appendChild(bubble);
        document.body.appendChild(teaser);
        document.body.appendChild(win);

        function openChat() {
            win.classList.add('open');
            bubble.style.display = 'none';
            teaser.classList.remove('visible');
            document.body.classList.add('chatbot-open');
        }

        function closeChat() {
            win.classList.remove('open');
            bubble.style.display = '';
            document.body.classList.remove('chatbot-open');
        }

        function dismissTeaser(e) {
            if (e) e.stopPropagation();
            teaser.classList.remove('visible');
        }

        bubble.addEventListener('click', openChat);
        win.querySelector('.chatbot-close').addEventListener('click', closeChat);
        teaser.addEventListener('click', openChat);
        teaser.querySelector('.chatbot-teaser-close').addEventListener('click', dismissTeaser);

        // Show the teaser message after a short delay instead of opening the full chat.
        setTimeout(function () { teaser.classList.add('visible'); }, 2000);
    })();

    // --- Contact form demo handling ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const subject = 'Consultation Request - Neil Ruskin Law Firm';
            const lines = [
                'Full Name: ' + (formData.get('name') || ''),
                'Phone Number: ' + (formData.get('phone') || ''),
                'Email Address: ' + (formData.get('email') || ''),
                'Type of Charge: ' + (formData.get('case-type') || ''),
                '',
                'Brief Description:',
                formData.get('message') || ''
            ];
            const body = encodeURIComponent(lines.join('\n'));
            const mailtoHref = 'mailto:info@neilruskinlawfirm.com?subject=' +
                encodeURIComponent(subject) + '&body=' + body;

            if (formSuccess) {
                formSuccess.hidden = false;
            }

            window.location.href = mailtoHref;
        });
    }

});
