<script>
    import Button from "../components/Button.vue";
    import ProfilImage from "../components/ProfilImage.vue";
    import ButtonSubmit from "../components/ButtonSubmit.vue";
    export default {
        data() {
            return {
                writePost: false
            }
        },
        components: { 
            Button,
            ProfilImage,
            ButtonSubmit
        },
        methods: {
            toggleWritePost: function() {
                this.writePost = !this.writePost;
            }
        }
    }
</script>

<template>
    <div class="create-post">
        <div class="create-post-header">
            <div class="create-post-header-profil">
                <ProfilImage></ProfilImage>
                <div class="create-post-header-profil-descrip">
                    <h2>Nom Prénom</h2>
                    <div>
                        <font-awesome-icon icon="fas fa-briefcase"/>
                        <p>Métier - Département</p>
                    </div>
                </div>
            </div>

            <button class="create-post-header-add" v-on:click="toggleWritePost()">
                <div class="create-post-header-add-content" v-show="!writePost">
                    <div>
                        <font-awesome-icon icon="fas fa-plus"/>
                    </div>
                    <span>Ajouter</span>
                </div>
                <div class="create-post-header-add-content" v-show="writePost">
                    <div>
                        <font-awesome-icon icon="fas fa-minus"/>
                    </div>
                    <span>Annuler</span>
                </div>
            </button>
        </div>

        <form class="create-post-form" v-bind:class="{expanded:writePost}">
            <h3>Ajouter une publication</h3>
            <textarea placeholder="Description de la publication"></textarea>
            <label class="create-post-form-file">
                <input type="file"/>
                <font-awesome-icon icon="fas fa-file-image"/>
            </label>
            <ButtonSubmit label="Publier" />
        </form>
    </div>
</template>

<style scoped lang="scss">
    .create-post {
        display: flex;
        flex-direction: column;
        width: 70%;
        background-color: white;
        border-radius: 10px;
        margin: auto;
        padding: 20px;
        color: #4E5166;

        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-profil {
                padding: 0 0 0 10px;
                display: flex;

                &-descrip {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 0 0 10px;

                    h2 {
                        font-size: 18px;
                    }

                    div {
                        display: flex;
                        font-size: 11px;

                        p{
                            padding: 0 0 0 5px;
                        }
                    }
                }
            }
            &-add {
                display: flex;
                align-items: center;
                background-color: lighten(#4E5166, 60);
                border-radius: 20px;
                color: #4E5166;
                width: 105px;
                cursor: pointer;
                border: none;

                &:hover {
                    background-color: #4E5166;
                    color: #FFFFFF;
                    font-weight: bold;

                    svg {
                        transform: rotate(180deg);
                    }
                }

                &-content {
                    display: flex;
                    align-items: center;

                    div {
                        width: 35px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        svg {
                            transition: all 350ms linear;
                        }
                        span {
                        }
                    }
                }
            }
        }

        &-form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            max-height: 0;
            transition: max-height 1s linear;
            overflow: hidden;
            &.expanded {
                max-height: 1000px;
                transition: max-height 1s linear;
                margin: 20px 0 0 0;
            }
            h3 {
                margin-bottom: 10px;
            }

            textarea {
                margin-bottom: 10px;
                height: 100px;
                border: none;
                background-color: lighten(#4E5166, 60);
                border-radius: 10px;
                padding: 5px 0 0 5px;
                resize: none;

                &:focus {
                    background-color: #FFFFFF;
                    box-shadow: 0px 0px 5px 0px #FD2D01;
                    outline-style: none;
                }
            }
            &-file {
                display: flex;
                justify-content: center;
                padding: 6px 12px;
                cursor: pointer;
                margin-bottom: 10px;
                color: #4E5166;
                position: absolute;
                bottom: 47px;
                left: 0px;

                input {
                    display: none;
                }
            }
        }
    }
   
</style>