<script>
    import Form from "../../components/formComponent/Form.vue";
    import FormInput from "../../components/formComponent/FormInput.vue";
    import Button from "../../components/buttonComponent/Button.vue";
    export default {
        components: {
            Form,
            FormInput,
            Button
        },
        data: function() {
            return {
                apiUrl: "http://localhost:3000/api"
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
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                // Sauvegarde du contexte pour utilisation dans .then (autre contexte)
                const self = this;
                
                fetch(`${this.apiUrl}/auth/login`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, password})
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(function(res) {
                    if (res.token) {
                        localStorage.setItem('userToken', res.token);
                        localStorage.setItem('userId', res.userId);
                        // On redirige vers la page /home
                        self.$router.push('/home');
                    }
                })
            }
        }
    }
</script>

<template>
    <!--
    callback-event est le nom de l'événement défini dans le composant button qui fait appel à une méthode du parent
    ici loginForm
    cet événement appel la méthode "login"
    -->
    <Form>
        <h2>Connexion à votre compte</h2>
        <hr />
        <FormInput inputId="email" label="Email" type="email" iconClass="fas fa-envelope"/>
        <FormInput inputId="password" label="Mot de passe" type="password" iconClass="fas fa-lock"/>

        <div class="checkbox">
            <input type="checkbox"/> Se souvenir de moi
        </div>

        <Button label="Se connecter" @callback-event="login"/>
        
        <router-link class="forgotten" to="/forgotten-password">Mot de passe oublié ?</router-link>
    </Form>
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
</style>