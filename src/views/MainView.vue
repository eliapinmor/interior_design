<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Room from "@/components/Room.vue";
</script>

<template>
  <div class="main-layout">
    <header class="layout-header">
      <Header />
    </header>
    
    <aside class="layout-sidebar">
      <Sidebar />
    </aside>
    
    <main class="layout-content">
      <Room />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  display: grid;
  /* El header ocupa su contenido, el resto se divide entre sidebar y main */
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-rows: auto 1fr;
  grid-template-columns: 250px 1fr;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  overflow: hidden;
}

.layout-header {
  grid-area: header;
  background-color: #2c3e50;
  color: white;
  z-index: 10;
}

.layout-sidebar {
  grid-area: sidebar;
  background-color: #ecf0f1;
  border-right: 1px solid #bdc3c7;
  overflow-y: auto; /* Permite scroll si hay muchos muebles */
}

.layout-content {
  grid-area: main;
  position: relative;
  background-color: #000; /* Fondo para el canvas */
}
</style>