<script>
import Header from "../components/baseComponents/Header.vue";
import Logo from "../components/atomicComponents/Logo.vue";
import Post from "../components/pairedComponent/Post.vue";
import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
import MenuHome from "../components/menuComponent/MenuHome.vue";
import CreatePostForm from "../components/pairedComponent/CreatePostForm.vue";
import jwt_decode from "jwt-decode";
import Toaster from "../components/atomicComponents/Toaster.vue";
import ConfirmAction from "../components/atomicComponents/ConfirmAction.vue";

export default {
    name: "HomePage",
    data: function() {
        return {
            // Remplace "process.env" côté node
            apiUrl: import.meta.env.VITE_API_URL,
            posts: [],
            isAdmin: false,
            connectedUserImage: null
        }
    },
    components: {
        Header,
        Logo,
        Post,
        MenuItemHome,
        MenuHome,
        CreatePostForm,
        Toaster,
        ConfirmAction
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
            throw new Error("Quelque chose s'est mal passé");
        }).then(function(res) {
            self.isAdmin = res.user.isAdmin;
            self.connectedUserImage = res.user.profileImage;
        }).catch(function(exception) {
            self.$refs.toaster.show('error', exception.message);
        })

        this.refreshPosts(false);
    },
    methods: {
        refreshPosts: async function(collapseComments) {
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
                throw new Error("Quelque chose s'est mal passé");
            }).then(function(res) {
                if (collapseComments) {
                    //sert à refermer les commentaires
                    for(let i = 0; i < self.posts.length; i++) {
                        self.$refs.posts[i].displayComments = false;
                    }
                }
                self.posts = res;
                self.$forceUpdate();
            }).catch((exception) => {
                self.$refs.toaster.show('error', exception.message);
            });
        },
        toasterEvent: function(type, message) {
            this.$refs.toaster.show(type, message);
        },
        showConfirmAction: function(refId) {
            this.$refs.confirm.isVisible = true;
            this.$refs.confirm.targetId = refId;
        },
        deletePost: function(refId) {
            // appelle la fonction deletePost du composant Post
            this.$refs.posts[refId].deletePost();
        },
    }
}
</script>

<template>
    <Toaster ref="toaster"></Toaster>
    <ConfirmAction ref="confirm" @delete="deletePost"></ConfirmAction>
    <Header imageAddress="../images/icon-cropped-white.svg"/>
    <MenuHome>
        <router-link to="/home">
            <MenuItemHome iconClass="fas fa-house-chimney">Accueil</MenuItemHome>
        </router-link>
        <router-link to="/profil">
            <MenuItemHome iconClass="fas fa-user">Mon profil</MenuItemHome>
        </router-link>
        <router-link to="/community">
            <MenuItemHome iconClass="fas fa-users">Communauté</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-bell">Mes notifications</MenuItemHome>
        <MenuItemHome iconClass="fas fa-power-off" v-bind:isLogout="true">Déconnexion</MenuItemHome>
    </MenuHome>
    <main class="news">
        <CreatePostForm @refresh-posts="refreshPosts" @toaster-event="toasterEvent"></CreatePostForm>
        <Post v-for="post, index in posts" v-bind:post="post" v-bind:isAdmin="isAdmin" v-bind:key="index"
            ref="posts"
            v-bind:connectedUserImage="connectedUserImage"
            @refresh-posts="refreshPosts"
            @toaster-event="toasterEvent"
            @show-confirmation="showConfirmAction"></Post>
    </main>
</template>

<style lang="scss" scoped>
    .news {
        padding: 80px 0 1px 83px;
        background-color: lighten(#4E5166, 60);
        min-height: calc(100vh - 81px);
    }
/*----------------------Version téléphone-------------------------------*/
   @media all and (max-width: 768px) {
        .news {
            padding: 80px 0 1px 0;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
</style>