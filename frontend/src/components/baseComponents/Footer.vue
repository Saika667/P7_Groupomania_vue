<script>
    export default {
    }
</script>

<template>
    <footer>
        <h3>Groupomania ©</h3>
        <p>by CONNECT-E</p>
    </footer>
</template>

<style scoped lang="scss">
    footer {
        height: 70px;
        display: flex;
        z-index: 2;
        position: absolute;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: white;
        margin: 50px auto 0 auto;
        bottom: 0;
        left: 0;
        right: 0;

        h3 {
            font-size: 1.3rem;
        }
        p {
            font-size: 0.8rem;
        }
    }
</style>