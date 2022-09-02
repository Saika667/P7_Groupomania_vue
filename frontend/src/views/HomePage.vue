<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import MenuItem from "../components/MenuItem.vue";
import Logo from "../components/Logo.vue";
import Post from "../components/Post.vue";
import MenuItemHome from "../components/MenuItemHome.vue";
import MenuHome from "../components/MenuHome.vue";
import CreatePostForm from "../components/CreatePostForm.vue";

export default {
    name: "HomePage",
    components: {
        Header,
        Menu,
        MenuItem,
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
        <MenuItemHome iconClass="fas fa-user" :key="profileMenu">Mon profil</MenuItemHome>
        <MenuItemHome iconClass="fas fa-bell" :key="logoutMenu">Mes notifications</MenuItemHome>
        <router-link to="/community">
            <MenuItemHome iconClass="fas fa-users" :key="logoutMenu">Communauté</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-power-off" :key="logoutMenu">Déconnexion</MenuItemHome>
    </MenuHome>
    <div class="news">
        <CreatePostForm></CreatePostForm>
        <Post></Post>
    </div>
    <!--<MenuHome v-show="extended">
        <MenuItemHome iconClass="fas fa-user" :key="profileMenu"></MenuItemHome>
        <MenuItemHome iconClass="fas fa-power-off" :key="logoutMenu"></MenuItemHome>
    </MenuHome>-->
    <!--<Logo imageAddress="../images/icon-left-font-monochrome-white.svg" backgroundColor="#FD2D01"/>
    <main class="main">
        <div class="main-side-menu">

        </div>
        <div class="main-news">
            <Post></Post>
            <Post></Post>
        </div>
    </main>-->
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