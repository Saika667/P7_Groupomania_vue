<script>
    export default {
        name: "toaster",
        data: function() {
            return {
                logoUrl: "",
                bubblesUrl: "",
                background: "",
                type: "",
                message: "",
                isVisible: false,
                canAnimate: false
            }
        },
        methods:  {
            show: function(type, message) {
                this.type = type;
                this.message = message;
                this.isVisible = true;
                this.canAnimate = true;
                this.logoUrl = this.type === "success" ? "../../public/images/success-logo.svg" : "../../public/images/failure-logo.svg";
                this.bubblesUrl = this.type === "success" ? "../../public/images/success-corner.svg" : "../../public/images/failure-corner.svg";
                this.background = this.type === "success" ? "#03A65A" : "#F63E50";
                // x secondes après affichage on cache
                // setTimeout a besoin de 2 paramètres: 1 fonction callback + 1 temps (en ms)
                setTimeout(() => {
                    this.isVisible = false;
                }, 2500);
            }
        }
    }
</script>
<template>
    <div class="toaster" v-bind:class="{isVisible: this.isVisible, canAnimate: this.canAnimate}">
        <img class="toaster-logo" v-bind:src="logoUrl" v-bind:alt="type === 'success' ? 'logo succès' : 'logo erreur'">
        <div class="toaster-bubbles">
            <img class="toaster-bubbles-logo" v-bind:src="bubblesUrl" v-bind:alt="type === 'success' ? 'bulles succès' : 'bulles erreur'">
        </div>
        <h3 class="toaster-title">
            {{ type === "success" ? "Félicitations !" : "Dommage.." }}
        </h3>
        <p class="toaster-message">{{ message }}</p>
    </div>
</template>
<style scoped lang="scss">
    .toaster {
        background-color: v-bind(background);
        color: white;
        position: fixed;
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        /* Décalage de 70px pour centrer sur le header (sans la barre latérale) */
        left: 70px;
        right: 0;
        top: -150px;
        margin: auto;
        border-radius: 32px;
        z-index: 5;
        
        &:not(.canAnimate) {
            top: -150px;
        }
        &.canAnimate {
            animation: hiddenToast 1s forwards;
        }
        &.isVisible {
            animation: displayToast 1s forwards;
        }
        &-logo {    
            position: absolute;
            left: 25px;
            top: -21px;
            width: 42px;
        }

        &-bubbles {    
            position: absolute;
            left: 0;
            bottom: 0;
            width: 67px;
            display: flex;
            border-radius: 0 0 0 32px;
            overflow: hidden;

            &-logo {
                width: 100%;
            }
        }

        &-title {
            position: relative;
            z-index: 2;
            font-size: 24px;
            margin-bottom: 8px;
        }

        &-message {
            position: relative;
            z-index: 2;
            font-size: 15px;
        }
    }

    @keyframes displayToast {
        0% {
            transform: translateY(-150px);
            animation-timing-function: ease-out;
        }
        50% {
            transform: translateY(190px);
            animation-timing-function: ease-in;
        }
        75% {
            transform: translateY(175px);
            animation-timing-function: ease-in-out;
        }
        100% {
            transform: translateY(180px);
        }
    }

    @keyframes hiddenToast {
        0% {
            transform: translateY(180px);
        }
        35% {
            transform: translateY(190px);
            animation-timing-function: ease-in;
        }
        100% {
            transform: translateY(-150px);
        }
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
       .toaster {
        left: 0;
       }
    }
/*----------------------Fin Version téléphone-------------------------------*/
</style>