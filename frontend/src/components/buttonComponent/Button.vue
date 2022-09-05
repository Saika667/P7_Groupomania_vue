<script>
    export default {
        props: ['label', 'url']
    }
</script>

<template>
    <button type="button">
        <span v-if="!url" v-on:click="this.$emit('callback-event')">{{ label }}</span>
        <router-link v-slot="button" v-if="url" v-bind:to="url">{{ label }}</router-link>
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
    }
    /*div {
        display: flex;
        justify-content: center;
        margin: 25px 10px;

        button {
            font-size: larger;
            white-space: nowrap;
            width: 300px;
            background-color: #FD2D01;
            border: #FD2D01;
            color: white;
            text-transform: uppercase;
            padding: 0;
            
            &:hover {
                background-color: #FFD7D7;
                a {
                    color: #FD2D01;
                }
            }
            
            a {
                display: block;
                padding: 15px 30px;
                color: white;
            }
        }
    }*/
</style>