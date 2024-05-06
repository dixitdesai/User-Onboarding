<template>
  <Navbar />
  <Sidebar />

  <div class="p-4 sm:ml-64">
    <div class="flex flex-wrap items-center justify-center gap-8 mt-14">
      <!-- <Card v-for="x in 'abcdefghi'" :key="x"/> -->
      <Card />
      <Card id="skip"/>
      <Card />
      <Card />
      <Card/>
      <Card />
      <Card />
      <Card  id="last"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import Card from './Card.vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
onMounted(() => {
    initFlowbite();
})
</script>