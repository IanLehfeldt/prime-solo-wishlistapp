myApp.service('ListService', function ($http, $location) {
    var self = this;
    self.wishlists = { lists: [] };
    self.currentList = { list: {} };

    // handling wishlists
    self.getLists = (userId) => {
        console.log('userId: ', userId);

        $http.get('/wishlist/' + userId).then(function (response) {
            self.wishlists.lists = response.data;
            //console.log("wishlists recieved: ", self.wishlists);
        });
    }

    self.startList = (newList) => {
        $http.post('/wishlist', newList).then(function (response) {
            console.log("Server handshake: ", response);
        });
    }

    self.getList = (paramId) => {
        $http.get('/wishlist/list/' + paramId).then(function (response) {
            self.currentList.list = response.data;
        });
    }
    //end handling wishlists

    //handling items
    self.addItem = (item) => {
        $http.post('/wishlist/additem', item).then(function(response){
            console.log('Item inserted into DB: ', response);
        });
    }
    //end handling items

});