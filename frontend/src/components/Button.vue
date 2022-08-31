<script>
    export default {
        props: ['label', 'url']
    }
</script>

<template>
    <div>
        <button>
            <router-link v-slot="button" v-bind:to="url">{{ label }}</router-link>
        </button>
    </div>
</template>

<style scoped lang="scss">
    div {
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
    }
    
</style>