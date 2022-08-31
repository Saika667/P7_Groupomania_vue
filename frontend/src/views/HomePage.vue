<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import MenuItem from "../components/MenuItem.vue";
import Logo from "../components/Logo.vue";
import Post from "../components/Post.vue";

export default {
    name: "HomePage",
    components: {
        Header,
        Menu,
        MenuItem,
        Logo,
        Post
    }
}
</script>

<template>
    <Logo imageAddress="../images/icon-left-font-monochrome-white.svg" backgroundColor="#FD2D01"/>
    <main class="main">
        <div class="main-side-menu">

        </div>
        <div class="main-news">
            <Post></Post>
            <Post></Post>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .main {
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
    }
</style>