import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from "@/views/RegisterPage.vue";
import ForgottenPasswordPage from "@/views/ForgottenPasswordPage.vue";
import HomePage from "@/views/HomePage.vue";
import CommunityPage from "@/views/CommunityPage.vue";
import ProfilPage from "@/views/ProfilPage.vue";

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
        path: "/forgotten-password",
        name: "forgotten-password",
        component: ForgottenPasswordPage,
        meta: {
            title: "Mot de passe oublié"
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
  document.title = to.meta.title;
  next();
});

export default router;
