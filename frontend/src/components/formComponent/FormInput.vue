<script>
    export default {
        props : {
            inputId: String,
            label: String,
            type: String,
            iconClass: String,
            inputWidth: {
                type: String,
                default: '354px'
            }
        },
        data: function() {
            return {
                'value' : '',
                'isFocused': false
            };
        },
        methods: {
            validateField: function() {
                switch(this.type) {
                    case 'password':
                        console.log('password');
                        break;
                    case 'email':
                        console.log('email');
                        break;
                }
            },
            toggleInputFocus: function() {
                this.isFocused = !this.isFocused;
            }
        }
    }
</script>
<template>
    <div class="inputContainer">
        <div v-if="iconClass" class="inputContainer-icon">
            <!-- 
            Affiche le composant font awesome seulement si iconClass a été passé au FormInput 
            L'attribut icon est l'attribut remplaçant la class lors d'une utilisation sans framework 
            -->
            <font-awesome-icon v-bind:icon="iconClass" v-bind:class="isFocused ? 'focused' : ''"/>
        </div>
        <!--
        ajout de l'événement focus in et focus out pour appeler la méthode toggleInputFocus pour changer l'état de 
        "isFocused"
        permet d'appliquer ou non une class "focused" sur le font-awesome avec v-bind
        -->
        <input class="form-input" 
            v-bind:id="inputId" 
            v-bind:type="type" 
            v-bind:placeholder="label" 
            v-model="value" 
            v-on:change="validateField()"
            v-on:focusin="toggleInputFocus" 
            v-on:focusout="toggleInputFocus"
            />
    </div>
</template>

<style scoped lang="scss">
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
    /*.inputContainer {
        display: flex;
        margin: 0 auto 15px auto;
        width: min-content;
        border-bottom: 1px solid #FD2D01;
        
        &-icon {
            display: flex;
            align-items: center;
            width: 50px;
            justify-content: center;
        }
        input {
            height: 40px;
            border: none;
            width: v-bind(inputWidth);
            font-size: 1rem;
            color: #4E5166;
            &:focus {
                outline-style: none;
            }
        }
        
        svg {
            color: #FFD7D7;
            font-size: 25px;
            &.focused {
                color: c#FD2D01;
            }
        }
    }*/
</style>