<script>
    import Header from "../components/baseComponents/Header.vue";
    import MenuItemHome from "../components/menuComponent/MenuItemHome.vue";
    import MenuHome from "../components/menuComponent/MenuHome.vue";
    import ProfilImage from "../components/atomicComponents/ProfilImage.vue";
    import jwt_decode from "jwt-decode";
    import Toaster from '../components/atomicComponents/Toaster.vue';
    import ButtonSubmit from "../components/buttonComponent/ButtonSubmit.vue";
    import ConfirmAction from '../components/atomicComponents/ConfirmAction.vue';

    export default {
        name: "HomePage",
        components: {
            Header,
            MenuItemHome,
            MenuHome,
            ProfilImage,
            Toaster,
            ButtonSubmit,
            ConfirmAction
        },
        data: function() {
            return {
                departments: ['Choisir un département','Administratif','Commercial', 'Direction', 'Logistique', 'Maintenance', 'Marketing', 'Production', 'Qualité', 'Recherche et développement'],
                user: {
                    lastName: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    firstName: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    image: {
                        value: '',
                        imageUrl: '',
                        isValid: true
                    },
                    job: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    department: {
                        value: '',
                        isValid: true
                    },
                    email: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    aboutMe: {
                        value: '',
                        isValid: true
                    }
                },
                apiUrl: import.meta.env.VITE_API_URL,
                modifyProfile: false,
            };
        },
        methods: {
            toggleModifyProfile: function() {
                this.modifyProfile = !this.modifyProfile;
            },
            // Amélioration : Aurait pu etre factorisé en 1 composant pour enregistrement et mise à jour profil
            modify: async function() {
                this.validateLastName();
                this.validateFirstName();
                this.validateJob();
                this.validateDepartment();
                this.validateImage();
                this.validateAboutMe();

                if (this.user.lastName.isValid === false || this.user.firstName.isValid === false ||
                this.user.job.isValid === false || this.user.department.isValid === false ||
                this.user.image.isValid === false || this.user.aboutMe.isValid === false) {
                    return;
                }

                let formData = new FormData();
                for (let key in this.user) {
                    if ((key === "image" && typeof this.user.image.value === "string")
                        || key === "email") {
                        continue;
                    }
                    formData.append(key, this.user[key].value);
                }

                const bearer = localStorage.getItem('userToken');
                const self = this;

                fetch(`${this.apiUrl}/users/modify`, {
                    method: "PUT",
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
                    self.$refs.toaster.show('success', res.message);
                    self.modifyProfile = false;
                }).catch(function(exception) {
                    self.$refs.toaster.show('error', exception.message);
                })
            },
            toggleInputFocus: function(evt) {
                this.user[evt.target.id].isFocused = !this.user[evt.target.id].isFocused;
            },
            onChangeProfileImage: function(event) {
                this.user.image.value = event.target.files[0];
                this.user.image.imageUrl = URL.createObjectURL(this.user.image.value);
            },
            validateLastName: function() {
                let regexName = new RegExp(/^[A-Za-zÀ-ÿ-]{2,}$/);
                if (!regexName.test(this.user.lastName.value)) {
                    this.user.lastName.isValid = false;
                } else {
                    this.user.lastName.isValid = true;
                }
            },
            validateFirstName: function() {
                let regexName = new RegExp(/^[A-Za-zÀ-ÿ-]{2,}$/);
                if (!regexName.test(this.user.firstName.value)) {
                    this.user.firstName.isValid = false;
                } else {
                    this.user.firstName.isValid = true;
                }
            },
            validateJob: function() {
                let regexName = new RegExp(/^[A-Za-zÀ-ÿ \']{2,}$/);
                if (!regexName.test(this.user.job.value)) {
                    this.user.job.isValid = false;
                } else {
                    this.user.job.isValid = true;
                }
            },
            validateImage: function() {
                if (this.user.image.imageUrl == '') {
                    this.user.image.isValid = false;
                } else {
                    this.user.image.isValid = true;
                }
            },
            validateDepartment: function() {
                if (this.user.department.value === 'Choisir un département') {
                    this.user.department.isValid = false;
                } else {
                    this.user.department.isValid = true;
                }
            },
            validateAboutMe: function() {
                let regexAboutMe = new RegExp(/^[A-Za-zÀ-ÿ 0-9\!\.\?\,\'\(\)\-]{0,}$/);
                if(!regexAboutMe.test(this.user.aboutMe.value)) {
                    this.user.aboutMe.isValid = false;
                } else {
                    this.user.aboutMe.isValid = true;
                }
            },
            showConfirmation: function() {
                this.$refs.confirm.isVisible = true;
            },
            deleteProfil: async function() {
                const bearer = localStorage.getItem('userToken');
                const decodedToken = jwt_decode(bearer);
                const userId = decodedToken.userId;
                const self = this;
                
                fetch(`${this.apiUrl}/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    },
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(function() {
                    self.$router.push('/register');
                })
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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                },                
            }).then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function(res) {
                for(let key in res.user) {
                    if(key === "_id" || key === "__v" || key === "isAdmin" || key === "password") {
                        continue;
                    }
                    if (key === "profileImage") {
                        self.user.image.imageUrl = res.user[key];
                    } else {
                        self.user[key].value = res.user[key];
                    }
                }
            })
        }
    }
</script>
    
<template>
    <Header imageAddress="../images/icon-cropped-white.svg"/>
    <ConfirmAction ref="confirm" @delete="deleteProfil"></ConfirmAction>
    <Toaster ref="toaster"></Toaster>
    <MenuHome>
        <router-link to="/home">
            <MenuItemHome iconClass="fas fa-house-chimney">Accueil</MenuItemHome>
        </router-link>
        <router-link to="/profil">
            <MenuItemHome iconClass="fas fa-user">Mon profil</MenuItemHome>
        </router-link>
        <router-link to="/community">
            <MenuItemHome iconClass="fas fa-users">Communauté</MenuItemHome>
        </router-link>
        <MenuItemHome iconClass="fas fa-bell">Mes notifications</MenuItemHome>
        <MenuItemHome iconClass="fas fa-power-off" v-bind:isLogout="true">Déconnexion</MenuItemHome>
    </MenuHome>
    <main class="profil">
        <div class="content">
            <div class="content-header">
                <div class="content-header-btn">
                    <div class="content-header-btn-modify" v-on:click="toggleModifyProfile()">
                        <font-awesome-icon icon="fas fa-pencil"/>
                        <span>Modifier</span>
                    </div>

                    <div class="content-header-btn-delete" v-on:click="showConfirmation">
                        <font-awesome-icon icon="fas fa-trash-can"/>
                        <span>Supprimer</span>
                    </div>
                </div>

                <div class="content-header-identity" v-show="!modifyProfile">
                    <ProfilImage sizeImage="100px" v-bind:imageUrl="user.image.imageUrl"></ProfilImage>
                    <h2>{{user.lastName.value}} {{user.firstName.value}}</h2>
                </div>
            </div>

            <div class="content-job" v-show="!modifyProfile">
                <div class="content-job-info">
                    <p>Poste occupé :</p> <span>{{user.job.value}}</span>
                </div>
                <div class="content-job-info">
                    <p>Département :</p> <span>{{user.department.value}}</span>
                </div>
                <div class="content-job-info">
                    <p>E-mail :</p> <span>{{user.email.value}}</span>
                </div>
            </div>

            <div class="content-bio" v-show="!modifyProfile">
                <span>Biographie :</span>
                <p>{{user.aboutMe.value}}</p>
            </div>

            <form class="content-form" v-show="modifyProfile">
                <div class="content-form-image">
                    <div class="content-form-image-preview" v-if="imageUrl !== ''">
                        <h4>Prévisualisation</h4>
                        <div class="content-form-image-preview-border">
                            <img v-bind:src="user.image.imageUrl"/>
                        </div>
                    </div>

                    <div class="inputContainer">
                        <div class="input-wrapper">
                            <div class="inputContainer-icon">
                                <font-awesome-icon icon="fas fa-camera"/>
                            </div>
                            <input class="form-input" 
                                id="image" 
                                type="file"
                                v-on:change="onChangeProfileImage"
                            />
                        </div>
                        <small class="errorMessage" v-if="!user.image.isValid">
                            Fichier incorrect.
                        </small>
                    </div>
                </div>

                <div class="content-form-name">
                    <div class="inputContainer inputLastName">
                        <div class="input-wrapper">
                            <div class="inputContainer-icon">
                                <font-awesome-icon icon="fas fa-user"
                                    v-bind:class="user.lastName.isFocused ? 'focused' : ''"/>
                            </div>
                            <input class="form-input" 
                                id="lastName" 
                                type="text"
                                v-model="user.lastName.value"
                                label="Nom"
                                v-on:focusin="toggleInputFocus" 
                                v-on:focusout="toggleInputFocus"
                                v-on:change="validateLastName"
                            />
                        </div>
                        <small class="errorMessage" v-if="!user.lastName.isValid">
                            Nom incorrect.
                        </small>
                    </div>

                    <div class="inputContainer inputFirstName">
                        <div class="input-wrapper">
                            <div class="inputContainer-icon">
                                <font-awesome-icon icon="fas fa-user"
                                    v-bind:class="user.firstName.isFocused ? 'focused' : ''"/>
                            </div>
                            <input class="form-input" 
                                id="firstName" 
                                type="text"
                                v-model="user.firstName.value"
                                label="Prénom"
                                v-on:focusin="toggleInputFocus" 
                                v-on:focusout="toggleInputFocus"
                                v-on:change="validateFirstName"
                            />
                        </div>
                        <small class="errorMessage" v-if="!user.firstName.isValid">
                            Prénom incorrect.
                        </small>
                    </div>
                </div>

                <div class="content-form-job">
                    <div class="content-form-job-info">
                        <p>Poste occupé : </p>
                        <div class="inputContainer inputJob">
                            <div class="input-wrapper">
                                <div class="inputContainer-icon">
                                    <font-awesome-icon icon="fas fa-briefcase" 
                                        v-bind:class="user.job.isFocused ? 'focused' : ''"/>
                                </div>
                                <input class="form-input" 
                                    id="job" 
                                    type="text"
                                    v-model="user.job.value"
                                    label="Poste occupé"
                                    v-on:focusin="toggleInputFocus" 
                                    v-on:focusout="toggleInputFocus"
                                    v-on:change="validateJob"
                                />
                            </div>
                            <small class="errorMessage" v-if="!user.job.isValid">
                                Métier incorrect.
                            </small>
                        </div>
                    </div>

                    <div class="content-form-job-info">
                        <p>Département : </p>
                        <div class="input-wrapper department">
                            <select name="" id="department" v-on:change="validateDepartment" v-model="user.department.value">
                                <option v-for="department in departments" v-bind:value="department">{{department}}</option>
                            </select>
                            <small class="errorMessage" v-if="!user.department.isValid">
                                Département incorrect.
                            </small>
                        </div>
                    </div>

                    <div class="content-form-job-info">
                        <p>E-mail : </p>
                        <div class="inputContainer inputJob">
                            <div class="input-wrapper">
                                <div class="inputContainer-icon">
                                    <font-awesome-icon icon="fas fa-envelope"
                                        v-bind:class="user.email.isFocused ? 'focused' : ''"/>
                                </div>
                                <input class="form-input" 
                                    id="email" 
                                    type="email"
                                    v-model="user.email.value"
                                    label="Email"
                                    disabled
                                    v-on:focusin="toggleInputFocus" 
                                    v-on:focusout="toggleInputFocus"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <p>Biographie : </p>
                <textarea placeholder="A propos de moi..." 
                    id="about-me" 
                    v-model="user.aboutMe.value" 
                    v-on:change="validateAboutMe">
                </textarea>
                <small class="errorMessage" v-if="!user.aboutMe.isValid">
                    Ce champ n'accepte pas certains caractères spéciaux comme ":" ou "=".  
                </small>
                <ButtonSubmit label="Modifier" @callback-event="modify"></ButtonSubmit>
            </form>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .profil {
        padding: 80px 0 20px 83px;
        min-height: calc(100vh - 80px);
        background-color: lighten(#4E5166, 60);
    }

    .content {
        margin: auto;
        border-radius: 20px;
        background-color: #FFFFFF;
        width: 90%;
        padding: 15px;
        color: #4E5166;

        &-header {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;

            &-btn {
                display: flex;

                &-modify, &-delete {
                    display: flex;
                    width: 33px;
                    height: 33px;
                    overflow: hidden;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 500ms ease-in-out;

                    &:hover {
                        width: 118px;
                        background-color: #FD2D01;
                        color: #FFFFFF;
                        transition: all 500ms ease-in-out;
                        
                        & svg {
                            padding-left: 0;
                        }
                        
                        & span {
                            padding-left: 10px;
                        }
                    }

                    & svg {
                        padding-left: 75px;
                    }

                    & span {
                        padding-left: 15px;
                    }
                }

                &-modify{
                    margin-right: 10px;
                }
            }
           

            &-identity {
                display: flex;
                align-items: center;
                margin: 0 0 10px 0;

                h2 {
                    padding: 0 0 0 15px;
                    font-size: 30px;
                }
            }
        }

        &-job {
            margin: 15px 0;
            &-info {
                margin: 10px 0;
                display: flex;
                p {
                    width: 145px;
                    text-decoration: underline;
                }
                span {
                    font-weight: bold;
                }
            } 
        }

        &-bio {

            span {
                text-decoration: underline;
            }

            p {
                margin-top: 10px;
            }
        }
        &-form {
            padding: 20px;

            &-image {
                display: flex;
                align-items: center;

                .inputContainer {
                    margin: 0;
                }
                &-preview {
                    width: 35%;
                    display: flex;
                    flex-direction: column;
                    h4 {
                        margin-bottom: 10px;
                    }
                    &-border {
                        border-radius: 50%;
                        overflow: hidden;
                        width: 100px;
                        height: 100px;
                        display: flex;
                        margin-left: 25px;
                        img {
                            width: 100%;
                            object-fit: cover;
                        }
                    }
                }
            }

            &-name {
                display: flex;
                justify-content: space-between;

            }

            &-job {
                
                &-info {
                    display: flex;
                    align-items: baseline;
                    margin-bottom: 10px;

                    .department {
                        width: 100%;
                    }
                    
                    p {
                        width: 200px;
                    }
                }
            }
        }
    }
    .errorMessage {
        color: #FD2D01;
        font-style: italic;
        font-size: 11px;
        margin-top: 5px;
    }
    .inputFirstName, .inputLastName {
        width: 300px;
    }
    .inputJob {
        width: 100%;
    }
    .inputContainer {
        display: flex;
        margin: 0 0 15px 0;
        flex-direction: column;
        position: relative;

        .input-wrapper {
            display: flex;
            align-items: center;
        }
        &-icon {
            position: absolute;
        }
        input {
            border: none;
            padding: 5px 10px 5px 30px;
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #eaeaea;
            box-sizing: border-box;
            
            &:focus {
                outline: none;
            }
        }
        svg {
            color: #FFD7D7;
            &.focused {
                color: #FD2D01;
            }
        }
    }

    textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #FD2D01;
        border-radius: 4px;
        font-size: 1rem;
        margin: 10px 0 0 0;

        &:focus {
            box-shadow: 0px 0px 5px 0px #FD2D01;
            outline-style: none;
        }
    }

    select {
        height: 35px;
        background: #FD2D01;
        color: white;
        font-size: 1rem;
        border: 2px #FD2D01 solid;
        text-align: center;
        width: 100%;
    }
/*----------------------Version téléphone-------------------------------*/
   @media all and (max-width: 768px) {
        .profil {
            padding: 80px 0 20px 0;
        }
        .content-form-image-preview-border {
            margin-left: 0;
        }
        .content-form-job-info {
            flex-direction: column;
        }
    }
   
/*----------------------Fin Version téléphone-------------------------------*/
</style>