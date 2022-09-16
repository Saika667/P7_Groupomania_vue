<script>
import RegistrationForm from "../components/pairedComponent/RegistrationForm.vue";
import Menu from "../components/menuComponent/Menu.vue";
import MenuItem from "../components/menuComponent/MenuItem.vue";
import Logo from "../components/Logo.vue";
import Footer from "../components/baseComponents/Footer.vue";
// Création du composant principal App
export default {
  name: "RegisterPage",
  components: {
    RegistrationForm,
    Menu,
    MenuItem,
    Logo,
    Footer,
  }
}
</script>

<template>
  <div class="background">
    <!-- v-bind sur une props car on passe un bool et non une string -->
    <Logo imageAddress="../images/icon-left-font-monochrome-white.svg"/>
    <Menu>
      <MenuItem href="/login">Se connecter</MenuItem>
      <MenuItem href="/register" v-bind:isActive="true">S'inscrire</MenuItem>
    </Menu>
    <RegistrationForm></RegistrationForm>
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