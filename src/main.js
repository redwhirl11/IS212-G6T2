//entry point of vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import CMultiSelect from '@coreui/vue-pro';

const app = createApp(App);

app.use(router);

app.component("CMultiSelect", CMultiSelect);
app.mount("#app");