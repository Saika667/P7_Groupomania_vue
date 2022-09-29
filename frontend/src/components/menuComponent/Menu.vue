<script>
    export default {
       
    }
</script>

<template>
    <nav>
        <ul>
            <slot></slot>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
    nav {
        /* Même width que le form de login / inscription */
        width: 470px;
        margin: 50px auto 0 auto;
        display: flex;
        justify-content: start;
        ul {
            display: flex;
            list-style-type: none;
            justify-content: center;
            padding: 0;
        }
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        nav {
            width: 340px;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
</style>