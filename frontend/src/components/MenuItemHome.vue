<script>
    export default {
        props: {
            iconClass: String
        }
    }
</script>

<template>
    <li>
        <div>
            <font-awesome-icon v-bind:icon="iconClass"/>
        </div>
        <span>
            <slot></slot>
        </span>
    </li>
</template>

<style scoped lang="scss">
    li {
        display: flex;
        align-items: baseline;
        flex-direction: row-reverse;
        color: #4E5166;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 50px;
        }
        span {

        }
        &:hover {
            font-weight: bold;
        }
    }
</style>