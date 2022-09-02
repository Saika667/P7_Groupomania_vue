<script>
    export default {
        props: {
            sizeImage: {
                type: String,
                default: "50px"
            }
        }
    }
</script>

<template>
    <div class="container">
        <div>
            <img src="../../images/worker.jpg" alt=""/>
        </div>
    </div>
    
</template>

<style scoped lang="scss">
    .container {
        width: calc(v-bind(sizeImage) + 5px);
        height: calc(v-bind(sizeImage) + 5px);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(50deg, rgba(253,45,1,1) 32%, rgba(78,81,102,1) 53%, rgba(255,215,215,1) 72%);

            div {
            border-radius: 50%;
            overflow: hidden;
            width: v-bind(sizeImage);
            height: v-bind(sizeImage);        
            display: flex;
            justify-content: center;
        }
    }
</style>