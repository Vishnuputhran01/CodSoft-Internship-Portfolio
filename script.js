// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LOADING SCREEN
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 2000);
    
    // 2. TYPEWRITER EFFECT
    const typewriterText = document.querySelector('.typewriter-text');
    const texts = [
        'Basic Cloud Computing Developer',
        'AI Chatbot Developer',
        'Web Developer',
        'Student',
        'Tech Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if text is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typewriter after loading
    setTimeout(typeEffect, 2000);
    
    // 3. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // 4. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // Navbar effect
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // 5. UPDATE ACTIVE NAV LINK
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // 6. FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // 7. SKILL BAR ANIMATION
    function animateSkillBars() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        skillProgressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Animate skill bars when section comes into view
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // 8. THEME TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
    
    // 9. PROJECT CARD HOVER EFFECTS
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 10. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 11. DARK THEME STYLES
    const style = document.createElement('style');
    style.textContent = `
        .dark-theme {
            background-color: #1a1a2e;
            color: #ffffff;
        }
        
        .dark-theme .navbar {
            background-color: #16213e;
        }
        
        .dark-theme .logo-text {
            color: #ffffff;
        }
        
        .dark-theme .nav-link {
            color: #ffffff;
        }
        
        .dark-theme .section-title {
            color: #ffffff;
        }
        
        .dark-theme .skill-category,
        .dark-theme .project-card,
        .dark-theme .timeline-content,
        .dark-theme .contact-form {
            background-color: #16213e;
            color: #ffffff;
        }
        
        .dark-theme .project-title,
        .dark-theme .about-text h3,
        .dark-theme .detail-item strong {
            color: #ffffff;
        }
        
        .dark-theme .about-text p,
        .dark-theme .project-description,
        .dark-theme .timeline-content p {
            color: #b0b0b0;
        }
        
        .dark-theme .footer {
            background-color: #0f3460;
        }
        
        .dark-theme .menu-toggle,
        .dark-theme .theme-toggle {
            color: #ffffff;
        }
    `;
    document.head.appendChild(style);
    
    // 12. INITIAL ACTIVE LINK
    updateActiveNavLink();
});