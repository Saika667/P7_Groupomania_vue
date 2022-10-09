<script>
    export default {
        
    }
</script>

<template>
    <div class="view">
        <div class="view-header">
            <h2>Communauté</h2>
        </div>

        <div class="view-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .view {
        background-color: #FFFFFF;
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 1100px;
        border-radius: 10px;
        color: #4E5166;
        margin-bottom: 20px;
        padding-bottom: 6px;

        &-header {
            width: 96%;
            margin: 10px auto;
            text-align: center;
        }

        &-content {
            background-color: lighten(#4E5166, 60);
            width: 98%;
            margin: 0 auto;
            padding: 10px 0 0 0;
            border-radius: 10px;
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
        }
    }

/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .view {
            width: 94%;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        .view {
            width: 90%;
        }
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>