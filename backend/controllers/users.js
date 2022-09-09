const Users = require('../models/users');

exports.getAll = (req, res, next) => {
    Users.find({}, {_id: 0, __v: 0}).sort({lastName : 1}).limit(20).lean()
        .then(function(users) {
            res.status(200).json(users);
        })
};