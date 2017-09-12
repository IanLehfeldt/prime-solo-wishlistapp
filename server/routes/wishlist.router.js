var express = require('express');
var router = express.Router();
var Users = require('../models/user.js');
var Wishlist = require('../models/wishlist.js');

router.post('/', function (req, res) {
    if (req.isAuthenticated) {
        var newWishlistToSave = new Wishlist(req.body);
        newWishlistToSave.save(function (err, data) {
            if (err) {
                console.log('Error saving to mongo: ', err);
                res.sendStatus(500);
            } else {
                Users.findByIdAndUpdate(
                    { _id: req.body.userId },
                    {
                        $push: {
                            "wishlists": req.body.name
                        }
                    }, function (err, data) {
                        if (err) {
                            console.log('Error updating userlist: ', err);
                           res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    }
                )
            }
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;