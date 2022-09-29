<script>
    export default {
        props: ['label', 'url']
    }
</script>

<template>
    <!--
    v-if="url" ou "!url" permet d'afficher soit un span soit un router-link (a)
    le router-link me permet de changer de page
    v-on:click permet d'ajouter un événement
    $emit permet de transmettre une information au parent et "callback-event" est le nom de l'événement choisi
    -->
    <button type="button">
        <span v-if="!url" v-on:click="this.$emit('callback-event')">{{ label }}</span>
        <router-link v-if="url" v-bind:to="url">{{ label }}</router-link>
    </button>
</template>

<style scoped lang="scss">
    button {
        background-color: #FD2D01;
        width: fit-content;
        font-weight: bold;
        box-shadow: 0 10px 18px 0 rgb(0 0 0 / 17%);
        border: none;
        border-radius: 4px;
        
        a {
            color: #FFFFFF;
            display: block;
            padding: 12px 50px;
        }
        span {
            color: #FFFFFF;
            display: block;
            padding: 12px 50px; 
        }
    }
</style>