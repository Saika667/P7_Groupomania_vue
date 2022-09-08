<script>
    import Header from "../components/baseComponents/Header.vue";
    import Logo from "../components/Logo.vue";
    import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
    import MenuHome from "../components/menuComponent/MenuHome.vue";
    import CommunityView from "../components/CommunityView.vue";
    import CommunityCard from "../components/pairedComponent/CommunityCard.vue";

    export default {
        name: "CommunityPage",
        components: {
            Header,
            Logo,
            MenuItemHome,
            MenuHome,
            CommunityView,
            CommunityCard
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
    <div class="community">
        <CommunityView>
            <CommunityCard></CommunityCard>
            <CommunityCard></CommunityCard>
            <CommunityCard></CommunityCard>
            <CommunityCard></CommunityCard>
            <CommunityCard></CommunityCard>
        </CommunityView>
    </div>
</template>

<style scoped lang="scss">
    .community {
        background-color: lighten(#4E5166, 60);
        padding: 80px 0 0 83px;
        display: flex;
        justify-content: center;
    }
</style>
