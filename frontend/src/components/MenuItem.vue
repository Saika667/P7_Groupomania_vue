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
    <li v-bind:class="isActive ? 'active' : ''">
        <!-- Remplace <a href=""></a> pour faire un lien dans vue -->
        <router-link v-bind:to="href">
            <slot></slot>
        </router-link>
    </li>
    
</template>

<style scoped lang="scss">
    li {
        border-radius: 10px;
        //border: 1px solid black;
        z-index: 2;
        height: 45px;
        text-align: center;
        line-height: 45px;
        text-transform: uppercase;
        margin: 5px;
        background-color: #FD2D01;
        cursor: pointer;
        a {
            text-decoration: none;
            color: white;
            width: 200px;
            display: block;
        }
        &:hover, &.active {
            background-color: #4E5166;
            a {
                color: #FFD7D7;
            }
        }
    }
</style>