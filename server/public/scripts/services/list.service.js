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
            console.log("Server handshake: ", response.data);
            self.getLists(newList.userId);
        });
    }

    self.deleteList = (list) => {
        $http.delete('/wishlist/' + list._id).then(function (response) {
            console.log('List deleted: ', response.data);
            self.getLists(list.userId);
        })
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
            console.log('Item inserted into DB: ', response.data);
            self.getList(item.list);
        });
    }

    self.editItem = (itemEdit) => {
        $http.put('/wishlist/edititem', itemEdit).then(function (response){
            console.log('Item updated!', response.data);
            self.getList(itemEdit.list);
        })
    }

    self.deleteItem = (item) => {
        $http.put('wishlist/deleteitem', item).then(function(response){
            console.log('Item deleted!', response.data);
            self.getList(item.list);
        })
    }
    //end handling items

});