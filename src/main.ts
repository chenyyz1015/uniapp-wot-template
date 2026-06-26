import { createSSRApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import router from "./router";
import { persistedState } from "./stores/persisted-state.ts";
import "uno.css";

const pinia = createPinia();
pinia.use(persistedState);

export function createApp() {
  const app = createSSRApp(App);
  app.use(router);
  app.use(pinia);
  app.use(i18n);
  return {
    app,
  };
}
