<script>
    import ProfilImage from "../../components/ProfilImage.vue";
    import Clock from "../../components/Clock.vue";
    import jwt_decode from 'jwt-decode';

    export default {
        components: { 
            ProfilImage,
            Clock
        },
        props: ['comment'],
        data: function() {
            return {
                connectedUserId: null
            }
        },
        created: function() {
            const bearer = localStorage.getItem('userToken');
            //décodage du token avec verify
            const decodedToken = jwt_decode(bearer);
            //récupère le userId décodé
            this.connectedUserId = decodedToken.userId;
        }
    }
</script>

<template>
    <article class="comment" v-bind:class="{mine: comment.user._id === connectedUserId}">
        <div class="comment-author">
            <ProfilImage sizeImage="35px"></ProfilImage>
            <div class="comment-author-descrip">
                <h2>{{comment.user.lastName}} {{comment.user.firstName}}</h2>
                <Clock v-bind:date="comment.createdDatetime"></Clock>
            </div>
        </div>
        <div class="comment-content">
            {{comment.content}}
        </div>
    </article>

</template>

<style scoped lang="scss">
    .comment {
        background-color: #FFD7D7;
        border-radius: 20px;
        margin: 20px auto;
        padding: 10px;
        width: 95%;
        position: relative;

        &-author {
            display: flex;
            align-items: center;
            font-size: 10px;
            margin-bottom: 10px;

            &-descrip {
                padding-left: 10px;
            }
            
        }

        &-content {
            font-size: 13px;
            z-index: 2;
            position: relative;
        }

        &:before {
            content: '';
            display: block;
            background-color: #FFD7D7;
            position: absolute;
            bottom: -16px;
            left: 20px;
            height: 20px;
            width: 20px;
            transform: skewY(-40deg);
            transform-origin: top left;	
	    }

        &:after {
            content: '';
            display: none;
            background-color: lighten(#4E5166, 60);
            position: absolute;
            bottom: 0;
            right: 20px;
            height: 20px;
            width: 20px;
            transform: skewY(40deg);
            transform-origin: top left;	
	    }
        &.mine {
            background-color: lighten(#4E5166, 60);
            &:after {
                display: block;
            }
            &:before {
                display: none;
            }
        }
    }
</style>