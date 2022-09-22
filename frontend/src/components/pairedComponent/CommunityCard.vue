<script>
    import ProfilImage from "../../components/ProfilImage.vue";

    export default {
        components: { 
            ProfilImage,
        },
        props: ['user', 'isAdmin'],
    }
</script>

<template>
    <div class="card">
        <div class="card-border">
            <div class="card-border-identity">
                <ProfilImage></ProfilImage>
                <div class="card-border-identity-descrip">
                    <div class="card-border-identity-descrip-name">
                        <h2>{{ user.lastName}}&nbsp;{{user.firstName}}</h2>
                    </div>
                </div>
                <div class="card-border-identity-container" v-if="isAdmin">
                    <div class="card-border-identity-container-delete">
                        <div class="card-border-identity-container-delete-svg">
                            <font-awesome-icon icon="fas fa-trash-can"/>
                        </div>
                        <span>Supprimer</span>
                    </div>
                </div>
            </div>
            
            <div class="card-border-work">
                <div>
                    <span>Poste :</span>
                    <p>{{user.job}}</p>
                </div>
                <div>
                    <span>Service :</span>
                    <p>{{user.department}}</p>
                </div>
            </div>
            <div class="card-border-bio">
                <span>Biographie :</span> 
                <p>{{user.aboutMe}}</p>
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
                    width: 70%;

                    &-name {
                        display: flex;

                        h2 {
                            font-size: 18px;
                            width: 50%;
                        }
                    }
                }

                &-container {
                    width: 90px;
                    display: flex;
                    justify-content: center;

                    &-delete {
                        display: flex;
                        align-items: center;
                        width: 33px;
                        overflow: hidden;
                        cursor: pointer;
                        border: 1px solid #FD2D01;
                        transition: all 500ms ease-in-out;
                        border-radius: 20px;

                        &-svg {
                            padding: 5px 10px;
                        }

                        span {
                            padding: 0 13px 0 0 ;
                            text-decoration: none;
                            font-weight: bold;
                        }

                        &:hover {
                            width: 90px;
                            transition: all 500ms ease-in-out;
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
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .card {
            width: 90%;
        }
        .card-border-identity-descrip {
            margin-left: 10px;
        }
        .card-border-work div p {
            font-size: 11px;
        }
        .card-border-bio p {
            font-size: 10px;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>