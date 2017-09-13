myApp.service('ListService', function ($http, $location) {
    var self = this;
    self.wishlists = { lists: [] };
    self.currentList = { list: {} };

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

    // self.getList = (paramId) => {
    //     $http.get({
    //         method: 'GET',
    //         url: '/wishlist/list',
    //         params: {
    //             id: paramId
    //         }
    //     }).then(function (response) {
    //         self.currentList.list = response.data;
    //     });
    // }
});