<script>
import Header from "../components/baseComponents/Header.vue";
import Logo from "../components/Logo.vue";
import Post from "../components/pairedComponent/Post.vue";
import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
import MenuHome from "../components/menuComponent/MenuHome.vue";
import CreatePostForm from "../components/pairedComponent/CreatePostForm.vue";
import jwt_decode from "jwt-decode";

export default {
    name: "HomePage",
    data: function() {
        return {
            // Remplace "process.env" côté node
            apiUrl: import.meta.env.VITE_API_URL,
            posts: [],
            isAdmin: false,
        }
    },
    components: {
        Header,
        Logo,
        Post,
        MenuItemHome,
        MenuHome,
        CreatePostForm
    },
    // Exécuté quand composant crée mais pas affiché
    async created() {
        const bearer = localStorage.getItem('userToken');

        //décodage du token avec verify
        const decodedToken = jwt_decode(bearer);
        //récupère le userId décodé
        const userId = decodedToken.userId;
        const self = this;

        fetch(`${this.apiUrl}/users/${userId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
            },                
        }).then(function(res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function(res) {
            self.isAdmin = res.user.isAdmin;
        })

        this.refreshPosts();
    },
    methods: {
        refreshPosts: async function() {
            console.log('refreshing...');
            const bearer = localStorage.getItem('userToken');
            const self = this;
            fetch(`${this.apiUrl}/posts`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                },                
            }).then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function(res) {
                self.posts = res;
            })
        },

    }
}
</script>

<template>
    <Header imageAddress="../images/icon-cropped-white.svg"/>
    <MenuHome>
        <router-link to="/profil">
            <MenuItemHome iconClass="fas fa-user">Mon profil</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-bell">Mes notifications</MenuItemHome>
        <router-link to="/community">
            <MenuItemHome iconClass="fas fa-users">Communauté</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-power-off">Déconnexion</MenuItemHome>
    </MenuHome>
    <main class="news">
        <CreatePostForm @refresh-posts="refreshPosts"></CreatePostForm>
        <Post v-for="post in posts" v-bind:post="post" v-bind:isAdmin="isAdmin"></Post>
    </main>
</template>

<style lang="scss" scoped>
    .news {
        padding: 80px 0 0 83px;
        background-color: lighten(#4E5166, 60);
    }
/*----------------------Version téléphone-------------------------------*/
   @media all and (max-width: 768px) {
        .news {
            padding: 80px 0 0 0;
        }
    }
   
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>