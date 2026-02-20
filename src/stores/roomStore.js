import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', {
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
            console.log('lista', this.furnitureItemsOnMap);
        },
        showAllFurnitureItems() {
            return this.furnitureItemsOnMap;
        },
        clearAllItems() {
            this.furnitureItemsOnMap = [];
        }
    }
})
