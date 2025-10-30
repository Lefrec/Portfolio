import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new THREE.TextureLoader();
let animationLoopHandle = null;

function init() {
    const manContainer = document.getElementById('man');

    function getWidth() { 
        return manContainer.clientWidth
    }
    function getHeight() { 
        return manContainer.clientHeight
    }

    //basics
    const scene = new THREE.Scene();
    const width = getWidth();
    const height = getHeight();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );

    //light
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
    hemiLight.position.set( 0, 100, 0 );
    scene.add( hemiLight );

    //ascii effect renderer
    const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
    effect.setSize(width, height);
    //get css var from computed style
    function updateColors() {
        effect.domElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-main');
        effect.domElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-dark');
    }
    updateColors();
    //update colors when the LightSwitch is toggled
    window.addEventListener('toggled', updateColors);
    effect.domElement.style.width = '100%';
    effect.domElement.style.height = '100%';
    manContainer.appendChild(effect.domElement);

    let model, mixer;
    const modelLoader = new GLTFLoader();
    modelLoader.load( "/walking.glb", function ( gltf ) {
        model = gltf.scene;
        scene.add( model );
        //animation
        const animation = gltf.animations[0];
        mixer = new THREE.AnimationMixer( model );
        const action = mixer.clipAction( animation );
        action.play();
    })

    //camera positionning
    camera.position.z = 150;
    camera.position.y = 75;
    camera.position.x = 10;

    const clock = new THREE.Clock();
    //animation loop
    function animate() {
        effect.render( scene, camera );
        const delta = clock.getDelta();
        //not working need fix
        if (mixer) {
        mixer.update(delta);
        }
    }
    renderer.setAnimationLoop( animate );
    animationLoopHandle = animate;
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}