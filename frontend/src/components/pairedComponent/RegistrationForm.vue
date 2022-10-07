<script>
    import Button from "../../components/buttonComponent/Button.vue";

    export default {
        components: {
            Button
        },
        data: function() {
            return {
                departments: ['Choisir un département','Administratif','Commercial', 'Direction', 'Logistique', 'Maintenance', 'Marketing', 'Production', 'Qualité', 'Recherche et développement'],
                // Remplace "process.env" côté node
                apiUrl: import.meta.env.VITE_API_URL,
                password: '',
                hasMinimumLength: false,
                hasNumber: false,
                hasLowercase: false,
                hasUppercase: false,
                hasSpecial: false,
                user : {
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
                        isValid: true
                    },
                    job: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    department: {
                        // Valeur initiale du select
                        value: 'Choisir un département',
                        isValid: true
                    },
                    email: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    password: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    passwordConfirmation: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    aboutMe: {
                        value: '',
                        isValid: true
                    }
                }
            }
        },
        methods: {
            signup: async function() {
                this.validateLastName();
                this.validateFirstName();
                this.validateJob();
                this.validateDepartment();
                this.validateImage();
                this.validateEmail();
                this.validatePassword();
                this.validatePasswordConfirmation();
                this.validateAboutMe();

                if (this.user.lastName.isValid === false || this.user.firstName.isValid === false ||
                this.user.job.isValid === false || this.user.department.isValid === false ||
                this.user.image.isValid === false || this.user.email.isValid === false ||
                this.user.password.isValid === false || this.user.passwordConfirmation.isValid === false ||
                this.user.aboutMe.isValid === false) {
                    return;
                }

                let formData = new FormData();
                for (let key in this.user) {
                    formData.append(key, this.user[key].value);
                }
                const self = this;

                fetch(`${this.apiUrl}/auth/signup`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(function() {
                    self.$router.push('/login');
                })
            },
            toggleInputFocus: function(evt) {
                this.user[evt.target.id].isFocused = !this.user[evt.target.id].isFocused;
            },
            onChangeProfileImage: function(event) {
                this.user.image.value = event.target.files[0];
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
            validateEmail: function() {
                let regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
                if (!regexEmail.test(this.user.email.value)) {
                    this.user.email.isValid = false;
                } else {
                    this.user.email.isValid = true;
                }
            },
            validateImage: function() {
                if (this.user.image.value == '') {
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
            validatePassword: function() {
                let password = this.user.password.value;
                this.hasMinimumLength = password.length >= 8;
                this.hasNumber = /\d/.test(password);
                this.hasLowercase = /[a-z]/.test(password);
                this.hasUppercase = /[A-Z]/.test(password);
                this.hasSpecial = /[!@#$%^&*)(+=._-]/.test(password);
                if(!this.hasMinimumLength || !this.hasNumber || !this.hasLowercase ||
                    !this.hasUppercase || !this.hasSpecial) {
                    this.user.password.isValid = false;
                } else {
                    this.user.password.isValid = true;
                }
            },
            validatePasswordConfirmation: function() {
                if(this.user.password.value !== this.user.passwordConfirmation.value) {
                    this.user.passwordConfirmation.isValid = false;
                } else {
                    this.user.passwordConfirmation.isValid = true;
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
        }
    }
</script>

<template>
    <form>
        <h2>Inscrivez-vous</h2>
        <hr />

        <div class="name">
            <div class="field">
                <div class="inputContainer">
                    <div class="inputContainer-icon">
                        <font-awesome-icon icon="fas fa-user" 
                            v-bind:class="user.lastName.isFocused ? 'focused' : ''"/>
                    </div>
                    <input class="form-input" 
                        id="lastName" 
                        type="text" 
                        placeholder="Nom" 
                        v-model="user.lastName.value" 
                        v-on:focusin="toggleInputFocus" 
                        v-on:focusout="toggleInputFocus"
                        v-on:change="validateLastName"
                        />
                </div>
                <small class="errorMessage" v-if="!user.lastName.isValid">
                    Nom incorrect.
                </small>
            </div>

            <div class="field">
                <div class="inputContainer">
                    <div class="inputContainer-icon">
                        <font-awesome-icon icon="fas fa-user"
                            v-bind:class="user.firstName.isFocused ? 'focused' : ''"/>
                    </div>
                    <input class="form-input" 
                        id="firstName" 
                        type="text" 
                        placeholder="Prénom" 
                        v-model="user.firstName.value" 
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
        
        <div class="inputContainer">
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

        <div class="inputContainer">
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

        <select name="" id="department" v-on:change="validateDepartment" v-model="user.department.value">
            <option v-for="department in departments" v-bind:value="department" >{{department}}</option>
        </select>
        <small class="errorMessage" v-if="!user.department.isValid">
            Département requis.
        </small>

        <div class="inputContainer">
            <div class="inputContainer-icon">
                <font-awesome-icon icon="fas fa-envelope"
                    v-bind:class="user.email.isFocused ? 'focused' : ''"/>
            </div>
            <input class="form-input" 
                id="email" 
                type="email"
                v-model="user.email.value"
                label="Email"
                v-on:focusin="toggleInputFocus" 
                v-on:focusout="toggleInputFocus"
                v-on:change="validateEmail"
                />
        </div>
        <small class="errorMessage" v-if="!user.email.isValid">
            Email incorrect.
        </small>

        <div class="inputContainer">
            <div class="inputContainer-icon">
                <font-awesome-icon icon="fas fa-lock"
                v-bind:class="user.password.isFocused ? 'focused' : ''"/>
            </div>
            <input class="form-input" 
                id="password" 
                type="password"
                label="Mot de passe"
                v-model="user.password.value"
                v-on:keyup="validatePassword"
                v-on:focusin="toggleInputFocus" 
                v-on:focusout="toggleInputFocus"
                />
        </div>
        <small class="help-password">
            Votre mot de passe doit contenir au moins :<br/>
            <span :class="hasMinimumLength ? 'has_required' : ''">8 caractères</span>,<br/>
            <span :class="hasLowercase ? 'has_required' : ''">1 lettre minuscule</span>,<br/>
            <span :class="hasUppercase ? 'has_required' : ''">1 lettre majuscule</span>,<br/>
            <span :class="hasNumber ? 'has_required' : ''">1 chiffre</span>,<br/>
            <span :class="hasSpecial ? 'has_required' : ''">1 caractère spécial</span>
        </small>

        <div class="inputContainer">
            <div class="inputContainer-icon">
                <font-awesome-icon icon="fas fa-lock"
                    v-bind:class="user.passwordConfirmation.isFocused ? 'focused' : ''"/>
            </div>
            <input class="form-input" 
                id="passwordConfirmation" 
                type="password"
                v-model="user.passwordConfirmation.value"
                label="Confirmation du mot de passe"
                v-on:focusin="toggleInputFocus" 
                v-on:focusout="toggleInputFocus"
                v-on:change="validatePasswordConfirmation"
                />
        </div>
        <small class="errorMessage" v-if="!user.passwordConfirmation.isValid">
            Le mot de passe de confirmation doit être identique au mot de passe.
        </small>

        <textarea placeholder="A propos de moi..." id="about-me" v-model="user.aboutMe.value" 
            v-on:change="validateAboutMe"></textarea>
        <small class="errorMessage" v-if="!user.aboutMe.isValid">
            Ce champ n'accepte pas certains caractères spéciaux comme ":" ou "=".  
        </small>
        <Button label="S'inscrire" @callback-event="signup"/>
    </form>
</template>

<style scoped lang="scss">
    hr {
        width: 35px;
        border: none;
        border-bottom: 2px solid#FD2D01;
        margin: 15px 0;
    }
    .name {
        display: flex;
    }
    .has_required {
        text-decoration: line-through;
        color: #689868;
    }
    select {
        height: 35px;
        background: #FD2D01;
        color: white;
        font-size: 1rem;
        border: 2px #FD2D01 solid;
        text-align: center;
        margin: 10px 0;
    }
    textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #FD2D01;
        border-radius: 4px;
        font-size: 1rem;
        margin: 10px 0 15px 0;

        &:focus {
            box-shadow: 0px 0px 5px 0px #FD2D01;
            outline-style: none;
        }
    }
    .help-password {
        color: #4E5166;
        font-size: 11px;
    }

    .errorMessage {
        color: #FD2D01;
        font-style: italic;
        font-size: 11px;
    }
    .field {
        display: flex;
        flex-direction: column;
    }
    /********** FORM **********/
    form {
        display: flex;
        flex-direction: column;
        width: 350px;
        margin: auto;
        border-radius: 0 15px 15px 0;
        background-color: #FFF;
        padding: 50px 60px;
        box-shadow: 0px -2px 15px 5px rgb(0 0 0 / 17%);
        position: relative;
        z-index: 1;
        .inputContainer {
            display: flex;
            margin: 0 0 15px 0;
            align-items: center;
            position: relative;
            &-icon {
                position: absolute;
            }
            input {
                border: none;
                padding: 5px 10px 5px 30px;
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #eaeaea;
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

    }
/*----------------------Version téléphone-------------------------------*/
    @media all and (max-width: 768px) {
        form {
            width: 260px;
            padding: 30px 40px;
        }
    }
/*----------------------Fin Version téléphone-------------------------------*/

</style>