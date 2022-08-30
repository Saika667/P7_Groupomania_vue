<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import MenuItem from "../components/MenuItem.vue";
export default {
    name: "HomePage",
    components: {
        Header,
        Menu,
        MenuItem
    }
}
</script>

<template>
    <Header imageAddress="../images/icon-left-font.svg">
        <Menu>
            <MenuItem href="/">Mon Profil</MenuItem>
            <MenuItem href="/register">
                <font-awesome-icon icon="fas fa-power-off"/> Déconnexion
            </MenuItem>
        </Menu>
    </Header>

</template>