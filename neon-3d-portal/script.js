document.addEventListener('DOMContentLoaded', () => {
    const tunnel = document.getElementById('tunnel');
    const depthValue = document.getElementById('depth-value');
    const tunnelLength = 10000; // Must match CSS var --tunnel-length roughly
    const numRings = 30;
    const ringSpacing = tunnelLength / numRings;

    // 1. Generate Rings
    for (let i = 0; i < numRings; i++) {
        const ring = document.createElement('div');
        ring.classList.add('ring');

        // Randomize shapes
        const shapeType = Math.random();
        if (shapeType > 0.7) ring.classList.add('square');
        else if (shapeType > 0.9) ring.classList.add('triangle');

        // Position in 3D space
        // We place them from Z = -500 down to -tunnelLength
        // negative Z is "far away" in CSS
        const zPos = - (i * ringSpacing);
        
        // Random slight Rotation and Scale for organic feel
        const scale = 0.5 + Math.random() * 2.5; // Random size
        const rotZ = Math.random() * 360;
        
        // Apply transform. 
        // Note: We use inline styles for the static initial positions.
        ring.style.transform = `translateZ(${zPos}px) rotateZ(${rotZ}deg) scale(${scale})`;
        
        // Random opacity/color tweaking could go here
        ring.style.opacity = Math.max(0.2, Math.random() * 0.8);

        tunnel.appendChild(ring);
    }

    // 2. Scroll Interaction
    // We update the CSS variable --scroll-pos based on window scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Avoid division by zero
        if (scrollHeight <= 0) return;

        const scrollProgress = scrollTop / scrollHeight;
        
        // Update CSS variable
        // --scroll-pos goes from 0 to 1
        document.body.style.setProperty('--scroll-pos', scrollProgress);

        // Update UI Depth Meter
        const currentDepth = Math.round(scrollProgress * 10000);
        depthValue.innerText = currentDepth;

        // Optional: dynamic rotation of the whole world based on scroll
        // Gives a "corkscrew" effect as you travel
        const world = document.getElementById('world');
        const rotation = scrollProgress * 180; // Rotate 180 degrees over full scroll
        world.style.transform = `translate(-50%, -50%) rotateZ(${rotation}deg)`;
    });

    // 3. Initial Trigger
    // Trigger scroll event once to set initial state
    window.dispatchEvent(new Event('scroll'));
});
