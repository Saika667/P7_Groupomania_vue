<script>
    export default {
       props: ['imageAddress']
    }
</script>

<template>
    <div>
        <embed v-bind:src="imageAddress"/>
    </div>
</template>

<style scoped lang="scss">
    div {
        height: 100px;
        overflow-y: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        embed {
            z-index: 2;
        }
    }
</style>