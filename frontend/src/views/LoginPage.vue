<script>
import LoginForm from "../components/LoginForm.vue";
import Menu from "../components/Menu.vue";
import MenuItem from "../components/MenuItem.vue";
import Logo from "../components/Logo.vue";
import Footer from "../components/baseComponents/Footer.vue";
// Création du composant principal App
export default {
    name: "LoginPage",
    components: {
    LoginForm,
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
        height: 100%;
        background: url('../public/images/background.png') center;
        background-size: cover;
        position: relative;
    }
</style>
