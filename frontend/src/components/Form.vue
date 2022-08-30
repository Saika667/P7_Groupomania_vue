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
        align-items: center;
        border-radius: 20px;
        box-shadow: 0px 0px 7px 5px #ffd7d7;
        position: relative;
        margin: 10px auto 50px auto;
        width: min-content;
        background-color: white;
        opacity: 0.85;
        z-index: 2;
        padding: 20px;
    }
</style>