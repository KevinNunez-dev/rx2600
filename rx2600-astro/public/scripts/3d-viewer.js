// ─── 3D Model Viewer using Three.js ───

let scene, camera, renderer, model;

function init3DViewer() {
  const canvas = document.getElementById('3d-viewer');
  if (!canvas) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff6b5b, 1);
  pointLight.position.set(-5, 5, 5);
  scene.add(pointLight);

  // Load GLB model
  const loader = new THREE.GLTFLoader();
  loader.load(
    'https://rx2600.com/wp-content/uploads/2024/09/AR-BED.glb',
    (gltf) => {
      model = gltf.scene;
      scene.add(model);

      // Center and scale model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 4 / maxDim;
      model.scale.multiplyScalar(scale);

      // Auto-rotate
      animateModel();
    },
    (progress) => {
      // Optional: handle progress
    },
    (error) => {
      console.error('Error loading model:', error);
      // Fallback to image if model fails to load
      loadFallbackImage();
    }
  );

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  render();
}

function animateModel() {
  requestAnimationFrame(animateModel);

  if (model) {
    model.rotation.x += 0.002;
    model.rotation.y += 0.005;
  }

  // Parallax effect based on scroll
  const scrollProgress = window.scrollY / window.innerHeight;
  camera.position.y = 2 + scrollProgress * 0.5;

  render();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  const canvas = document.getElementById('3d-viewer');
  if (!canvas) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function loadFallbackImage() {
  const canvas = document.getElementById('3d-viewer');
  const parent = canvas?.parentElement;
  if (!parent) return;

  const img = document.createElement('img');
  img.src = 'https://rx2600.com/wp-content/uploads/2025/02/robot-main.png';
  img.alt = 'RX2600 Therapeutic Robot';
  img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';

  canvas.style.display = 'none';
  parent.appendChild(img);
}

// Load Three.js library and initialize
document.addEventListener('DOMContentLoaded', () => {
  // Create script tag for Three.js
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = () => {
    // Load GLTFLoader
    const loaderScript = document.createElement('script');
    loaderScript.src = 'https://cdn.jsdelivr.net/npm/three@r128/examples/js/loaders/GLTFLoader.js';
    loaderScript.onload = () => {
      init3DViewer();
    };
    document.head.appendChild(loaderScript);
  };
  document.head.appendChild(script);
});

// Handle parallax scroll
let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (model) {
          const scrollProgress = window.scrollY / window.innerHeight;
          model.rotation.z = scrollProgress * 0.3;
        }
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);
