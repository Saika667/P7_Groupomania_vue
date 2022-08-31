<script>
    import ProfilImage from "../components/ProfilImage.vue";
    export default {
    components: { ProfilImage,}
}
</script>

<template>
    <article class="post">
        <div class="post-header">
            <div class="post-header-profil">
                <ProfilImage></ProfilImage>
                <div class="post-header-profil-identity">
                    <h2>Nom Prénom</h2>
                    <p>Métier - Département</p>
                </div>
            </div>
            
            <div class="post-header-menu">
                <font-awesome-icon icon="fas fa-ellipsis-vertical" />
            </div>
        </div>

        <div class="post-main">
            <div class="post-main-descrip">
                <p>mon titre de post</p>
            </div>
           <img src="../../public/images/worker.jpg" alt="" />
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
        width: 95%;
        margin: 10px auto;
        border-radius: 10px;
        color: #4E5166;
        background-color: white;
        box-shadow: 0px 0px 7px 0px #FD2D01;

        &-header {
            display: flex;
            justify-content: space-between;
            padding-top: 10px;

            &-profil {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 0 0 10px;

                &-identity {
                    padding: 0 0 0 10px;

                    h2 {
                        font-size: 18px;
                        margin: 0;
                    }

                    p {
                        font-size: 10px;
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
            padding: 10px 15px;

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
                    padding-left: 5px;
                    background-color: #FFD7D7;
                }
            }
        }
    }
</style>