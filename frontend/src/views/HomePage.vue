<script>
import Header from "../components/baseComponents/Header.vue";
import Logo from "../components/Logo.vue";
import Post from "../components/pairedComponent/Post.vue";
import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
import MenuHome from "../components/menuComponent/MenuHome.vue";
import CreatePostForm from "../components/pairedComponent/CreatePostForm.vue";

export default {
    name: "HomePage",
    components: {
        Header,
        Logo,
        Post,
        MenuItemHome,
        MenuHome,
        CreatePostForm
    }
}
</script>

<template>
    <Header imageAddress="../images/icon-cropped-white.svg"/>
    <MenuHome>
        <router-link to="/profil">
            <MenuItemHome iconClass="fas fa-user" :key="profileMenu">Mon profil</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-bell" :key="logoutMenu">Mes notifications</MenuItemHome>
        <router-link to="/community">
            <MenuItemHome iconClass="fas fa-users" :key="logoutMenu">Communauté</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-power-off" :key="logoutMenu">Déconnexion</MenuItemHome>
    </MenuHome>
    <main class="news">
        <CreatePostForm></CreatePostForm>
        <Post></Post>
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