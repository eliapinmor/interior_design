<template>
  <div class="header-container">
    <div>
      <p>PÁGINA DE DISEÑO DE INTERIORES</p>
    </div>
    <div>
      <button @click="clearFurniture()" class="btn-clearAll">
        Limpiar todo
      </button>
    </div>
  </div>
</template>
<script setup>
import { useRoomStore } from "@/stores/roomStore";
const store = useRoomStore();
const clearFurniture = () => {
  store.clearAllItems();
};
</script>
<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: #ccccc9 1px solid;
}

.btn-clearAll {
  background-color: #520000;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 700;
}
</style>
