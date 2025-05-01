// Parallax Scrolling Effect
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Start smooth scrolling
    requestAnimationFrame(raf);

    // Parallax effect for hero section
    const heroImage = document.querySelector('.hero-image img');
    const shapes = document.querySelectorAll('.floating-shape');
    
    // Parallax effect for each section
    const sections = document.querySelectorAll('section');
    
    // Function to handle parallax on scroll
    function handleParallax() {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Parallax for floating shapes
        shapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.03);
            shape.style.transform = `translate(${scrollY * speed}px, ${scrollY * speed * 1.5}px)`;
        });
        
        // Parallax for sections (creates a subtle depth effect)
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
                const yPos = (scrollY - sectionTop) * 0.05;
                section.style.backgroundPositionY = `${yPos}px`;
                
                // For section titles
                const title = section.querySelector('.section-title');
                if (title) {
                    title.style.transform = `translateY(${(scrollY - sectionTop) * 0.03}px)`;
                }
            }
        });
    }
    
    // Update parallax on scroll and resize
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('resize', handleParallax);
    
    // Initial call
    handleParallax();
    
    // Parallax effect on mouse move for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            if (heroImage) {
                heroImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
            }
            
            shapes.forEach((shape, index) => {
                const speed = 30 + (index * 15);
                shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });
        
        // Reset transform when mouse leaves
        hero.addEventListener('mouseleave', () => {
            if (heroImage) {
                heroImage.style.transform = 'translate(0, 0)';
            }
            
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    }
}); 