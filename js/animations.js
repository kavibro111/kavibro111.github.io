// Splash Screen Handler
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    
    // Hide splash screen when all content is loaded
    window.addEventListener('load', () => {
        // Add a small delay to ensure animations are visible
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Remove splash screen from DOM after animation
            setTimeout(() => {
                splashScreen.remove();
            }, 500);
        }, 2000); // Show splash screen for at least 2 seconds
    });
});

// Animations
document.addEventListener('DOMContentLoaded', () => {
    // Text reveal animation
    const revealTextElements = document.querySelectorAll('.reveal-text');
    
    const observerOptions = {
        root: null,
        rootMargin: '50px 0px', // Increased margin for earlier detection
        threshold: 0.05 // Lower threshold for earlier triggering
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealTextElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Staggered animations for card elements
    const cardElements = [
        ...document.querySelectorAll('.skill-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.achievement-card')
    ];
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Get all siblings of same type
                const siblings = [...entry.target.parentNode.children].filter(
                    child => child.classList.contains(entry.target.classList[0])
                );
                const siblingIndex = siblings.indexOf(entry.target);
                
                // Add animation class with delay based on sibling index
                // Reduced delay between cards for faster appearance
                entry.target.style.animationDelay = `${siblingIndex * 0.05}s`;
                entry.target.classList.add('animate-card');
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cardElements.forEach(el => {
        cardObserver.observe(el);
    });
    
    // Mobile menu animation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-menu-active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            
            if (navMenu.classList.contains('mobile-menu-active')) {
                // Animate to X
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                
                // Animate menu items
                const menuItems = navMenu.querySelectorAll('li');
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${0.1 + (index * 0.05)}s`;
                    item.classList.add('animate-menu-item');
                });
            } else {
                // Reset to burger
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Reset menu items
                const menuItems = navMenu.querySelectorAll('li');
                menuItems.forEach(item => {
                    item.classList.remove('animate-menu-item');
                });
            }
        });
    }
}); 