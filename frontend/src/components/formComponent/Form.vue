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
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        form {
            width: 260px;
            padding: 30px 40px;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        form {
            
        }
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>