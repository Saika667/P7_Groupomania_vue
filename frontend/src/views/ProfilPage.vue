<script>
    import Header from "../components/baseComponents/Header.vue";
    import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
    import MenuHome from "../components/menuComponent/MenuHome.vue";

    
    export default {
        name: "HomePage",
        components: {
            Header,
            MenuItemHome,
            MenuHome
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
    <main class="profil">
       
    </main>
</template>

<style lang="scss" scoped>
    .profil {

    }
</style>