// Main Script - Initializes all components
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav item
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                
                this.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.querySelector('nav ul');
                if (navMenu.classList.contains('mobile-menu-active')) {
                    navMenu.classList.remove('mobile-menu-active');
                    // Reset hamburger icon
                    const spans = document.querySelectorAll('.mobile-menu-btn span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });
    
    // Active nav item on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    function setActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= (sectionTop - 200) && window.scrollY < (sectionTop + sectionHeight - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initialize form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for your message! I\'ll get back to you soon.</p></div>';
        });
    }

    // Add CSS for scrolled header and success message
    const style = document.createElement('style');
    style.textContent = `
        header.scrolled {
            height: 70px;
            background-color: var(--bg-primary);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
            color: #10b981;
        }
        
        .success-message i {
            font-size: 3rem;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);
});
 