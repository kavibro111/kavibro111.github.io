// Three.js Background Animation
const createThreeBackground = () => {
    // Initialize scene, camera, and renderer
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Set colors based on current theme
    function updateColors() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const primaryColor = isDarkMode ? 
            new THREE.Color(0x5A7A4C) : // Olive green for dark mode
            new THREE.Color(0x4D6A3F); // Olive green for light mode
        const secondaryColor = isDarkMode ? 
            new THREE.Color(0x8A6D3B) : // Warm brown for dark mode
            new THREE.Color(0x617B52); // Lighter green for light mode
        
        for (let i = 0; i < particlesCount; i++) {
            // Random position in 3D space
            posArray[i * 3 + 0] = (Math.random() - 0.5) * 10;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
            
            // Alternate between primary and secondary colors
            const color = i % 2 === 0 ? primaryColor : secondaryColor;
            colorsArray[i * 3 + 0] = color.r;
            colorsArray[i * 3 + 1] = color.g;
            colorsArray[i * 3 + 2] = color.b;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    }
    
    // Call initial color setup
    updateColors();
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    // Create particle mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 3;
    
    // Create a group for particles to make animation easier
    const particlesGroup = new THREE.Group();
    particlesGroup.add(particlesMesh);
    scene.add(particlesGroup);
    
    // Event listener for mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -((event.clientY / window.innerHeight) * 2 - 1);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Listen for theme changes
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Small delay to match the CSS transition
            setTimeout(updateColors, 300);
        });
    }

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate particles slowly
        particlesGroup.rotation.x += 0.0005;
        particlesGroup.rotation.y += 0.0005;
        
        // Follow mouse with subtle movement
        particlesGroup.rotation.x += mouseY * 0.0008;
        particlesGroup.rotation.y += mouseX * 0.0008;
        
        renderer.render(scene, camera);
    };
    
    animate();
};

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', createThreeBackground); 