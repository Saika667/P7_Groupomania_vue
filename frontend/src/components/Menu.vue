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
        ul {
            display: flex;
            list-style-type: none;
            justify-content: center;
            padding: 0;
        }
    }
</style>