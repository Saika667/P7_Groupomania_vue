import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Fichier créant l'app
//import "./assets/main.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* import specific icons */
import { faBriefcase, faCamera, faComments, faEllipsisVertical, faEnvelope, faHeart, faLock, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';

// Add certain icons to the font awesome library
library.add(faEnvelope, faLock, faPowerOff, faUser, faBriefcase, faEllipsisVertical, faComments, faHeart, faCamera);

createApp(App)
    // Import font awesome component inside our app
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount("#app");
