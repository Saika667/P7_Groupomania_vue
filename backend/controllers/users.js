const Users = require('../models/users');

exports.getAll = (req, res, next) => {
    Users.find({}, {_id: 0, __v: 0}).sort({lastName : 1}).limit(20).lean()
        .then(function(users) {
            res.status(200).json(users);
        })
};

exports.getOne = (req, res, next) => {
    Users.findOne({_id: req.params.userId})
        .then(user => {
            res.status(200).json({user});
        })
        .catch(error => { 
            res.status(400).json({ error });
        })
}