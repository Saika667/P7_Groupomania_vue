<script>
    import ProfilImage from "../../components/atomicComponents/ProfilImage.vue";
    import Comment from "./Comment.vue";
    import Clock from "../../components/atomicComponents/Clock.vue";
    import jwt_decode from 'jwt-decode';
    import ButtonSubmit from "../../components/buttonComponent/ButtonSubmit.vue";

    export default {
        components: { 
            ProfilImage, 
            Comment,
            Clock,
            ButtonSubmit
        },
        props: ['post', 'isAdmin', 'connectedUserImage'],
        data: function() {
            return {
                hasImage: this.post.imageUrl !== '',
                isVisible: false,
                apiUrl: import.meta.env.VITE_API_URL,
                contentComment: '',
                displayComments: false,
                comments: [],
                userId: '',
                isModifyPost: false,
                previewImage: {
                    image: this.post.imageUrl,
                    url: ''
                }
            }
        },
        methods: {
            toggleModifyPost: function() {
                this.isModifyPost = !this.isModifyPost;
            },
            toggleVisibility() {
                this.isVisible = !this.isVisible;
            },
            toggleLike() {
                this.post.hasUserLiked = !this.post.hasUserLiked;
                const bearer = localStorage.getItem('userToken');
                const self = this;
                fetch(`${this.apiUrl}/posts/${this.post._id}/like`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                    body: JSON.stringify({status: this.post.hasUserLiked ? 1 : 0})
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(res) {
                    self.post.numberLike = self.post.hasUserLiked ? self.post.numberLike + 1 : self.post.numberLike - 1;
                    self.$forceUpdate();
                }).catch((exception) => {
                    self.$refs.toaster.show('error', exception.message);
                });
            },
            showConfirmation: function() {
                // vnode permet de récupérer la key passée au composant depuis le parent
                // Passer la key permet d'identifier le composant sur lequel se situe l'action
                this.$emit('show-confirmation', this._.vnode.key);
            },
            showComments: async function() {
                const bearer = localStorage.getItem('userToken');
                const self = this;
                if (this.displayComments) {
                    this.displayComments = false;
                    return;
                }
                fetch(`${this.apiUrl}/comments/post/${this.post._id}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(comments) {
                    self.comments = comments;
                    self.displayComments = true;
                    self.$forceUpdate();
                }).catch((exception) => {
                    self.$refs.toaster.show('error', exception.message);
                });
            },
            createComment: async function() {
                const content = this.contentComment;
                const bearer = localStorage.getItem('userToken');
                const self = this;
                fetch(`${this.apiUrl}/comments/post/${this.post._id}`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                    body: JSON.stringify({content})
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(res) {
                    self.post.numberComment = self.post.numberComment + 1;
                    self.contentComment = '';
                    self.refreshComments();
                    self.$forceUpdate();
                    self.$emit('toaster-event', 'success', res.message);
                }).catch((exception) => {
                    self.$emit('toaster-event', 'error', exception.message);
                });
            },
            refreshComments: async function() {
                const bearer = localStorage.getItem('userToken');
                const self = this;
                fetch(`${this.apiUrl}/comments/post/${this.post._id}`, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(comments) {
                    self.comments = comments;
                    self.$forceUpdate();
                }).catch((exception) => {
                    self.$refs.toaster.show('error', exception.message);
                });
            },
            deletePost: async function() {
                const bearer = localStorage.getItem('userToken');
                const self = this;
                
                fetch(`${this.apiUrl}/posts/${this.post._id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(res) {
                    self.$emit('refresh-posts');
                    self.$emit('toaster-event', 'success', res.message);
                }).catch((exception) => {
                    self.$emit('toaster-event', 'error', exception.message);
                });
            },
            modifyPost: async function() {
                if(this.post.content === '') {
                    return;
                }

                let formData = new FormData();
                formData.append('content', this.post.content);
                formData.append('image', this.previewImage.image);
                
                const bearer = localStorage.getItem('userToken');
                const self = this;
                
                fetch(`${this.apiUrl}/posts/${this.post._id}/modify`, {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${bearer}`
                    },
                    body: formData
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Quelque chose s'est mal passé");
                }).then(function(res) {
                    self.isModifyPost = false;
                    self.$emit('refresh-posts');
                    self.$emit('toaster-event', 'success', res.message);
                }).catch((exception) => {
                    self.$emit('toaster-event', 'error', exception.message);
                });

            },
            getImage(event) {
                // Champ qui sera envoyé à l'API -> comprend le nom + le fichier etc
                this.previewImage.image = event.target.files[0];
                // Sert à faire une preview du fichier uploadé
                this.previewImage.url = URL.createObjectURL(this.previewImage.image);
            },
            deleteImage: function() {
                this.post.imageUrl = '';
                this.previewImage.image = '';
                this.previewImage.url = '';
            }
        },
        created() {
            const bearer = localStorage.getItem('userToken');
            //décodage du token avec verify
            const decodedToken = jwt_decode(bearer);
            //récupère le userId décodé
            this.userId = decodedToken.userId;
        }
    }
</script>

<template>
    <article class="post">
        <div class="post-header">
            <div class="post-header-profil">
                <ProfilImage v-bind:imageUrl="post.user.profileImage"></ProfilImage>
                <div class="post-header-profil-identity">
                    <h2>{{ post.user.lastName }} {{ post.user.firstName }}</h2>
                    <div class="post-header-profil-identity-job">
                        <font-awesome-icon icon="fas fa-briefcase"/>
                        <p>{{ post.user.job }} - {{ post.user.department }}</p>
                    </div>
                    <p class="post-header-profil-identity-timer">
                        <Clock v-bind:date="post.createdDatetime"></Clock>
                    </p>
                </div>
            </div>
            <div class="post-header-menu" v-show="isModifyPost" v-on:click="isModifyPost = false">
                <font-awesome-icon icon="fas fa-xmark"/>
            </div>
            <div class="post-header-menu" v-on:click="toggleVisibility" v-show="!isModifyPost" v-if="isAdmin || userId === post.user._id">
                <font-awesome-icon icon="fas fa-ellipsis-vertical"/>
                <div class="post-header-menu-content" v-bind:class="{isVisible: this.isVisible}">
                    <div class="post-header-menu-content-item" v-on:click="toggleModifyPost">
                        <span>Modifier</span>
                    </div>
                    <div class="post-header-menu-content-item" v-on:click="showConfirmation">
                        <span>Supprimer</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="post-main" v-show="!isModifyPost">
            <div class="post-main-descrip">
                <p>{{ post.content }}</p>
            </div>
            <img v-if="post.imageUrl !== ''" v-bind:src="post.imageUrl" alt="" />
        </div>

        <div class="post-footer" v-show="!isModifyPost">
            <div class="post-footer-number">
                <div class="post-footer-number-comment" v-on:click="showComments">
                    <font-awesome-icon icon="fas fa-comments" />
                    {{post.numberComment}} commentaires
                </div>

                <div class="post-footer-number-like" v-bind:class="{isLike: this.post.hasUserLiked}" v-on:click="toggleLike">
                    {{post.numberLike}}
                    <font-awesome-icon icon="fas fa-heart" />
                </div>
            </div>
            <div v-if="displayComments">
                <Comment v-for="comment of comments" v-bind:comment="comment"></Comment>
            </div>
            <div class="post-footer-comments">
                <ProfilImage sizeImage="40px" v-bind:imageUrl="connectedUserImage"></ProfilImage>
                <input type="text" placeholder="Ajouter un commentaire" v-model="contentComment"/>
                <div class="post-footer-comments-send" v-on:click="createComment">
                    <font-awesome-icon icon="fas fa-paper-plane" />
                </div>
            </div>
        </div>
        <form class="post-modify" v-show="isModifyPost">
            <h3>Modification de Post :</h3>
            <div class="post-modify-descrip">
                <textarea placeholder="Description de la publication" 
                    id="content" 
                    v-model="post.content">
                </textarea>
                <small class="errorMessage" v-if="post.content === ''">
                    Ce champ doit avoir un contenu.  
                </small>
            </div>
            <div class="post-modify-image">
                <div class="inputContainer">
                    <div class="input-wrapper">
                        <label class="file">
                            <input type="file" id="image" v-on:change="getImage" />
                            <font-awesome-icon icon="fas fa-file-image"/>
                            <p>Modifier l'image</p>
                        </label>
                    </div>
                </div>

                <div class="post-modify-image-delete" v-on:click="deleteImage">
                    <font-awesome-icon icon="fas fa-trash-can"/>
                </div>
            </div>
            

            <div class="post-modify-preview" v-if="post.imageUrl !== '' || previewImage.url !== ''">
                <img v-bind:src="previewImage.url === '' ? post.imageUrl : previewImage.url"/>
            </div>
            <ButtonSubmit label="Modifier" @callback-event="modifyPost"></ButtonSubmit>
        </form>        
    </article>
</template>

<style scoped lang="scss">
    .post {
        width: 70%;
        max-width: 1300px;
        margin: 20px auto;
        border-radius: 10px;
        color: #4E5166;
        background-color: white;
        position: relative;
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

                &-content {
                    display: none;
                    flex-direction: column;
                    box-shadow: 0 10px 18px 0 rgb(0 0 0 / 17%);
                    position: absolute;
                    top: 60px;
                    right: -40px;
                    background-color: lighten(#4E5166, 60);
                    &.isVisible {
                        display: flex;
                    }

                    &-item {
                        display: flex;
                        justify-content: center;

                        span {
                            font-size: 15px;
                            padding: 5px 8px;
                            text-align: center;
                        }

                        &:hover {
                            box-shadow: 0 10px 18px 0 rgb(0 0 0 / 17%);
                            font-weight: bold;
                        }
                    }
                }
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
                object-fit: contain;
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
                font-size: 13px;

                &-comment {
                    cursor: pointer;
                }
                &-like {
                    cursor: pointer;
                }
                .isLike {
                    svg {
                        animation: like 750ms ease-in forwards;
                    }
                    
                }
            }
            
            &-comments {
                display: flex;
                position: relative;
                margin-top: 10px;

                &-send {
                    position: absolute;
                    cursor: pointer;
                    bottom: 13px;
                    right: 13px;
                }

                input {
                    margin-left: 15px;
                    border-radius: 20px;
                    border: none;
                    width: 94%;
                    padding-left: 15px;
                    background-color: lighten(#4E5166, 60);
                }
            }
        }
        
        &-modify {
            padding: 20px;

            &-descrip {
                display: flex;
                flex-direction: column;

                textarea {
                    height: 100px;
                    border-radius: 4px;
                    font-size: 1rem;
                    margin: 10px 0 0 0;
                    border: none;
                    box-shadow: 0px 0px 5px 0px #4E5166;
                    resize: none;

                    &:focus {
                        box-shadow: 0px 0px 5px 0px #FD2D01;
                        outline-style: none;
                    }
                }
            }

            &-image {
                display: flex;
                justify-content: space-between;

                &-delete {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
            }

            &-preview {
                img {
                    width: 100%;
                }
            }
        }
    }
    .errorMessage {
        color: #FD2D01;
        font-style: italic;
        font-size: 11px;
        margin: 5px 0;
    }
    .inputContainer {
        display: flex;
        flex-direction: column;
        position: relative;

        .input-wrapper {
            display: flex;
            align-items: center;
        }
        .file {
            display: flex;
            justify-content: center;
            padding: 6px 12px;
            cursor: pointer;
            color: #4E5166;
            font-size: 14px;

            p {
                margin: 0 0 0 5px;
            }

            input {
                display: none;
            }
        }
    }

    @keyframes like {
        0% {
            transform: scale(1);
            color: #FD2D01;
        }
        40% {
            transform: scale(2);
            filter: blur(1px);
        }
        75% {
            transform: scale(1);
            filter: blur(0);
        }
        100% {
            transform: scale(1);
            color: #FD2D01;
        }
    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        .post {
            padding: 10px;
            width: 85%;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/
</style>