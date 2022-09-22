<script>
    import Header from "../components/baseComponents/Header.vue";
    import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
    import MenuHome from "../components/menuComponent/MenuHome.vue";
    import ProfilImage from "../components/ProfilImage.vue";
    
    export default {
        name: "HomePage",
        components: {
            Header,
            MenuItemHome,
            MenuHome,
            ProfilImage
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
        <div class="container">
            <div class="container-modify">
                <font-awesome-icon icon="fas fa-pencil"/>
            </div>
            <div class="container-header">
                <ProfilImage></ProfilImage>
                <h2>Nom Prénom</h2>
            </div>
            <div class="container-job">
                <p>Poste occupé : Assitant QHSE</p>
                <p>Département : Assurance Qualité</p>
                <p>E-mail : vvalde@groupomania.fr</p>
            </div>
            <div class="container-bio">
                Biographie : <br/>
                Je travail dans ce domaine depuis 10 ans ....
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .profil {
        background-color: aquamarine;
        padding: 80px 0 0 83px;
        height: calc(100vh - 80px);
        //background-color: lighten(#4E5166, 60);
    }

    .container {

        &-modify {

        }

        &-header {

        }

        &-job {

        }

        &-bio {

        }
    }
/*----------------------Version téléphone-------------------------------*/
   @media all and (max-width: 768px) {
        .profil {
            padding: 80px 0 0 0;
        }
    }
   
/*----------------------Fin Version téléphone-------------------------------*/
</style>