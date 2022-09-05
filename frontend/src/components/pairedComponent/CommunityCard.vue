<script>
    import ProfilImage from "../../components/ProfilImage.vue";

    export default {
        components: { 
            ProfilImage,
        },
    }
</script>

<template>
    <div class="card">
        <div class="card-border">
            <div class="card-border-identity">
                <ProfilImage></ProfilImage>
                <div class="card-border-identity-descrip">
                    <div class="card-border-identity-descrip-name">
                        <h2>Nom</h2>
                        <h2>Prénom</h2>
                    </div>
                </div>
            </div>
            <div class="card-border-work">
                <div>
                    <span>Poste :</span>
                    <p>Technicien de laboratoire de controle qualite</p>
                </div>
                <div>
                    <span>Service :</span>
                    <p>Laboratoire de contrôle qualité</p>
                </div>
            </div>
            <div class="card-border-bio">
                <span>Biographie :</span> 
                <p>Agé de 42 ans, j'ai 10 ans d'expérience dans ce secteur d'activité</p>
            </div>
            <embed src="../images/icon-left-cropped.svg"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FFFFFF;
        border-radius: 15px;
        width: 49%;
        margin-bottom: 10px;

        &-border {
            border-radius: 15px;
            border: #FD2D01 1px solid;
            width: 95%;
            height: 95%;
            margin: auto;
            overflow: hidden;
            position: relative;

            * {
                position: relative;
                z-index: 2;
            }

            span {
                text-decoration: underline;
                font-size: 11px;
            }

            p {
                font-size: 13px;
                max-height: 32px;
            }

            &-identity {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 95%;
                margin: 10px auto;

                &-descrip {
                    width: 75%;

                    &-name {
                        display: flex;

                        h2 {
                            font-size: 18px;
                            width: 50%;
                        }
                    }
                }
            }
            &-work {
                display: flex;
                flex-direction: column;
                width: 95%;
                margin: 10px auto 0 auto;

                div {
                    display: flex;
                    margin: 0 auto 10px auto;
                    width: 100%;

                    span {
                        width: 20%;
                    }

                    p {
                        padding: 0 0 0 10px;
                        width: 80%;
                    }
                }
            }
            &-bio {
                width: 95%;
                margin: 0 auto 10px auto;
                
                span {
                    
                }

                p {
                    padding: 5px 0;;
                }
            }
            embed {
                position: absolute;
                width: 200px;
                bottom: -50px;
                right: -50px;
                z-index: 1;
            }
        }
    }
</style>