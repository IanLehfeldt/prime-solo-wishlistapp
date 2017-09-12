var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WishListSchema = new Schema ({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    items: [],
    userId: {type: String, required: true}
});

module.exports = mongoose.model('Wishlist', WishListSchema);