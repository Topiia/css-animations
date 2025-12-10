# Ultimate CSS Motion

A high-fidelity, pure CSS interactive 3D demo.

## Overview
This project demonstrates the power of modern CSS to create complex, performant, and interactive 3D experiences without a single line of JavaScript.

- **Zero JS**: All logic, state, and animation is pushed to the stylesheet.
- **Scroll Driven**: Uses `animation-timeline: scroll()` (with fallback) to map user scroll to 3D camera movement.
- **Interactive**: Uses the Checkbox Hack (`:checked`) to manage UI states like Wireframe Mode and Pause.
- **Performant**: Optimized for GPU compositing using `transform` and `opacity`.

## Key Techniques

### 1. The "Checkbox Hack" for State
We use hidden `<input type="checkbox">` elements at the top of the DOM. The UI buttons are `<label>` elements linked to these inputs.
In CSS, we use the sibling combinator `~` to style the scene based on the checkbox state:
```css
#toggle-wireframe:checked ~ .viewport .face { ... }
```

### 2. Scroll Timeline
We bind the animation timeline to the scroll position of the body:
```css
body { view-timeline-name: --scrollTimeline; }
.world { animation-timeline: --scrollTimeline; }
```
This allows us to scrub through keyframes based on scroll position rather than time.

### 3. CSS 3D Engine
We create a 3D scene using `perspective` on the container and `transform-style: preserve-3d` on the children. This preserves the 3D depth of nested elements (like the rotating rings inside the scene).

## Browser Support
- **Chrome / Edge (115+)**: Full support for Scroll-driven animations.
- **Firefox / Safari**: Will see the "Idle" animation fallback (continuous rotation) but fully functional 3D and interactivity.
