// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on saved preference or OS preference
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        body.classList.add('dark-mode');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        // Toggle dark mode class
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}); 