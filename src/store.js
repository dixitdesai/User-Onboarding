import { defineStore } from "pinia";
import { ref } from "vue";

export const useTourStore = defineStore("tourStore", () => {
  const showTour = ref(false);
  const tourLibrary = ref("VOnboarding");

  return { showTour, tourLibrary };
});
