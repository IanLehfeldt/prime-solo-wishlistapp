var express = require('express');
var router = express.Router();
var Users = require('../models/user.js');
var Wishlist = require('../models/wishlist.js');

// wishlist routes
router.post('/', function (req, res) {
    if (req.isAuthenticated) {
        var newWishlistToSave = new Wishlist(req.body);
        newWishlistToSave.save(function (err, data) {
            if (err) {
                console.log('Error saving to mongo: ', err);
                res.sendStatus(500);
            } else {
                // app used to save a wishlist identifier to user data but why use that when each list has a user identifier
                // Users.findByIdAndUpdate(
                //     { _id: req.body.userId },
                //     {
                //         $push: {
                //             "wishlists": req.body.name
                //         }
                //     }, function (err, data) {
                //         if (err) {
                //             console.log('Error updating userlist: ', err);
                //             res.sendStatus(500);
                //         } else {
                res.sendStatus(200);
            }
            //         }
            //     )
            // }
        })
    } else {
        res.sendStatus(403);
    }
});

router.put('/', function (req, res) {
    if (req.isAuthenticated) {
        Wishlist.findByIdAndUpdate(
            {
                _id: req.body._id
            },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description
                }
            }, 
            function(err){
                if(err) {
                    console.log('Error saving list: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
    } else {
        res.sendStatus(403);
    }
})

router.delete('/:id', function (req, res) {
    if (req.isAuthenticated) {
        Wishlist.findByIdAndRemove(
            {
                _id: req.params.id
            },
            function (err) {
                if (err) {
                    console.log('Error deleting list: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', function (req, res) {
    var listId = req.params.id;
    if (req.isAuthenticated) {
        Wishlist.findByIdAndRemove(
            {
                _id: listId
            },
            function (err) {
                if (err) {
                    console.log('Error deleting wishlist: ', err);
                    res.sendStatus(500);
                } else {

                }
            })
    } else {
        res.sendStatus(403);
    }
})

router.get('/:id', function (req, res) {
    if (req.isAuthenticated) {
        Wishlist.find({
            userId: req.params.id
        }, function (err, lists) {
            if (err) {
                console.log('Error finding lists: ', err);
                res.sendStatus(500);
            } else {
                console.log('Lists received: ', lists);
                res.send(lists);
            }
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/list/:id', function (req, res) {

        Wishlist.find({
            _id: req.params.id
        }, function (err, list) {
            if (err) {
                console.log('Error finding List: ', err);
                res.sendStatus(500);
            } else {
                console.log('List received: ', list);
                res.send(list[0]);
            }
        })

});
// end wishlist routes

// item routes
router.post('/additem', function (req, res) {
    var item = req.body;
    if (req.isAuthenticated) {
        Wishlist.findOneAndUpdate({
            _id: item.list
        },
            {
                $push: {
                    items: {
                        name: item.name,
                        description: item.description,
                        link: item.link,
                        bought: item.bought,
                        secret: item.secret
                    }
                }
            }, function (err) {
                if (err) {
                    console.log('Error saving to wishlist: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/edititem', function (req, res) {
    var item = req.body;
    //console.log('item to save: ', item);

    if (req.isAuthenticated) {
        Wishlist.findOneAndUpdate({
            "_id": item.list,
            "items.name": item.name
        },
            {
                $set: {
                    "items.$.name": item.name,
                    "items.$.description": item.description,
                    "items.$.link": item.link,
                    "items.$.bought": item.bought,
                    "items.$.secret": item.secret
                }
            }, function (err) {
                if (err) {
                    console.log('Error updating database: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/deleteitem/', function (req, res) {
    var item = req.body;
    if (req.isAuthenticated) {
        Wishlist.findOneAndUpdate({
            "_id": item.list,
        },
            {
                $pull: {
                    "items":
                    {
                        "name": item.name
                    }
                }
            }, function (err) {
                if (err) {
                    console.log('Error removing item: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            })
    } else {
        res.sendStatus(403);
    }
})
// end item routes
module.exports = router;