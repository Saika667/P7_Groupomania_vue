<script>
import Header from "../components/baseComponents/Header.vue";
import Logo from "../components/Logo.vue";
import Post from "../components/pairedComponent/Post.vue";
import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
import MenuHome from "../components/menuComponent/MenuHome.vue";
import CreatePostForm from "../components/pairedComponent/CreatePostForm.vue";

export default {
    name: "HomePage",
    data: function() {
        return {
            // Remplace "process.env" côté node
            apiUrl: import.meta.env.VITE_API_URL,
            posts: []
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
        <CreatePostForm></CreatePostForm>
        <Post v-for="post in posts" v-bind:post="post"></Post>
    </main>
</template>

<style lang="scss" scoped>
    .news {
        border: 1px black solid;
        padding: 80px 0 0 83px;
        background-color: lighten(#4E5166, 60);
    }
    /*.main {
        display: flex;
        width: 100%;
        justify-content: space-around;
        
        &-side-menu {
            width: 25%;
            border: 1px blue solid;
            background-color: #FFD7D7;
        }

        &-news {
            width: 75%;
            border: 1px red solid;
            background-color: #FFD7D7;
        }
    }*/
</style>