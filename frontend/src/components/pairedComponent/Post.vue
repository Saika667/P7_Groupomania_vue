<script>
    import ProfilImage from "../../components/atomicComponents/ProfilImage.vue";
    import Comment from "./Comment.vue";
    import Clock from "../../components/atomicComponents/Clock.vue";
    import jwt_decode from 'jwt-decode';

    export default {
        components: { 
            ProfilImage, 
            Comment,
            Clock
        },
        props: ['post', 'isAdmin'],
        data: function() {
            return {
                hasImage: this.post.imageUrl !== '',
                isVisible: false,
                isLike: this.post.hasUserLiked,
                apiUrl: import.meta.env.VITE_API_URL,
                contentComment: '',
                displayComments: false,
                comments: [],
                userId: ''
            }
        },
        methods: {
            toggleVisibility() {
                this.isVisible = !this.isVisible;
            },
            toggleLike() {
                this.isLike = !this.isLike;
                const bearer = localStorage.getItem('userToken');
                const self = this;
                fetch(`${this.apiUrl}/posts/${this.post._id}/like`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                    body: JSON.stringify({status: this.isLike ? 1 : 0})
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(function(res) {
                    self.post.numberLike = self.isLike ? self.post.numberLike + 1 : self.post.numberLike - 1;
                    self.$forceUpdate();
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
                }).then(function(comments) {
                    self.comments = comments;
                    self.$forceUpdate();
                })
            },
            showConfirmation: function() {
                // vnode permet de récupérer la key passée au composant depuis le parent
                // Passer la key permet d'identifier le composant sur lequel se situe l'action
                this.$emit('show-confirmation', this._.vnode.key);
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
                }).then(function(res) {
                    console.log(res);
                    self.$emit('refresh-posts');
                    //TODO faire apparaitre le message "post supprimé"
                })
            },
            showComments: async function() {
                const bearer = localStorage.getItem('userToken');
                const self = this;
                //TODO ajouter catch sur tous les fetch
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
                }).then(function(comments) {
                    self.comments = comments;
                    self.displayComments = true;
                    self.$forceUpdate();
                })
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
            
            <div class="post-header-menu" v-on:click="toggleVisibility" v-if="isAdmin || userId === post.user._id">
                <font-awesome-icon icon="fas fa-ellipsis-vertical" />
                <div class="post-header-menu-content" v-bind:class="{isVisible: this.isVisible}">
                    <div class="post-header-menu-content-item">
                        <span>Modifier</span>
                    </div>
                    <div class="post-header-menu-content-item" v-on:click="showConfirmation">
                        <span>Supprimer</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="post-main">
            <div class="post-main-descrip">
                <p>{{ post.content }}</p>
            </div>
            <!-- Vérifier src avec une route différente de fakeroot -->
           <img v-if="post.imageUrl !== ''" v-bind:src="post.imageUrl" alt="" />
        </div>

        <div class="post-footer">
            <div class="post-footer-number">
                <div class="post-footer-number-comment" v-on:click="showComments">
                    <font-awesome-icon icon="fas fa-comments" />
                    {{post.numberComment}} commentaires
                </div>

                <div class="post-footer-number-like" v-bind:class="{isLike: this.isLike}" v-on:click="toggleLike">
                    {{post.numberLike}}
                    <font-awesome-icon icon="fas fa-heart" />
                </div>
            </div>
            <div v-if="displayComments">
                <Comment v-for="comment of comments" v-bind:comment="comment"></Comment>
            </div>
            <div class="post-footer-comments">
                <ProfilImage sizeImage="40px"></ProfilImage>
                <input type="text" placeholder="Ajouter un commentaire" v-model="contentComment"/>
                <div class="post-footer-comments-send" v-on:click="createComment">
                    <font-awesome-icon icon="fas fa-paper-plane" />
                </div>
            </div>
        </div>
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
/*----------------------Version tablette-------------------------------*/
    @media all and (min-width: 769px) and (max-width: 1300px) {
        
    }
/*----------------------Fin Version tablette-------------------------------*/
/*----------------------Fin Version wide-------------------------------*/

/*----------------------Fin Version tablette-------------------------------*/
</style>