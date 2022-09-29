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
    <div class="logo">
        <embed v-bind:src="imageAddress"/>
    </div>
</template>

<style scoped lang="scss">
    .logo {
        height: 150px;
        overflow-y: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        
        embed {
            z-index: 2;
        }
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .logo {
            height: 70px;
            embed {
                width: 80%;
            }
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        .logo {
            embed {
                width: 70%;
            }
        }
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>