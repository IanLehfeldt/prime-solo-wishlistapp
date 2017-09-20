myApp.controller('WishController', ['UserService', 'ListService', '$routeParams', '$http', '$location', function (UserService, ListService, $routeParams, $http, $location) {
    console.log('WishController created');
    var self = this;
    self.item = {};
    self.userService = UserService;
    self.currentList = ListService.currentList;
    ListService.getList($routeParams.id);

    // user authentication for later
    self.userObject = {};
    self.getuser = () => {
        $http.get('/user').then(function (response) {
            if (response.data.username) {
                self.userObject.userId = response.data.id;
                self.userObject.userName = response.data.username;
                //Call for wishlists to populate dropdown
                //ListService.getLists(self.userObject.userId);
            } else {
                console.log('Failure getting user');
            }
        });
    }
    self.wishlists = ListService.wishlists;

    self.login = () => {
        $location.path('/home');
    }
    // end user auth

    // handling items
    self.addItem = (item) => {
        if (self.item.name === undefined || self.item.description === undefined) {
            swal({
                title: "You need a name AND a description!",
                type: 'warning'
            })
        } else {
            // shoving events to handle
            item.list = $routeParams.id;
            item.bought = false;
            item.secret = false;
            // log checker
            //console.log('Item to send to server: ', item);
            // function
            self.addNewItem = false;
            swal({
                title: "Item Added",
                type: 'info'
            })
            ListService.addItem(item);
        }
    }

    self.updateItem = (itemEdit) => {
        itemEdit.list = $routeParams.id;
        //console.log('Update item button is clicked!', itemEdit);
        ListService.editItem(itemEdit);
    }


    self.deleteItem = (item) => {
        item.list = $routeParams.id;
        //console.log('Delete item button is clicked!');
        swal({
            title: 'Item Deleted',
            type: 'info',
        });
        ListService.deleteItem(item);
    }
    // end handling items

    // handling delete current list
    self.deleteCurrentList = () => {
        //console.log('Current list delete!!');
        swal({
            title: 'Are you sure you want to delete this list??',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: "Oops! No Way!"
        }).then(function () {
            swal(
                'Deleted!',
                'Your list has been deleted.',
                'success'
            )
            ListService.deleteCurrentList($routeParams.id);
        });
    }
    //

    // email current list
    self.emailList = () => {
        console.log('Email button clicked');
    }
    //

    //check user, check lists
    self.getuser();
}]);
//Source wishcontroller into index, set up to handle wishlist params