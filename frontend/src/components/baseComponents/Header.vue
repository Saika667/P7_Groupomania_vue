<script>
    export default {
       props: ['imageAddress']
    }
</script>

<template>
    <header class="header">
        <div class="header-img">
            <router-link to="/home">
                <img v-bind:src="imageAddress"/>
            </router-link>
        </div>
        <slot></slot>
        <div class="header-container">
            <button type="button" name="deco" class="header-container-btn">
                <div class="header-container-btn-content">
                    <div class="header-container-btn-content-svg">
                        <font-awesome-icon icon="fas fa-power-off"/>
                    </div>
                    <span>Déconnexion</span>
                </div>
            </button>
            <button type="button" name="notification" class="header-container-btn">
                <div class="header-container-btn-content">
                    <div class="header-container-btn-content-svg">
                        <font-awesome-icon icon="fas fa-bell"/>
                    </div>
                    <span>Notification</span>
                </div>
            </button>
        </div>
        
    </header>
</template>

<style scoped lang="scss">
.header {
    height: 70px;
    background-color: darken(#FD2D01, 10);
    width: 100%;
    position: fixed;
    z-index: 3;
    display: flex;
    justify-content: space-between;

    &-img {
        margin-left: 100px;
        width: min-content;
        display: flex;
        height: 70px;
        align-items: center;

        a {
            display: flex;

            img {
                width: 60px;
            }
        }
    }

    &-container {
        display: flex;
        width: 200px;
        justify-content: space-evenly;
        align-items: flex-end;
        flex-direction: column;
        
        &-btn {
            max-width: 50px;
            border-radius: 22px;
            border: none;
            overflow: hidden;
            cursor: pointer;
            background-color: darken(#FD2D01, 10);
            transition: all 750ms ease-in-out;

            &-content {
                display: flex;
                padding: 8px 0;

                &-svg {
                    display: flex;
                    font-size: 18px;
                    padding: 0 6px;
                    color: #FFFFFF;
                }

                span {
                    display: none;
                    line-height: 18px;
                    margin: 0 8px 0 5px;
                    color: #FFFFFF;
                }
            }

            &:hover {
                max-width: 200px;
                transition: all 750ms ease-in-out;

                span {
                    display: flex;
                }
            }
        }
    }
}
</style>