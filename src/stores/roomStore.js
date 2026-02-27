import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    furnitureItemsOnMap: [],
    draggedItem: null,
    scene: null,
  }),
  actions: {
    setStore(scene) {
      this.scene = scene;
      this.furnitureItemsOnMap = [];
    },
    addFurnitureItem(model) {
      this.furnitureItemsOnMap.push(model);
      console.log("lista", this.furnitureItemsOnMap);
    },
    showAllFurnitureItems() {
      return this.furnitureItemsOnMap;
    },
    clearAllItems() {
      this.furnitureItemsOnMap.forEach((item) => {
        item.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            // Si el material es un array (multimaterial), lo recorremos
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        this.scene.remove(item);
      });
      console.log(this.furnitureItemsOnMap);
      this.furnitureItemsOnMap = [];
    },
    deleteFurnitureItem(item) {
      item.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          // Si el material es un array (multimaterial), lo recorremos
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      this.scene.remove(item);
      this.furnitureItemsOnMap = this.furnitureItemsOnMap.filter((i) => i !== item);
      console.log("Mueble eliminado, lista actualizada:", this.furnitureItemsOnMap);
    },
  },
});
