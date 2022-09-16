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
        },
        data: function() {
            return {
                // Identique à process.env côté node
                apiUrl: import.meta.env.VITE_API_URL,
                users: [],
            }
        },
        async created() {
            const bearer = localStorage.getItem('userToken');
            const self = this;

            fetch(`${this.apiUrl}/users`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                },
            }).then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function(res) {
                self.users = res;
            })   
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
            <CommunityCard v-for="user in users" v-bind:user="user"></CommunityCard>
        </CommunityView>
    </div>
</template>

<style scoped lang="scss">
    .community {
        background-color: lighten(#4E5166, 60);
        padding: 80px 0 0 83px;
        display: flex;
        justify-content: center;
        height: calc(100vh - 80px);
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .community {
            height: initial;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>
