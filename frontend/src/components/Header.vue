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
    border: 1px black solid;
    height: 70px;
    background-color: #FD2D01
;
    width: 100%;
    position: fixed;
    div {
        margin-left: 100px;
        width: min-content;
        display: flex;
        height: 70px;
        align-items: center;
        embed {
            width: 60px;
            
            /*max-height: 100%;
            transform: scale(3);
            transform-origin: 20% 50%;*/
        }
    }
}
</style>