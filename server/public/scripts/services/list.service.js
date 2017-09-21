myApp.service('ListService', ['$http', '$location', function ($http, $location) {
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

    self.saveList = (list) => {
        $http.put('/wishlist', list).then(function (response) {
            console.log('List updated: ', response.data);
            self.getLists(list.userId);
        })
    }

    self.deleteList = (list) => {
        $http.delete('/wishlist/' + list._id).then(function (response) {
            console.log('List deleted: ', response.data);
            self.getLists(list.userId);
        })
    }

    self.deleteCurrentList = (currentList) => {
        $http.delete('/wishlist/' + currentList).then(function (response) {
            console.log('Deleting current list: ', response.data);
            $location.path('/user');
        })
    }

    self.getList = (paramId) => {
        $http.get('/wishlist/list/' + paramId).then(function (response) {
            self.currentList.list = response.data;
        });
    }

    // wishlist emailer
    self.emailList = (emails) => {
        console.log('Service hit with email info: ', emails);
        
        // $http.post('/emailList', emails).then(function (response) {
        //     console.log('Emails sent thru mailer: ', response.data);
        // })
    }
    // end wishlist emailer

    //end handling wishlists

    //handling items
    self.addItem = (item) => {
        $http.post('/wishlist/additem', item).then(function (response) {
            console.log('Item inserted into DB: ', response.data);
            self.getList(item.list);
        });
    }

    self.editItem = (itemEdit) => {
        $http.put('/wishlist/edititem', itemEdit).then(function (response) {
            console.log('Item updated!', response.data);
            self.getList(itemEdit.list);
        })
    }

    self.deleteItem = (item) => {
        $http.put('wishlist/deleteitem', item).then(function (response) {
            console.log('Item deleted!', response.data);
            self.getList(item.list);
        })
    }
    //end handling items

}]);