var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WishListSchema = new Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    items: []
});

module.exports = mongoose.model('Wishlist', WishListSchema);