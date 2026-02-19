<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Room from "@/components/Room.vue";
</script>

<template>
  <div class="main-layout">
    <div>
      <Header />
    </div>
    <div class="main-content">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="room">
        <Room />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 300px;
}

.room {
  flex: 1;
  height: 100%;
}
</style>
