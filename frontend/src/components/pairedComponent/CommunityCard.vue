<script>
    import ProfilImage from "../../components/atomicComponents/ProfilImage.vue";

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
                <ProfilImage v-bind:imageUrl="user.profileImage"></ProfilImage>
                <div class="card-border-identity-descrip">
                    <h2>{{ user.lastName}} {{user.firstName}}</h2>
                </div>
                <div class="card-border-identity-content" v-if="isAdmin">
                    <div class="card-border-identity-content-delete">
                        <div class="card-border-identity-content-delete-svg">
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
            }

            &-identity {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 95%;
                margin: 10px auto;

                &-descrip {
                    width: 70%;
                    padding: 0 0 0 10px;
                    display: flex;
                        
                    h2 {
                        font-size: 18px;
                        white-space: nowrap;
                    }
                }

                &-content {
                    position: absolute;
                    right: 2px;

                    &-delete {
                        display: flex;
                        align-items: center;
                        width: 33px;
                        overflow: hidden;
                        cursor: pointer;
                        transition: all 500ms ease-in-out;
                        border-radius: 20px;

                        &-svg {
                            padding: 5px 10px;
                        }

                        span {
                            padding: 0 15px 0 0 ;
                            text-decoration: none;
                            font-weight: bold;
                        }

                        &:hover {
                            width: 90px;
                            background-color: #FD2D01;
                            color: #FFFFFF;
                            transition: all 500ms ease-in-out;
                            .card-border-identity-content {
                                width: 90px;
                            }
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
            padding: 0;
        }
        .card-border-identity-descrip h2 {
            font-size: 14px;
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
        .card-border-identity-descrip h2 {
            font-size: 15px;
            white-space: nowrap;
        }
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>