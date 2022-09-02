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
import { faBarsStaggered, faBell, faBriefcase, faCamera, faComments, faEllipsisVertical, faEnvelope, faFileImage, faHeart, faLock, faMinus, faPlus, faPowerOff, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

// Add certain icons to the font awesome library
library.add(faEnvelope, faLock, faPowerOff, faUser, faBriefcase, faEllipsisVertical, faComments, faHeart, faCamera, faBarsStaggered, faBell, faUsers, faPlus,faFileImage, faMinus);

createApp(App)
    // Import font awesome component inside our app
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount("#app");
