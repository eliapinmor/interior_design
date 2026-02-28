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
        <div class="icon">
          <img
            :src="item.iconPath"
            alt="Icono del mueble"
            class="furniture-icon"
          />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <!-- toggle list -->
    <div>
      <h3>Muebles añadidos</h3>
      <div v-for="item in store.showAllFurnitureItems()" :key="item.id">
        <div class="item-list">
          <div class="item-name">{{ item.name }}</div>
          <div>
            <button @click="deleteItem(item)" class="btn-delete"><i class="fa-solid fa-x"></i></button>
          </div>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>
<script setup>
import { useRoomStore } from "@/stores/roomStore";
const store = useRoomStore();
//lista de muebles
const furnitureItems = [
  {
    id: "chair",
    name: "Silla",
    iconPath: "furniture_icons/chair.png",
    modelPath: "models/chair.glb",
  },
  {
    id: "table",
    name: "Mesa",
    iconPath: "furniture_icons/table.png",
    modelPath: "models/table.glb",
  },
  {
    id: "bed",
    name: "Cama",
    iconPath: "furniture_icons/bed.png",
    modelPath: "models/bed.glb",
  },
  {
    id: "bedDouble",
    name: "Cama Doble",
    iconPath: "furniture_icons/bedDouble.png",
    modelPath: "models/bedDouble.glb",
  },
  {
    id: "lamp",
    name: "Lámpara",
    iconPath: "furniture_icons/lamp.png",
    modelPath: "models/lamp.glb",
  },
  {
    id: "rug",
    name: "Alfombra",
    iconPath: "furniture_icons/rug.png",
    modelPath: "models/rug.glb",
  },
  {
    id: "bookcase",
    name: "Librería",
    iconPath: "furniture_icons/bookcase.png",
    modelPath: "models/bookcase.glb",
  },
  {
    id: "sofa",
    name: "Sofá",
    iconPath: "furniture_icons/sofa.png",
    modelPath: "models/sofa.glb",
  },
  {
    id: "plant",
    name: "Planta",
    iconPath: "furniture_icons/plant.png",
    modelPath: "models/plant.glb",
  },
  {
    id: "trashcan",
    name: "Papelera",
    iconPath: "furniture_icons/trashcan.png",
    modelPath: "models/trashcan.glb",
  },
  {
    id: "coatRack",
    name: "Perchero",
    iconPath: "furniture_icons/coatRack.png",
    modelPath: "models/coatRack.glb",
  },
  {
    id: "radio",
    name: "Radio",
    iconPath: "furniture_icons/radio.png",
    modelPath: "models/radio.glb",
  }
];

const onDragStart = (event, item) => {
  event.dataTransfer.setData("furnitureId", item.id);
  event.dataTransfer.setData("furnitureName", item.name);
};

const deleteItem = (id) => {
  store.deleteFurnitureItem(id);
};
</script>
<style scoped>
.sidebar-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 50px;
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

.icon {
  overflow: hidden;
  border-right: #ccccc9 1px solid;
  padding: 10px;
}

.furniture-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.name {
  padding: 10px;
}

.item-list {
  background-color: #ffffff;
  border: #ccccc9 1px solid;
  border-radius: 8px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}

.item-name {
  padding: 10px;
}

.btn-delete {
  background-color: #ffffff;
  border: none;
  padding: 15px;
  cursor: pointer;
  border-left: #ccccc9 1px solid;
  height: 100%;
  border-radius: 0 8px 8px 0;
  color: red;
  font-weight: 700;
}

.spacer {
  height: 50px;
}
</style>
