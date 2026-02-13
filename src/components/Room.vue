<template>
  <div ref="container" class="canvas-container"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const container = ref(null);

onMounted(() => {
  // 1. Escena
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // 2. Cámara
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);

  // 3. Renderizador
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight); // Ajusta al tamaño de tu main
  container.value.appendChild(renderer.domElement);

  // 4. Controles (OrbitControls)
  const controls = new OrbitControls(camera, renderer.domElement);

  // 5. La "Habitación" (Suelo básico)
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2; // Acostar el plano
  scene.add(floor);

  // 6. Luz (Si no, verás todo negro)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // 7. Animación
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});
</script>
<style>
.canvas-container{
width: 100%;
  height: 100%;
  outline: none;}
</style>