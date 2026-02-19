import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', {
    state: () => ({
        furnitureItemsOnMap: [],
        draggedItem: null,
    }),
    actions: {
        addFurnitureItem(item) {
            this.furnitureItemsOnMap.push(item);
        }
    }
})
