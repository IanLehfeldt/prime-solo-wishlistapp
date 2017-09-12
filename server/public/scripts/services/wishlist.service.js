myApp.service('ListService', function ($http, $location) {
    var self = this;
    self.wishlists = {};

    self.getLists = (userId) => {
        $http.get('/wishlist/' + userId).then(function (response) {
            self.wishlists = response.data;
            console.log("wishlists recieved: ", self.wishlists);
        })
    }

    self.startList = (newList) => {
        $http.post('/wishlist', newList).then(function (response) {
            console.log("Server handshake: ", response);
        });
    }
});