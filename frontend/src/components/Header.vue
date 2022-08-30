<script>
    export default {
       props: ['imageAddress']
    }
</script>

<template>
    <header>
        <div>
            <embed v-bind:src="imageAddress"/>
        </div>
        <slot></slot>
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        width: 40%;
        height: 100px;
        overflow-y: hidden;
        embed {
            max-height: 100%;
            transform: scale(3);
            transform-origin: 20% 50%;
        }
    }
}
</style>