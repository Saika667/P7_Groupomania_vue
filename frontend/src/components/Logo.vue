<script>
    export default {
       props : {
            imageAddress: String,
            backgroundColor: {
                type: String,
                default: 'white'
            }
        },
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
        padding: 0 auto 30px auto;
        embed {
            z-index: 2;
        }
    }
</style>