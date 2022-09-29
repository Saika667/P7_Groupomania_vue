<script>
    export default {
        data: function() {
            return {
                apiUrl: import.meta.env.VITE_API_URL,
            }
        },
        props: {
            iconClass: String,
            isLogout: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            logout: function() {
                const self = this;
                const token = localStorage.getItem('userToken');

                fetch(`${this.apiUrl}/auth/logout`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },                
                }).then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }  
                }).then(function() {
                    localStorage.removeItem('userToken');
                    self.$router.push('/login');
                })
            }
        }
    }
</script>

<template>
    <!--
    lors de l'appel du composant dans une page, il faut mettre l'icone font awesome dans les attributs comme suit :
    <MenuItemHome iconClass="fas fa-user">Mon profil</MenuItemHome>
    iconClass="fas fa-nom-icon"
    -->
    <li v-on:click="isLogout ? logout() : ''">
        <div>
            <font-awesome-icon v-bind:icon="iconClass"/>
        </div>
        <span>
            <slot></slot>
        </span>
    </li>
</template>

<style scoped lang="scss">
    li {
        display: flex;
        align-items: baseline;
        flex-direction: row-reverse;
        color: #4E5166;
        cursor: pointer;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 50px;
        }
        span {

        }
        &:hover {
            font-weight: bold;
        }
    }
</style>