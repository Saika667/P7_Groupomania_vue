import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from "@/views/RegisterPage.vue";
import HomePage from "@/views/HomePage.vue";
import CommunityPage from "@/views/CommunityPage.vue";
import ProfilPage from "@/views/ProfilPage.vue";
import jwt_decode from "jwt-decode";

const routes = [
    {
        path: "/login",
        name: "login",
        component: LoginPage,
        meta: {
            title: "Connexion"
        },
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage,
        meta: {
            title: "Inscription"
        },
    },
    {
        path: "/home",
        name: "home",
        component: HomePage,
        meta: {
            title: "Accueil"
        },
    },
    {
        path: "/community",
        name: "community",
        component: CommunityPage,
        meta: {
            title: "Communauté"
        },
    },
    {
        path: "/profil",
        name: "profil",
        component: ProfilPage,
        meta: {
            title: "Mon Profil"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    // On vérifie si la page demandée est une page demandant une authentification
    const authRequired = !publicPages.includes(to.path);

    const bearer = localStorage.getItem('userToken');
    
    // Si pas de bearer et besoin d'auth alors on renvoie vers login
    if(bearer === null && authRequired) {
        router.push('/login');
    } else if (bearer !== null && authRequired) {
        // Si besoin d'auth et bearer pas null on vérifie que le bearer soit correctement formaté
        // On ne vérifie pas s'il est toujours valide (devrait être fait côté back)
        try {
            jwt_decode(bearer);
        } catch(exception) {
            router.push('/login');
        }
    }

    document.title = to.meta.title;
    next();
});

export default router;
