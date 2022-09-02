<script>
    export default {
        props: ['label']
    }
</script>

<template>
    <div class="container">
        <input type="submit" class="container-button" v-bind:value="label"/>
    </div>
    
    <!--<button>
        <router-link v-slot="button" v-bind:to="url">{{ label }}</router-link>
    </button>-->
</template>

<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: flex-end;

        &-button {
            padding: 15px 60px;
            background: linear-gradient(167deg, rgba(255,215,215,1) 10%, rgba(253,45,1,1) 60%, rgba(78,81,102,1) 100%);
            border-radius: 25px;
            font-weight: bold;
            color: #FFFFFF;
            border: none;
            cursor: pointer;
            //transition: all 1s linear;

            &:hover {
                background: linear-gradient(167deg, rgba(78,81,102,1) 10%, rgba(253,45,1,1) 60%, rgba(255,215,215,1) 100%);
                //color: black;
                //animation: backGrad linear 1s;
            }
        }
    }
    /*
    @keyframes backGrad {
        0% {
            background: linear-gradient(167deg, rgba(255,215,215,1) 10%, rgba(253,45,1,1) 60%, rgba(78,81,102,1) 100%);
        }
        100% {
            background: linear-gradient(167deg, rgba(78,81,102,1) 10%, rgba(253,45,1,1) 60%, rgba(255,215,215,1) 100%);
        }
    }*/
    /*button {
        background-color: #FD2D01;
        width: fit-content;
        font-weight: bold;
        box-shadow: 0 10px 18px 0 rgb(0 0 0 / 17%);
        border: none;*/
       
</style>