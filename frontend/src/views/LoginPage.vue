<script>
  import LoginForm from "../components/pairedComponent/LoginForm.vue";
  import Menu from "../components/menuComponent/Menu.vue";
  import MenuItem from "../components/menuComponent/MenuItem.vue";
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
        <MenuItem href="/login" v-bind:isActive="true">Se connecter</MenuItem>
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
        min-height: 100vh;
        background: url('../public/images/background.png') center;
        background-size: cover;
        position: relative;
        padding-bottom: 80px;
        box-sizing: border-box;
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
      .background {
        
      }
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>
