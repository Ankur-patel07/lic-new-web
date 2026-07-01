/**
 * Main Application Logic
 * Integrates GSAP and other modern effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Loader
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        if(loader) {
            loader.classList.add('hidden');
        }
    }, 500);

    // 2. Initialize AOS (Animate on Scroll)
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        // Sticky Header Effect
        const header = document.querySelector('.header');
        if(header) {
            if(scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                if(scrollTop < 10) header.classList.remove('scrolled');
            }
        }
    });

    // 4. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon (assuming FontAwesome is used)
            const icon = mobileBtn.querySelector('i');
            if(icon) {
                if(navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 4.1 Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                // If it's the link itself, prevent default to open menu instead of navigating
                // But only prevent if it's not already active
                if(e.target.tagName.toLowerCase() === 'a' && !dropdown.classList.contains('active')) {
                    e.preventDefault();
                }
                dropdown.classList.toggle('active');
            }
        });
    });

    // 5. GSAP Text Reveal Animation
    if(typeof gsap !== 'undefined') {
        const revealTexts = document.querySelectorAll('.reveal-text');
        revealTexts.forEach(text => {
            // Split text to spans if not already done
            if(!text.querySelector('span')) {
                const words = text.innerText.split(' ');
                text.innerHTML = '';
                words.forEach(word => {
                    const span = document.createElement('span');
                    span.innerText = word + ' ';
                    text.appendChild(span);
                });
            }
            
            gsap.to(text.querySelectorAll('span'), {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 80%',
                },
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        });
    }
    
    // 6. Number Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    if(counters.length > 0 && typeof gsap !== 'undefined') {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            /* Fix: set min-width to prevent layout reflow during animation */
            counter.style.display = 'inline-block';
            counter.style.minWidth = (String(target).length + 1) + 'ch';
            counter.style.textAlign = 'right';
            const obj = { val: 0 };
            gsap.to(obj, {
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 85%'
                },
                val: target,
                duration: 2,
                ease: "power1.inOut",
                onUpdate: function() {
                    counter.textContent = Math.ceil(obj.val);
                }
            });
        });
    }
});
