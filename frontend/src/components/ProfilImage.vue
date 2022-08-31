<script>
    export default {
        props: {
            sizeImage: {
                type: String,
                default: '50px'
            }
        }
    }
</script>

<template>
    <div>
        <img src="../../images/worker.jpg" alt=""/>
    </div>
</template>

<style scoped lang="scss">
    div {
        border-radius: 50%;
        overflow: hidden;
        width: v-bind(sizeImage);
        height: v-bind(sizeImage);        
        display: flex;
        justify-content: center;
    }
</style>