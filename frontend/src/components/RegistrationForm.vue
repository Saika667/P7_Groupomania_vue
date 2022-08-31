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
        data: function() {
            return {
                departments: ['Choisir un département','Administratif','Commercial', 'Direction', 'Logistique', 'Maintenance', 'Marketing', 'Production', 'Qualité', 'Recherche et développement']
            }
        }
    }
</script>

<template>
    <Form>
        <div class="name">
            <FormInput inputId="nom" label="Nom" type="text" iconClass="fas fa-user" inputWidth="150px"/>
            <FormInput inputId="prenom" label="Prénom" type="text" iconClass="fas fa-user" inputWidth="150px"/>
        </div>

        <FormInput inputId="profil-image" label="Photo de profil" type="file" iconClass="fas fa-camera" />

        <FormInput inputId="poste" label="Poste occupé" type="text" iconClass="fas fa-briefcase"/>
        <select name="" id="">
            <option v-for="department in departments" v-bind:value="department">{{department}}</option>
        </select>

        <FormInput inputId="email" label="Email" type="email" iconClass="fas fa-envelope"/>
        <FormInput inputId="password" label="Mot de passe" type="password" iconClass="fas fa-lock"/>
        <FormInput inputId="password-confirmation" label="Confirmation du mot de passe" type="password" iconClass="fas fa-lock"/>

        <!--<FormInput inputId="bio" label="A propos de moi ..." type="text" />-->
        <textarea placeholder="A propos de moi..."></textarea>
        <Button label="S'inscrire" url="/home"/>
    </Form>
</template>

<style scoped lang="scss">
    .name {
        display: flex;
    }
    select {
        height: 35px;
        background: #FD2D01;
        color: white;
        font-size: 1rem;
        border: 2px #FD2D01 solid;
        text-align: center;
    }
    textarea {
        width: 408px;
        height: 100px;
        border: 1px solid #FD2D01;
        border-radius: 4px;
        font-size: 1rem;
        &:focus {
            box-shadow: 0px 0px 5px 0px #FD2D01;
            outline-style: none;
        }
    }
</style>