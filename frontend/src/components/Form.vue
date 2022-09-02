<script>
    export default {
    }
</script>

<template>
    <form>
        <slot></slot>
    </form>
</template>

<style scoped lang="scss">
    form {
        display: flex;
        flex-direction: column;
        width: 350px;
        margin: auto;
        border-radius: 0 15px 15px 0;
        background-color: #FFF;
        padding: 50px 60px;
        box-shadow: 0px -2px 15px 5px rgb(0 0 0 / 17%);
        position: relative;
        z-index: 1;
        //box-shadow: 0 19px 73px 0 rgb(0 0 0 / 17%);
    }
    /*form {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0px 0px 7px 5px #ffd7d7;
        position: relative;
        margin: 10px auto 50px auto;
        width: min-content;
        background-color: white;
        opacity: 0.85;
        z-index: 2;
        padding: 20px;
    }*/
</style>