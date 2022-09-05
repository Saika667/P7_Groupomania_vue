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
            login: async function() {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                const res = fetch(`${this.apiUrl}/auth/login`, {
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
                    }
                })
            }
        }
    }
</script>

<template>
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