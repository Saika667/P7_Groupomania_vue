<script>
    export default {
        props: ['width'],
        data() {
            return {
                isExtended: false,
                canAnimate: false,
                isVisible: false
            }
        },
        methods: {
            toggleContainerWidth() {
                this.canAnimate = true;
                this.isExtended = !this.isExtended;
            },
            toggleMobile() {
                this.isVisible = !this.isVisible;
            }
        }
    }
</script>

<template>
    <!-- 
    v-bind:class { isExtended: this.isExtended } = si data isExtended du component = true alors class isExtended ajoutée
    canAnimate initialisé à false pour qu'il n'y ai pas d'animation au chargement de la page
    ajout de :not(.animation) pour indiquer l'état initial du menu (-157px), c'est quand l'élément n'a pas la class animation
    -->
    <div class="container desktop" v-bind:class="{ isExtended: this.isExtended, animation: this.canAnimate }">
        <div class="container-header">
            <embed src="../images/icon-left-font-monochrome-white.svg"/>
            <div>
                <font-awesome-icon v-on:click="toggleContainerWidth" icon="fas fa-bars-staggered"/>
            </div>
        </div>
        <nav class="container-menu">
            <ul>
                <slot></slot>
            </ul>
        </nav>
    </div>

    <div class="container mobile">
        <div class="container-header">
            <embed src="../images/icon-left-font-monochrome-white.svg"/>
            <div>
                <font-awesome-icon  v-on:click="toggleMobile" icon="fas fa-bars-staggered"/>
            </div>
        </div>
        <nav class="container-menu" v-bind:class="{ isVisible: this.isVisible }">
            <ul>
                <slot></slot>
            </ul>
        </nav>
    </div>
</template>

<style scoped lang="scss">
    .container {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 4;
        width: 240px;
        background-color: #FFFFFF;

        &:not(.animation) {
            left: -157px;
        }
        &.animation {
            animation: right 750ms ease-in-out forwards;
        }
        &.isExtended {
            left: 0;
            animation: left 750ms ease-in-out forwards;
        }
    
        &-header {
            height: 70px;
            display: flex;
            justify-content: space-between;
            background-color: #FD2D01;

            embed {
                width: 150px;
                z-index: 1;
            }
            
            div {
                font-size: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                width: 85px;
                z-index: 2;
                cursor: pointer;
            }
        }

        &-menu {
            background-color: #FFFFFF;
            ul {
                list-style-type: none;
                padding: 0;
            }
        }
    }
    .container.mobile {
        display: none;
    }
    @keyframes left {
        0% {
            transform: translateX(-157px)
        }
        25% {
            transform: translateX(-250px);
        }
        50% {
            transform: translateX(-250px);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes right {
        0% {
            transform: translateX(0);
            animation-timing-function: ease-in;
        }
        
        50% {
            transform: translateX(-250px);
        }
        85% {
            transform: translateX(-250px);
        }
        100% {
            transform: translateX(-157px);
        }
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .container.desktop {
            display: none;
        }
        
        .mobile.container {
            display: block;
            bottom: auto;
            .container-menu {
                display: none;
            }
            .container-menu.isVisible {
                display: block;
                width: calc(100vw + 157px);
                height: calc(100vh - 70px);
            }
        }
        
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>