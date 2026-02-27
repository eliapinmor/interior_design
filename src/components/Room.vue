<template>
  <div
    ref="container"
    class="canvas-container"
    @dragover.prevent
    @drop="handleDrop"
    @click="handleClick"
  ></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRoomStore } from "@/stores/roomStore";

let scene, camera, renderer, floor;
const loader = new GLTFLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const store = useRoomStore();

const container = ref(null);
const selectedFurniture = ref(null);

onMounted(() => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  store.setStore(scene);
  window.addEventListener("keydown", handleKeyDown);
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(5, 5, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  //
  const controls = new OrbitControls(camera, renderer.domElement);

  //suelo
  const geometry = new THREE.PlaneGeometry(5, 5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xf2ece6,
    side: THREE.DoubleSide,
  });
  floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  //paredes
  const wallHeight = 2.5;
  const wallWidth = 5;
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf2ece6,
  });

  const wall1 = new THREE.Mesh(
    new THREE.PlaneGeometry(wallWidth, wallHeight),
    wallMaterial,
  );
  wall1.position.set(0, wallHeight / 2, -2.5);
  scene.add(wall1);

  const wall2 = new THREE.Mesh(
    new THREE.PlaneGeometry(wallWidth, wallHeight),
    wallMaterial,
  );
  wall2.position.set(-2.5, wallHeight / 2, 0);
  wall2.rotation.y = Math.PI / 2;
  scene.add(wall2);

  const wall3 = new THREE.Mesh(
    new THREE.PlaneGeometry(wallWidth, wallHeight),
    wallMaterial,
  );
  wall3.position.set(2.5, wallHeight / 2, 0);
  wall3.rotation.y = -Math.PI / 2;
  scene.add(wall3);

  const wall4 = new THREE.Mesh(
    new THREE.PlaneGeometry(wallWidth, wallHeight),
    wallMaterial,
  );
  wall4.position.set(0, wallHeight / 2, 2.5);
  wall4.rotation.y = Math.PI;
  scene.add(wall4);

  // iluminacion
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);
  const fillLight = new THREE.PointLight(0xffffff, 1);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  // 7. Animación
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});

const handleDrop = (event) => {
  const furnitureId = event.dataTransfer.getData("furnitureId");

  const rect = container.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(floor);

  if (intersects.length > 0) {
    const point = intersects[0].point;

    cargarModelo3d(furnitureId, point);
  }
};
const cargarModelo3d = (id, position) => {
  const path = `/models/${id}.glb`;

  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.children.forEach((child) => {
        child.position.x -= center.x;
        child.position.z -= center.z;
      });
      model.position.copy(position);

      scene.add(model);
      store.addFurnitureItem(model);

      console.log(`${id} añadido a la escena`);
    },
    undefined,
    (error) => {
      console.error("Error cargando el modelo:", error);
    },
  );
};

const handleClick = (event) => {
  const rect = container.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(
    store.furnitureItemsOnMap,
    true,
  );

  if (intersects.length > 0) {
    let furnitureItem = intersects[0].object;
    while (
      furnitureItem.parent &&
      !store.furnitureItemsOnMap.includes(furnitureItem)
    ) {
      furnitureItem = furnitureItem.parent;
    }
    if (selectedFurniture.value && selectedFurniture.value !== furnitureItem) {
      deselectItem(selectedFurniture.value);
    }
    selectedFurniture.value = furnitureItem;
    selectItem(furnitureItem);
  } else {
    if (selectedFurniture.value) {
      deselectItem(selectedFurniture.value);
    }
  }
};
const selectItem = (obj) => {
  selectedFurniture.value = obj;
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material.emissive.setHex(0x7b68ee);
      child.material.emissiveIntensity = 1.5;
    }
  });
};
const deselectItem = (obj) => {
  selectedFurniture.value = null;
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material.emissive.setHex(0x000000);
      child.material.emissiveIntensity = 0;
    }
  });
};
const handleKeyDown = (event) => {
  if (!selectedFurniture.value) return;
  const step = 0.1;
  switch (event.code) {
    case "ArrowUp":
      selectedFurniture.value.position.z -= step;
      break;
    case "ArrowDown":
      selectedFurniture.value.position.z += step;
      break;
    case "ArrowLeft":
      selectedFurniture.value.position.x -= step;
      break;
    case "ArrowRight":
      selectedFurniture.value.position.x += step;
      break;
    case "Backspace":
    case "Delete":
      store.deleteFurnitureItem(selectedFurniture.value);
      break;
    case "Space":
    case "KeyR":
      selectedFurniture.value.rotation.y += Math.PI / 2;
      break;
  }
};
</script>
<style>
.canvas-container {
  width: 100%;
  height: 100%;
  outline: none;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
