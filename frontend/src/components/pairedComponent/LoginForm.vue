<script>
    import Button from "../../components/buttonComponent/Button.vue";

    export default {
        components: {
            Button
        },
        data: function() {
            return {
                // Remplace "process.env" côté node
                apiUrl: import.meta.env.VITE_API_URL,
                user: {
                    email: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    },
                    password: {
                        value: '',
                        isFocused: false,
                        isValid: true
                    }
                },
                loginError: false
            };
        },
        methods: {
            /*
            On récupère les valeurs des champs email et mot de passe puis on fait un appel API via fetch
            on utilise la méthode POST et on lui passe dans le corps de la requete un objet avec email et password
            email et password sont des raccourcis on pourrait aussi le noté comme suit :
            body: JSON.stringify({
                email : email, (valeur de la variable email) 
                password : password (valeur de la variable password)
            })
            Le premier then sert à savoir si le statut est ok et retourne la réponse de l'API dans un objet JSON
            La réponse de l'API est composé d'un userId et d'un token
            Dans le deuxième then récupère le token et l'enregistre dans le local storage avec pour clé userToken
            cela permet à l'utilisateur de ne pas avoir à se reconnecter à chaque changement de page
            */
            login: async function() {
                // Sauvegarde du contexte pour utilisation dans .then (autre contexte)
                const self = this;

                let formUser = {};
                for (let key in this.user) {
                    formUser[key] = this.user[key].value;
                }
                
                fetch(`${this.apiUrl}/auth/login`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formUser)
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(function(res) {
                    if (res.token) {
                        localStorage.setItem('userToken', res.token);
                        // On redirige vers la page /home
                        self.$router.push('/home');
                    }
                }).catch(function() {
                    self.loginError = true;
                });
            },

            toggleInputFocus: function(evt) {
                this.user[evt.target.id].isFocused = !this.user[evt.target.id].isFocused;
            },
        }
    }
</script>

<template>
    <form>
        <h2>Connexion à votre compte</h2>
        <hr />

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
                />
        </div>

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
                v-on:focusin="toggleInputFocus" 
                v-on:focusout="toggleInputFocus"
                v-on:keypress.enter="login"
                />
        </div>

        <small class="errorMessage" v-if="loginError">
            Paire login/mot de passe incorrecte.
        </small>

        <div class="checkbox">
            <input type="checkbox"/> Se souvenir de moi
        </div>
    <!--
        callback-event est le nom de l'événement défini dans le composant button qui fait appel à une méthode du parent
        ici loginForm
        cet événement appel la méthode "login"
    -->
        <Button label="Se connecter" @callback-event="login"/>
        
        <p class="forgotten">Mot de passe oublié ?</p>
    </form>
</template>

<style scoped lang="scss">
    hr {
        width: 35px;
        border: none;
        border-bottom: 2px solid#FD2D01;
        margin: 15px 0;
    }
    .checkbox {
        margin: 20px 0;
    }
    .forgotten {
        margin-top: 20px;
        color: #000000;
        width: fit-content;
    }
    .errorMessage {
        color: #FD2D01;
        font-style: italic;
        font-size: 11px;
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