import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

const loader = new THREE.TextureLoader();
let animationLoopHandle = null;

function init() {
    const resumeContainer = document.getElementById('resume');

    function getWidth() { 
        return resumeContainer.clientWidth
    }
    function getHeight() { 
        return resumeContainer.clientHeight
    }

    // basics
    const scene = new THREE.Scene();
    const width = getWidth();
    const height = getHeight();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // ascii effect renderer
    const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
    effect.setSize(width, height);
    function updateColors() {
        effect.domElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-main');
        effect.domElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-dark');
    }
    updateColors();
    window.addEventListener('toggled', updateColors);
    effect.domElement.style.width = '100%';
    effect.domElement.style.height = '100%';
    resumeContainer.appendChild(effect.domElement);

    // plane with a texture
    const texture = loader.load('/CV_Paolo_Vincent.png');
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 10),
        new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true })
    );
    scene.add(plane);

    // responsive resize
    function onWindowResize() {
        const newWidth = getWidth();
        const newHeight = getHeight();
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        effect.setSize(newWidth, newHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // camera positioning
    camera.position.z = 12;

    const clock = new THREE.Clock();

    // animation loop
    function animate() {
        const elapsed = clock.getElapsedTime();
        //animation const
        const rotationSpeed = 0.5;
        const bounceSpeed = 1;
        const bounceRange = 0.8;
        //horizontal rotation
        plane.rotation.y = elapsed * rotationSpeed;
        //vertical bounce
        plane.position.y = Math.sin(elapsed*bounceSpeed)*bounceRange;
        // ascii rendering
        effect.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
    animationLoopHandle = animate;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}