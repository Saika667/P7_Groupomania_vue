<script>
    import ProfilImage from "../../components/ProfilImage.vue";
    export default {
        components: { ProfilImage,},
        props: ['post'],
        data: function() {
            return {
                hasImage: this.post.imageUrl !== ''
            }
        }
    }
</script>

<template>
    <article class="post">
        <div class="post-header">
            <div class="post-header-profil">
                <ProfilImage></ProfilImage>
                <div class="post-header-profil-identity">
                    <h2>{{ post.user.lastName }} {{ post.user.firstName }}</h2>
                    <div class="post-header-profil-identity-job">
                        <font-awesome-icon icon="fas fa-briefcase"/>
                        <p>{{ post.user.job }} - {{ post.user.department }}</p>
                    </div>
                    <p class="post-header-profil-identity-timer">
                        <!-- TODO à calculer -->
                        Il y a <span>17h</span>
                    </p>
                </div>
            </div>
            
            <div class="post-header-menu">
                <font-awesome-icon icon="fas fa-ellipsis-vertical" />
            </div>
        </div>

        <div class="post-main">
            <div class="post-main-descrip">
                <p>{{ post.content }}</p>
            </div>
            <!-- Vérifier src avec une route différente de fakeroot -->
           <img v-if="hasImage" v-bind:src="post.imageUrl" alt="" />
        </div>

        <div class="post-footer">
            <div class="post-footer-number">
                <div>
                    <font-awesome-icon icon="fas fa-comments" />
                    112 commentaires
                </div>

                <div>
                    30
                    <font-awesome-icon icon="fas fa-heart" />
                </div>
            </div>
            <div class="post-footer-comments">
                <ProfilImage sizeImage="40px"></ProfilImage>
                <input type="text" placeholder="Ajouter un commentaire"/>
            </div>
        </div>
    </article>
</template>

<style scoped lang="scss">
    .post {
        width: 70%;
        margin: 20px auto;
        border-radius: 10px;
        color: #4E5166;
        background-color: white;
        //box-shadow: 0px 0px 7px 0px #FD2D01;
        padding: 20px;

        &-header {
            display: flex;
            justify-content: space-between;

            &-profil {
                display: flex;
                justify-content: center;
                align-items: center;

                &-identity {
                    padding: 0 0 0 10px;

                    h2 {
                        font-size: 18px;
                        margin: 0;
                    }
                    &-job {
                        display: flex;
                        font-size: 11px;
                        p {
                            padding: 0 0 0 5px;
                        }
                    }
                    &-timer {
                        font-size: 9px;
                        font-style: italic;
                    }
                }
            }
            
            &-menu {
                width: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                cursor: pointer;
            }
        }

        &-main {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 10px 0;

            &-descrip {
                width: 98%;
                min-height: 25px;
                font-size: 13px;
                padding: 10px 0 0 10px;
            }

            img {
                width: 98%;
                object-fit: cover;
                max-height: 270px;
            }
        }

        &-footer {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            padding: 10px 15px 0 15px;

            &-number {
                display: flex;
                justify-content: space-between;
                padding: 0 0 10px 0;
            }
            &-comments {
                display: flex;
                input {
                    margin-left: 15px;
                    border-radius: 20px;
                    border: none;
                    width: 89%;
                    padding-left: 15px;
                    background-color: lighten(#4E5166, 60);
                }
            }
        }
    }
</style>