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
import { 
    faBarsStaggered, 
    faBell, 
    faBriefcase, 
    faCamera,
    faCheck,
    faClockFour, 
    faComments, 
    faEllipsisVertical, 
    faEnvelope, 
    faFileImage, 
    faHeart, 
    faHouseChimney, 
    faLock, 
    faMinus, 
    faPaperPlane, 
    faPencil, 
    faPlus, 
    faPowerOff, 
    faTrashCan, 
    faUser, 
    faUsers, 
    faXmark} from '@fortawesome/free-solid-svg-icons';

// Add certain icons to the font awesome library
library.add(
    faEnvelope, 
    faLock, 
    faPowerOff, 
    faUser, 
    faBriefcase, 
    faEllipsisVertical, 
    faComments, 
    faHeart, 
    faCamera, 
    faBarsStaggered, 
    faBell, 
    faUsers, 
    faPlus,
    faFileImage, 
    faMinus, 
    faPaperPlane, 
    faClockFour, 
    faPencil,
    faTrashCan,
    faXmark,
    faCheck,
    faHouseChimney);

createApp(App)
    // Import font awesome component inside our app
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount("#app");
