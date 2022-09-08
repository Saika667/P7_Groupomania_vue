//pour créer un routeur on a besoin d'express -> importation express
const express = require('express');
//création d'un routeur avec la méthode router()
//cela permet de faire router.post, router.get etc au lieu de app.post, app.get etc
const router = express.Router();
//import de la middleware
const auth = require('../middlewares/auth');
const postsCtrl = require('../controllers/posts');

router.post('/', auth, postsCtrl.create);
router.get('/', auth, postsCtrl.getAll);

module.exports = router;