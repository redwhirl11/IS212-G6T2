//entry point of vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { require } from 'module';

import "./assets/main.css";

// var cors = require('cors');

const app = createApp(App);


app.use(router);
// app.use(cors());


app.mount("#app");