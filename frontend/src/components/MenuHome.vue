<script>
    export default {
        props: ['width'],
        data() {
            return {
                isExtended: false,
                canAnimate: false
            }
        },
        methods: {
            toggleContainerWidth() {
                this.canAnimate = true;
                this.isExtended = !this.isExtended;
            }
        }
    }
</script>

<template>
    <!-- v-bind:class { extended: this.extended } = si data extended du component = true alors 
        class extended ajoutée -->
    <div class="container" v-bind:class="{ isExtended: this.isExtended, animation: this.canAnimate }">
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
</template>

<style scoped lang="scss">
    .container {
        position: fixed;
        top: 0;
        bottom: 0;
        border: 1px blue solid;
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
            background-color: darken(#FD2D01, 10);

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
            border: 1px green solid;
            background-color: #FFFFFF;
            ul {
                list-style-type: none;
                padding: 0;
            }
        }
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
</style>