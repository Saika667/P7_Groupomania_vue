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
                departments: ['Choisir un département','Administratif','Commercial', 'Direction', 'Logistique', 'Maintenance', 'Marketing', 'Production', 'Qualité', 'Recherche et développement']
            }
        }
    }
</script>

<template>
    <Form>
        <h2>Inscrivez-vous</h2>
        <hr />

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
    hr {
        width: 35px;
        border: none;
        border-bottom: 2px solid#FD2D01;
        margin: 15px 0;
    }
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
        width: 100%;
        height: 100px;
        border: 1px solid #FD2D01;
        border-radius: 4px;
        font-size: 1rem;
        margin-bottom: 15px;

        &:focus {
            box-shadow: 0px 0px 5px 0px #FD2D01;
            outline-style: none;
        }
    }
</style>