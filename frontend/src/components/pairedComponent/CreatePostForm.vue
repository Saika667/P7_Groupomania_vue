<script>
    import Button from "../../components/buttonComponent/Button.vue";
    import ProfilImage from "../../components/atomicComponents/ProfilImage.vue";
    import ButtonSubmit from "../../components/buttonComponent/ButtonSubmit.vue";
    // Réussi à faire fonctionner en ajoutant une config dans vite.config.js
    import jwt_decode from "jwt-decode";

    export default {
        data() {
            return {
                writePost: false,
                // Remplace "process.env" côté node
                apiUrl: import.meta.env.VITE_API_URL,
                user: {},
                form: {
                    content: "",
                    image: ""
                },
                imageUrl: ""
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
            },
            createPost: async function() {
                const bearer = localStorage.getItem('userToken');
                const self = this;
                let formData = new FormData();
                formData.append('image', this.form.image);
                formData.append('content', this.form.content);

                fetch(`${this.apiUrl}/posts`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                    body: formData
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(res) {
                    self.$emit('refresh-posts');
                    self.$emit('toaster-event', 'success', res.message);
                    self.form.content = '';
                    self.form.image = '';
                    self.writePost = false;
                }).catch((exception) => {
                    // Emit accepte un nombre de paramètres """illimité"""
                    // 1er paramètre = nom de l'event appelé dans le composant parent
                    // Du 2ème au dernier paramètre = arguments passés à l'évènement parent
                    self.$emit('toaster-event', 'error', exception.message);
                });
            },
            getImage(event) {
                this.form.image = event.target.files[0];
                this.imageUrl = URL.createObjectURL(this.form.image);
            }
        },
        async created() {
            const bearer = localStorage.getItem('userToken');

            //décodage du token avec verify
            const decodedToken = jwt_decode(bearer);
            //récupère le userId décodé
            const userId = decodedToken.userId;

            const self = this;

            fetch(`${this.apiUrl}/users/${userId}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                },
            }).then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function(res) {
                self.user = res.user;
            });
        }
    }
</script>

<template>
    <!--
    ajout de l'événement click sur le bouton "ajouter", liaison de la méthode toggleWritePost pour changer la valeur 
    boolean de writePost à chaque fois qu'elle est appelé
    writePost sert à modifier le bouton ajouter ou annuler avec v-show
    writePost sert aussi à ajouter la classe expanded pour le formulaire qui passe la height de 0 à 1000px avec 
    une transition
    par défaut le formulaire n'est pas afficher
    -->
    <div class="create-post">
        <div class="create-post-header">
            <div class="create-post-header-profil">
                <ProfilImage v-bind:imageUrl="user.profileImage"></ProfilImage>
                <div class="create-post-header-profil-descrip">
                    <h2>{{ user.lastName }} {{ user.firstName }}</h2>
                    <div>
                        <font-awesome-icon icon="fas fa-briefcase"/>
                        <p>{{ user.job }} - {{ user.department }}</p>
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
            <textarea placeholder="Description de la publication" id="content" v-model="form.content"></textarea>
            <label class="create-post-form-file">
                <input type="file" id="image" v-on:change="getImage"/>
                <font-awesome-icon icon="fas fa-file-image"/>
            </label>
            <div class="create-post-form-preview" v-if="imageUrl !== ''">
                <h4>Prévisualisation</h4>
                <img v-bind:src="imageUrl"/>
            </div>
            <ButtonSubmit label="Publier" @callback-event="createPost"/>
        </form>
    </div>
</template>

<style scoped lang="scss">
    .create-post {
        display: flex;
        flex-direction: column;
        width: 70%;
        max-width: 1300px;
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
                margin: 0 0 10px 2.5%;
            }

            textarea {
                margin-bottom: 10px;
                height: 100px;
                width: 95%;
                margin: auto;
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

            &-preview {
                padding: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;

                h4 {
                    margin-bottom: 10px;
                    width: 100%;
                }

                img {
                    max-width: 100px;
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
                top: 106px;
                left: 10px;

                input {
                    display: none;
                }
            }
        }
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .create-post {
            padding: 10px;
            width: 85%;
        }
        .create-post-header-profil {
            padding: 0;

            &-descrip h2 {
                font-size: 14px;
            }
        }
        
    }
/*----------------------Fin Version téléphone-------------------------------*/
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        
    }
/*----------------------Fin Version tablette-------------------------------*/
</style>