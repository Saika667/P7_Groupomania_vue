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
                departments: ['Choisir un département','Administratif','Commercial', 'Direction', 'Logistique', 'Maintenance', 'Marketing', 'Production', 'Qualité', 'Recherche et développement'],
                apiUrl: "http://localhost:3000/api",
                password: '',
                hasMinimumLength: false,
                hasNumber: false,
                hasLowercase: false,
                hasUppercase: false,
                hasSpecial: false,
                isPasswordOk: false,
            }
        },
        mounted() {
            // Une fois les composants montés, on watch (surveiller les changements) de valeur de la data "value"
            // Du composant enfant (FormInput) ayant une ref = à password
            this.$watch(
                // Argument de la fonction watch correspondant au chemin de la variable à watch (ici la value du FormInput 
                // ayant pour ref : password)
                "$refs.password.value",
                function() {
                    let password = this.$refs.password.value;
                    this.hasMinimumLength = password.length >= 8;
                    this.hasNumber = /\d/.test(password);
                    this.hasLowercase = /[a-z]/.test(password);
                    this.hasUppercase = /[A-Z]/.test(password);
                    this.hasSpecial = /[!@#$%^&*)(+=._-]/.test(password);
                    if(this.hasMinimumLength && this.hasNumber && this.hasLowercase &&
                     this.hasUppercase && this.hasSpecial) {
                        this.isPasswordOk = true;
                    }
                    console.log(this.isPasswordOk);
                }
            )
        },
        methods: {
            signup: async function() {
                const lastName = document.getElementById('nom').value;
                const firstName = document.getElementById('prenom').value;
                const profileImage = document.getElementById('profil-image').files[0].name; ;
                const job = document.getElementById('poste').value;
                const department = document.getElementById('department').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const aboutMe = document.getElementById('about-me').value;
                
                fetch(`${this.apiUrl}/auth/signup`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({lastName, firstName, profileImage, job, department, email, password, aboutMe})
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
        <h2>Inscrivez-vous</h2>
        <hr />

        <div class="name">
            <FormInput inputId="nom" label="Nom" type="text" iconClass="fas fa-user" inputWidth="150px"/>
            <FormInput inputId="prenom" label="Prénom" type="text" iconClass="fas fa-user" inputWidth="150px"/>
        </div>

        <FormInput inputId="profil-image" label="Photo de profil" type="file" iconClass="fas fa-camera" />

        <FormInput inputId="poste" label="Poste occupé" type="text" iconClass="fas fa-briefcase"/>
        <select name="" id="department">
            <option v-for="department in departments" v-bind:value="department">{{department}}</option>
        </select>

        <FormInput inputId="email" label="Email" type="email" iconClass="fas fa-envelope"/>
        <FormInput inputId="password" label="Mot de passe" type="password" iconClass="fas fa-lock" ref="password"/>
        <small>Votre mot de passe doit contenir au moins :<br/>
              <span :class="hasMinimumLength ? 'has_required' : ''">8 caractères</span>,<br/>
              <span :class="hasLowercase ? 'has_required' : ''">1 lettre minuscule</span>,<br/>
              <span :class="hasUppercase ? 'has_required' : ''">1 lettre majuscule</span>,<br/>
              <span :class="hasNumber ? 'has_required' : ''">1 chiffre</span>,<br/>
              <span :class="hasSpecial ? 'has_required' : ''">1 caractère spécial</span>
        </small>
        <FormInput inputId="password-confirmation" label="Confirmation du mot de passe" type="password" iconClass="fas fa-lock"/>

        <!--<FormInput inputId="bio" label="A propos de moi ..." type="text" />-->
        <textarea placeholder="A propos de moi..." id="about-me"></textarea>
        <Button label="S'inscrire" @callback-event="signup"/>
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