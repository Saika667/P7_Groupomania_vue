//import du model
const Posts = require('../models/posts');
const Users = require('../models/users');

exports.create = (req, res, next) => {
    const post = new Posts({
        // On récupère l'id de l'utilisateur connecté grâce au middleware auth
        // Pas confiance aux données pouvant être modifiées par l'utilisateur ->
        // Le middleware récupère l'id grâce au jsonwebtoken passé en authorization de la requête
        authorId: req.auth.userId,
        // created_datetime et updated_datetime ayant des valeurs par défaut on passe uniquement le body
        ...req.body
    });

    post.save()
        .then(() => res.status(201).json({ message: 'Création de post effectuée !'}))
        //error dans json est écrit sous forme de raccourci c'est la même chose que 'error: error'
        .catch(error => res.status(400).json({ error }));
}

exports.getAll = (req, res, next) => {
    // Find avec objet vide car on veut tous les posts
    // '_id': 0 signifie qu'on ne récupère pas cet attribut
    // sort -> Tri, -1 -> tri descendant
    // limit 20 = récupère les 20 premiers
    //.lean() permet d'obtenir un objet javascript et pas un document mongo
    Posts.find({}, {_id: 0, __v: 0}).sort({createdDatetime : -1}).limit(20).lean()
        .then(async posts => {
            const promise = new Promise((resolve, reject) => {
                let index = 0;
                let maxIndex = posts.length;
                for(let post of posts) {
                    Users.findOne({_id: post.authorId}, {_id: 0, email: 0, password:0, __v: 0})
                        .then(user => {
                            post.user = user;
                            index++;
                            delete post.authorId;
                            if (index === maxIndex) {
                                resolve();
                            }
                        });
                }
            })

            promise.then(function(){
                res.status(200).json(posts);
            })
        });
}