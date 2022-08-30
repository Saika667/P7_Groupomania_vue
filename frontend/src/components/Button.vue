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
        margin: 40px 10px;

        button {
            padding: 15px 30px;
            font-size: larger;
            white-space: nowrap;
            width: 300px;
            background-color: #FD2D01;
            border: #FD2D01;
            color: white;
            text-transform: uppercase;
            
            &:hover {
                background-color: #FFD7D7;
                a {
                    color: #FD2D01;
                }
            }
            
            a {
                color: white;
            }
        }
    }
    
</style>