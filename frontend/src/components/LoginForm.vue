<script>
    import Form from "../components/Form.vue";
    import FormInput from "../components/FormInput.vue";
    import Button from "../components/Button.vue";
    export default {
        components: {
            Form,
            FormInput,
            Button
        },
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

        <Button label="Se connecter" url="/home"/>
        
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
    /*.choice {
        display: flex;
        justify-content: space-between;
        color: #4E5166;
        width: 408px;
        
        &-FMdp {
            text-decoration: none;
            color: #4E5166;
            cursor: pointer;
        }
    }*/
</style>