<script>
    export default {
        data() {
            return {
                extended: true
            }
        },
        methods: {
            toggleContainerWidth() {
                this.$parent.extended = !this.$parent.extended;
            }
        }
    }
</script>

<template>
    <!-- v-bind:class { extended: this.extended } = si data extended du component = true alors 
        class extended ajoutée -->
    <div class="container">
        <div class="container-header">
            <embed v-if="extended" src="../images/icon-left-font-monochrome-white.svg"/>
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
        left: 0;
        border: 1px blue solid;
        width: 220px;

        &-header {
            height: 70px;
            display: flex;
            justify-content: space-between;
            background-color: red;

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
                width: 70px;
                z-index: 2;
            }
        }

        &-menu {
            border: 1px green solid;
            ul {
                list-style-type: none;
                padding: 0;
            }
        }
    }
</style>