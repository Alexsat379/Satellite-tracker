import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export function createISS(parentGeometry) {
    
    const issGroup = new THREE.Group();
    issGroup.visible = false;
    parentGeometry.add(issGroup);

    const issDiv = document.createElement('div');
    issDiv.className = 'iss-label';
    issDiv.textContent = 'ISS';

    const issLabel = new CSS2DObject(issDiv);
    issLabel.position.set(0, 0.05, 0);
    issGroup.add(issLabel);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://unpkg.com/three@0.150.1/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);
    loader.load('./assets/models/iss.glb', (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.005, 0.005, 0.005);
        issGroup.add(model);
    }, undefined, (error) => {
        console.error('Error loading ISS model:', error);
    });

    return issGroup;
}