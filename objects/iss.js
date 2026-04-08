import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function createISS(parentGeometry) {
    const geometry = new THREE.SphereGeometry(0.02, 16, 16);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, depthTest: false});
    const mesh = new THREE.Mesh(geometry, material);

    const issDiv = document.createElement('div');
    issDiv.className = 'iss-label';
    issDiv.textContent = 'ISS';

    const issLabel = new CSS2DObject(issDiv);
    issLabel.position.set(0, 0.05, 0);
    mesh.add(issLabel);

    parentGeometry.add(mesh);
    return mesh;
}