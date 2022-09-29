<script>
    export default {
        props: ['label']
    }
</script>

<template>
    <div class="container">
        <button type="button" class="container-button" v-on:click="this.$emit('callback-event')">
            <div class="container-button-text">{{ label }}</div>
        </button>
    </div>
</template>

<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: flex-end;
        margin-right: 2.5%;

        &-button {
            box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
            color: #ca2401;
            border: 0px transparent;
            border-radius: 0.3rem;
            transition: 0.3s ease-in-out;
            transition-delay: 0.35s;
            overflow: hidden;
            padding: 10px 20px;
            background: white;
            text-align: center;
            display: inline-block;
            font-size: 17px;
            font-weight: 700;
            position: relative;
            will-change: transform;
            text-decoration: none;
            cursor: pointer;
            margin: 25px 0 10px 0;

            &:before {
                content: "";
                display: block;
                background: #ca2401;
                position: absolute;
                width: 200%;
                height: 500%;
                border-radius: 100%;
                transition: 0.36s cubic-bezier(0.4, 0, 1, 1);
                transform: translate(-120%, -50%) translateZ(0);
            }

            &:hover {
                color: transparent;

                &:before {
                    transform: translate(-45%, -34%) translateZ(0);
                }

                .container-button-text {
                    color: white;
                }
            }

            &-text {
                color: #ca2401;
                position: relative;
                top: 0;
                width: 100%;
                display: inline;
                height: auto;
                transition: 0.25s ease-in;
                transition-delay: 0.1s;
            }
        }
    }       
</style>