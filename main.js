import * as THREE from 'three';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8f0); // Цвет фона

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 5;
const minZ = -3000;
const maxZ = 20;

// Элемент для отображения позиции камеры
// const positionDisplay = document.createElement('div');
// positionDisplay.style.position = 'absolute';
// positionDisplay.style.top = '10px';
// positionDisplay.style.left = '10px';
// positionDisplay.style.color = 'white';
// document.body.appendChild(positionDisplay);

// Обработчик события прокрутки мыши
window.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (event.deltaY < 0) {
    camera.position.z -= 5;
  } else {
    camera.position.z += 5;
  }

  camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z));
  // positionDisplay.innerText = `Camera Position Z: ${camera.position.z.toFixed(2)}`;
});

// Отрисовщик
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 30);
scene.add(directionalLight);

// Дома
const houseGeometry1 = new THREE.BoxGeometry(5, 10, 5);
const houseGeometry2 = new THREE.BoxGeometry(5, 20, 5);
const houseMaterials = [
  new THREE.MeshLambertMaterial({ color: 0xff5555 }),
  new THREE.MeshLambertMaterial({ color: 0x55ff55 }),
  new THREE.MeshLambertMaterial({ color: 0x5555ff })
];

for (let i = 0; i < 300; i++) {
  const geometry = i % 2 === 0 ? houseGeometry1 : houseGeometry2;
  const material = houseMaterials[Math.floor(Math.random() * houseMaterials.length)];

  const houseLeft = new THREE.Mesh(geometry, material);
  houseLeft.position.set(-20, geometry.parameters.height / 2, -i * 10);
  scene.add(houseLeft);

  const houseRight = new THREE.Mesh(geometry, material);
  houseRight.position.set(20, geometry.parameters.height / 2, -i * 10);
  scene.add(houseRight);
}

// Анимация
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
