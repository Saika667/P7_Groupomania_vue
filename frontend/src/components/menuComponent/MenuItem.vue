<script>
    export default {
       props: {
            href: String,
            isActive: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<template>
    <!--
    Le changement de la valeur de isActive se fait au moment de l'appel du composant (fichier finissant en "page")
    -->
    <li v-bind:class="isActive ? 'active' : ''">
        <!-- Router-link remplace <a href=""></a> pour faire un lien dans vue -->
        <router-link v-bind:to="href">
            <slot></slot>
        </router-link>
    </li>
    
</template>

<style scoped lang="scss">
    li {
        background-color: #FFFFFF;
        border-radius: 6px 6px 0 0;
        margin-right: 10px;
        a {
            display: block;
            padding: 12px 35px;
            color: #4E5166;
            font-weight: bold;
        }
        &.active, &:hover {
            
            background-color: rgb(78 81 102 / 75%);
            transition: all 0.7s linear;
            & a {
                color: #FFFFFF;
                transition: all 0.35s linear;
            }
        }
    }
</style>