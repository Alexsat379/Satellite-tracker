import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getISSPosition } from './api/iss.js';
import { createISS } from './objects/iss.js';
import { latLonToXYZ } from './utils/coords.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


// Create a scene
const scene = new THREE.Scene();

//Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3;
controls.maxDistance = 20;
controls.enablePan = false;

//Create Earth and its texture
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('assets/textures/earth.jpg');
const material = new THREE.MeshBasicMaterial({
    map: earthTexture
});
const geometry = new THREE.SphereGeometry(1, 32, 32);
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);


camera.position.z = 5;

const iss = createISS(earth);
updateISS();
async function updateISS(){
    const pos = await getISSPosition();
    const coords = latLonToXYZ(pos.lat, pos.lon, 1.06);
    iss.position.set(coords.x, coords.y, coords.z);
}
setInterval(updateISS, 2000);

function animate(time){
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001;
    iss.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

animate();

