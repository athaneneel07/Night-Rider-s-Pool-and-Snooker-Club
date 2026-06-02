// Theme Switcher Logic
const themeSwitch = document.getElementById('themeSwitch');
const htmlDoc = document.documentElement;

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        const currentTheme = htmlDoc.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlDoc.setAttribute('data-theme', newTheme);
    });
}

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    document.querySelectorAll('.nav-links a').forEach(link => { 
        link.addEventListener('click', () => { navLinks.classList.remove('active'); }); 
    });
}

// Header Scroll Sizing Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.top = '15px';
        } else {
            header.style.top = '25px';
        }
    }
});

// Pricing Tabs Switch Logic
window.switchPricing = function(tabId) {
    const tabBtn = event.target;
    const pricingContent = document.getElementById('price-' + tabId);
    if (tabBtn && pricingContent) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.pricing-content').forEach(content => content.classList.remove('active'));
        tabBtn.classList.add('active');
        pricingContent.classList.add('active');
    }
};

// Inquiry Form Logic
const mailForm = document.getElementById('tattvaMailEngine');
if (mailForm) {
    mailForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const name = document.getElementById('entryName').value;
        const phone = document.getElementById('entryPhone').value;
        const email = document.getElementById('entryEmail').value;
        const location = document.getElementById('entryLocation').value;
        const requirement = document.getElementById('entryReq').value;
        const doubts = document.getElementById('entryDoubts') ? document.getElementById('entryDoubts').value : "Inquiry Form Submit";

        const mailSubject = encodeURIComponent(`Tattva Grid Architecture Inquiry - ${name}`);
        const mailBody = encodeURIComponent(
            `====== TATTVA GRID DEPLOYMENT MANIFEST ======\n\n` +
            `Executive Name: ${name}\n` +
            `Contact Node: ${phone}\n` +
            `Secure Route: ${email}\n` +
            `Deployment Location: ${location}\n` +
            `Selected Infrastructure: ${requirement}\n\n` +
            `Operational Details / Custom Requirements:\n${doubts}\n\n` +
            `=============================================`
        );
        window.location.href = `mailto:tattvagrids@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    });
}

// Intersection Observer (Dynamic Scroll-triggered reveal animations)
document.addEventListener("DOMContentLoaded", function() {
    const revealsUp = document.querySelectorAll(".reveal-up");
    const revealsScale = document.querySelectorAll(".reveal-scale");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { root: null, threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealsUp.forEach(el => revealObserver.observe(el));
    revealsScale.forEach(el => revealObserver.observe(el));

    // Numbers Progressing Animation logic
    const statsNumbers = document.querySelectorAll(".stat-number");
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetVal = parseInt(targetElement.getAttribute("data-target"), 10);
                let currentVal = 0;
                const duration = 1500; 
                const steps = 60;
                const stepIncrement = targetVal / steps;
                const intervalTime = duration / steps;

                const countInterval = setInterval(() => {
                    currentVal += stepIncrement;
                    if (currentVal >= targetVal) {
                        targetElement.innerText = targetVal + "+";
                        clearInterval(countInterval);
                    } else {
                        targetElement.innerText = Math.floor(currentVal) + "+";
                    }
                }, intervalTime);

                statsObserver.unobserve(targetElement); 
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => statsObserver.observe(stat));
});

// Testimonials Row Slide-Parallax loop logic
const reviewsSection = document.getElementById('reviews');
const track1 = document.getElementById('track1');
const track2 = document.getElementById('track2');

if (reviewsSection && track1 && track2) {
    let currentTranslate1 = 0;
    let targetTranslate1 = 0;
    let currentTranslate2 = -150;
    let targetTranslate2 = -150;

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 1024) {
            const rect = reviewsSection.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            if (rect.top < viewHeight && rect.bottom > 0) {
                const scrollProgress = (viewHeight - rect.top) / (viewHeight + rect.height);
                targetTranslate1 = (scrollProgress * -320); 
                targetTranslate2 = ((scrollProgress * 320) - 220);
            }
        }
    });

    function smoothScrollLoop() {
        if (window.innerWidth > 1024) {
            currentTranslate1 += (targetTranslate1 - currentTranslate1) * 0.08;
            currentTranslate2 += (targetTranslate2 - currentTranslate2) * 0.08;

            track1.style.transform = `translateX(${currentTranslate1}px)`;
            track2.style.transform = `translateX(${currentTranslate2}px)`;
        } else {
            track1.style.transform = 'none';
            track2.style.transform = 'none';
        }
        requestAnimationFrame(smoothScrollLoop);
    }

    smoothScrollLoop();
}