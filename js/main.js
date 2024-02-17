import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

// Initialize Three.js scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create a point light
const floorLight = new THREE.PointLight(0xffffff, 0.1, 10);
floorLight.position.set(0, 1.6, 0); 
scene.add(floorLight);

// Sphere light geometry
const sphereLightGeometry = new THREE.SphereGeometry(0.1, 16, 16); // Adjust radius and segments as needed
const sphereLightMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 }); // Adjust material properties as needed
const sphereLightMesh = new THREE.Mesh(sphereLightGeometry, sphereLightMaterial);
sphereLightMesh.position.set(0, 1.3, 0); // Position the sphere light
scene.add(sphereLightMesh);

// Light for the sphere light
const sphereLight = new THREE.PointLight(0xffff00, 1, 5);
sphereLight.position.copy(sphereLightMesh.position); // Position the point light at the same position as the sphere light mesh
scene.add(sphereLight);

// Surfaces
const farwallGeometry = new THREE.BoxGeometry(3, 3, 0.2);
const sidewallGeometry = new THREE.BoxGeometry(0.2, 3, 3);
const floorGeometry = new THREE.BoxGeometry(3, 0.2, 3);

// Load texture image
const textureLoader = new THREE.TextureLoader();
const farwalltexture = textureLoader.load('textures/wallpaper.jpg');
const floortexture = textureLoader.load('textures/floor.jpg');
const sidewalltexture = textureLoader.load('textures/sidewall.jpg');

// Create materials for surfaces
const farwallMaterial = new THREE.MeshPhongMaterial({ map: farwalltexture  });
const sidewallMaterial = new THREE.MeshStandardMaterial({ map: sidewalltexture });
const floorMaterial = new THREE.MeshToonMaterial({ map: floortexture });

// Create mesh for each surface
const farwallMesh = new THREE.Mesh(farwallGeometry, farwallMaterial);
const sidewallMesh = new THREE.Mesh(sidewallGeometry, sidewallMaterial);
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

// Position surfaces
farwallMesh.position.set(0, 0, -1.6);
sidewallMesh.position.set(1.6, 0, 0);
floorMesh.position.set(0, -1.6, 0);

// Add surfaces to scene
scene.add(farwallMesh);
scene.add(sidewallMesh);
scene.add(floorMesh);

// Add orbital camera control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
