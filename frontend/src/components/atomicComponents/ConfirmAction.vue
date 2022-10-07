<script>
    export default {
        data: function() {
            return {
                targetId: null,
                isVisible: false
            }
        },
        methods: {
            confirm: function() {
                this.$emit('delete', this.targetId);
                this.isVisible = false;
            },
            cancel: function() {
                this.isVisible = false;
            }
        }
    }
</script>

<template>
    <div class="box" v-show="isVisible">
        <div class="box-confirmation">
            <p>Etes vous sur de vouloir supprimer l'élément ?</p>

            <div class="box-confirmation-action">
                <div class="box-confirmation-action-btn yes" v-on:click="confirm">
                    <font-awesome-icon icon="fas fa-check"/>
                    <span>Oui</span>
                </div>

                <div class="box-confirmation-action-btn no" v-on:click="cancel">
                    <font-awesome-icon icon="fas fa-xmark"/>
                    <span>Non</span>
                </div>
            </div>
            <embed src="../../public/images/failure-corner.svg"/>
        </div>
    </div>   
</template>

<style scoped lang="scss">
    .box {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(#000000, 0.7);

        &-confirmation {
            padding: 20px;
            background-color: #FFD7D7;
            border-radius: 32px;
            position: relative;
            overflow: hidden;

            p {
                position: relative;
                z-index: 1;
                font-size: 18px;
                text-align: center;
            }

            &-action {
                display: flex;
                justify-content: center;
                margin: 20px 0 0 0;
                position: relative;
                z-index: 1;

                &-btn {
                    background-color: white;
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    border-radius: 20px;
                    transition: all 500ms ease-in-out;
                    cursor: pointer;

                    span {
                        padding-left: 10px;
                    }  
                }
            }

            embed {
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
    }
    .yes {
        margin-right: 10px;

        &:hover {
            background-color: #13750a;
            color: #FFFFFF;
            transition: all 500ms ease-in-out;
        }
    }
    .no {
        margin-left: 10px;

        &:hover {
            background-color: #FD2D01;
            color: #FFFFFF;
            transition: all 500ms ease-in-out;
        }
    }

/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
       .box-confirmation {
            width: 90%;
            box-sizing: border-box;
       }
    }
   
/*----------------------Fin Version téléphone-------------------------------*/
</style>