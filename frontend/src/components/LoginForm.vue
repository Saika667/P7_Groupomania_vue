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
        <FormInput inputId="email" label="Email" type="email" iconClass="fas fa-envelope"/>
        <FormInput inputId="password" label="Mot de passe" type="password" iconClass="fas fa-lock"/>

        <div class="choice">
            <div>
                <input type="checkbox"/> Se souvenir de moi
            </div>
            <router-link class="choise-FMdp" to="/forgotten-password">Mot de passe oublié ?</router-link>
        </div>

        <Button label="Se connecter" url="/home"/>
    </Form>
</template>

<style scoped lang="scss">
    .choice {
        display: flex;
        justify-content: space-between;
        color: #4E5166;
        width: 408px;
        
        &-FMdp {
            text-decoration: none;
            color: #4E5166;
            cursor: pointer;
        }
    }
</style>