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
    /*li {
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
    }*/
</style>