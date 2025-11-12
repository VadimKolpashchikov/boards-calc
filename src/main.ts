// @ts-ignore
import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import App from './App.vue'
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.mount('#app');
