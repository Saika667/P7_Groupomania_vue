<script>
import LoginForm from "../components/LoginForm.vue";
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import MenuItem from "../components/MenuItem.vue";
import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";
// Création du composant principal App
export default {
    name: "LoginPage",
    components: {
    LoginForm,
    Header,
    Menu,
    MenuItem,
    Logo,
    Footer,
}
}
</script>

<template>
  <div class="background">
    <!--<Header imageAddress="../images/icon-left-font.svg">
        <Menu>
        <MenuItem href="/">Se connecter</MenuItem>
        <MenuItem href="/register">S'inscrire</MenuItem>
        </Menu>
    </Header>-->
    <!-- Y a t il mieux ?-->
    <Logo imageAddress="../images/icon-left-font-monochrome-white.svg"/>
    <Menu>
        <MenuItem href="/" v-bind:isActive="true">Se connecter</MenuItem>
        <MenuItem href="/register">S'inscrire</MenuItem>
    </Menu>
    <LoginForm></LoginForm>
    <Footer />
  </div>
</template>

<style lang="scss">
    
</style>

<style lang="scss" scoped>
   .background {
        width: 100%;
        background: url('../public/images/worker.jpg') center;
        background-size: cover;
        position: relative;
        &::after {
            content:'';
            background: rgba(253, 45, 1, 0.3);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }
    }
</style>
