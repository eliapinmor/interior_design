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
        <div class="icon">{{ item.icon }}</div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
//lista de muebles
const furnitureItems = [
  { id: 'chair', name: 'Silla', icon: '🪑', modelPath: 'models/chair.glb' },
  { id: 'table', name: 'Mesa', icon: '🖼️', modelPath: 'models/table.glb' },
  { id: 'bed', name: 'Cama', icon: '🛏️', modelPath: 'models/bed.glb' },
  { id: 'bedDouble', name: 'Cama Doble', icon: '🛏️', modelPath: 'models/bedDouble.glb' },
  { id: 'lamp', name: 'Lámpara', icon: '💡', modelPath: 'models/lamp.glb' },
  { id: 'rug', name: 'Alfombra', icon: '🧷', modelPath: 'models/rug.glb' },
  { id: 'bookcase', name: 'Librería', icon: '📚', modelPath: 'models/bookcase.glb' },
];

const onDragStart = (event, item) => {
  event.dataTransfer.setData('furnitureId', item.id);
};
</script>
<style scoped>
.sidebar-container {
  padding: 20px;
  height: 100%;
}
.furniture-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.furniture-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  border: #ccccc9 1px solid;
  border-radius: 8px;
  cursor: grab;
}

.icon{
  overflow: hidden;
  border-right: #ccccc9 1px solid;
  padding: 10px;
}
.name{
  padding: 10px;
}
</style>