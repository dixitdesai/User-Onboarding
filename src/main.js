import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Vue3Tour from "vue3-tour";

import "vue3-tour/dist/vue3-tour.css";
import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Vue3Tour);

app.mount("#app");
