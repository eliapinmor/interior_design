<template>
<div class="sidebar-container">
    <h3>Muebles</h3>
    <div class="furniture-list">
      <div 
        v-for="item in furnitureItems" 
        :key="item.id"
        class="furniture-item"
        draggable="true"
        @dragstart="onDragStart($event, item)"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
//lista de muebles
const furnitureItems = [
  { id: 'chair', name: 'Silla', icon: '🪑' },
  { id: 'table', name: 'Mesa', icon: '🖼️' },
  { id: 'bed', name: 'Cama', icon: '🛏️' },
  { id: 'lamp', name: 'Lámpara', icon: '💡' },
];


</script>
<style scoped>
</style>