<script>
    export default {
        props: ['date'],
        //on supprime la data car on en a pas besoin avec computed
        //on utilise computed au lieu de created car c'est une propriété calculéE
        //created était appelé qu'une seule fois à la création du composant 
        //alors que la prop a partir de laquelle était calculé le text, changeait lorsque l'on créait 
        //ou supprimé un post 
        computed: {
            getText() {
                //time stamp nombre de seconde écoulées depuis 01/01/1970
                // Date.parse et getTime renvoient un timestamp
                let date = Date.parse(this.date);
                let now = new Date().getTime();
                let difference = now - date;
                let seconds = Math.floor(difference / (1000));
                let minutes = Math.floor(difference / (1000*60));
                let hours = Math.floor(difference / (1000*3600));
                let days = Math.floor(difference / (1000*3600*24));
                let months = Math.floor(difference / (1000*3600*24*30));
                let years = Math.floor(difference / (1000*3600*24*365));
                let text = 'Il y a ';
                
                if(years >= 1) {
                    text += years > 1 ? `${years} ans` : `${years} an`; 
                } else if(months >= 1) {
                    text += `${months} mois`;
                } else if(days >= 1) {
                    text += days === 1 ? `${days} jour` : `${days} jours`; 
                } else if(hours >= 1) {
                    text += hours === 1 ? `${hours} heure` : `${hours} heures`; 
                } else if(minutes >= 1) {
                    text += minutes === 1 ? `${minutes} minute` : `${minutes} minutes`; 
                } else if(seconds > 30) {
                    text += `${seconds} secondes`; 
                } else {
                    text = `A l'instant`;
                }

                return text;
            }
        }
    }
</script>

<template>
    <div class="container">
        <font-awesome-icon icon="fas fa-clock-four" />
        <div class="container-date">
            {{ getText }}
        </div>
    </div>   
</template>

<style scoped lang="scss">
    .container {
        font-style: italic;
        display: flex;

        &-date {
            padding: 0 0 0 5px;
        }
    }
</style>