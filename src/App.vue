<template>
  <UI />
  <component v-if="showTour" :is="tourComponents[tourLibrary]"></component>
</template>

<script setup>
import { onMounted } from "vue";
import UI from "./components/UI.vue";
import VOnboarding from "./components/VOnboarding.vue";
import VueTour from "./components/VueTour.vue";

import { storeToRefs } from "pinia";
import { useTourStore } from "@/store.js";
const { showTour, tourLibrary } = storeToRefs(useTourStore());

const tourComponents = {
  VOnboarding: VOnboarding,
  VueTour: VueTour,
};

onMounted(() => {
  if (!localStorage.getItem("showTour") && !localStorage.getItem("username")) {
    console.log("User visiting the site for the first time!!");
    const name = prompt("What is your name?");
    if (name) {
      localStorage.setItem("username", name);
      showTour.value = true;
    }
  }
});
</script>
