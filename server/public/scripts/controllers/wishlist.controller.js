myApp.controller('WishController', ['UserService', 'ListService', '$routeParams', '$http', '$location', '$window', function (UserService, ListService, $routeParams, $http, $location, $window) {
    console.log('WishController created');
    var self = this;
    self.item = {};
    self.userService = UserService;
    self.currentList = ListService.currentList;
    ListService.getList($routeParams.id);


    if (self.userService.userObject.userId) {
        ListService.getLists(self.userService.userObject.userId);
        self.wishlists = ListService.wishlists;

        // handling items
        self.addItem = (item) => {
            // supposed to close email list if its already opened
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
                self.inputDiv = 'Default';
                swal({
                    title: "Item Added",
                    type: 'info'
                })
                ListService.addItem(item);
                self.item = {};
            }
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
            }, function (dismiss) {
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled!',
                        'Your list is safe! ... For now.',
                        'info'
                    )
                }
            });
        }
        //

        // email current list
        self.emailList = (emails) => {
            console.log('Email button clicked, sending email(s): ', emails);
            //Fix this later for heroku
            emails.link = 'https://prime-solo-wishlist.herokuapp.com/#/wishlist/' + $routeParams.id;
            emails.user = self.userService.userObject.userName;
            self.inputDiv = 'Default';
            swal({
                title: 'List is being sent!',
                type: 'info'
            })
            ListService.emailList(emails);
            self.emails = {};
        }
        //
    }

    self.login = () => {
        $location.path('/home');
    }
    // end user auth

    self.updateItem = (itemEdit) => {
        itemEdit.list = $routeParams.id;
        //console.log('Update item button is clicked!', itemEdit);
        ListService.editItem(itemEdit);
    }

    // anchor's away!
    self.backToTop = () => {
        $window.scrollTo(0, 0);
    }

    // handles sorting functions
    self.itemSorter = 'name';
    self.reverse = false;

    self.sortBy = function (itemSorter) {
        self.reverse = (self.itemSorter === itemSorter) ? !self.reverse : true;
        self.itemSorter = itemSorter;
    };
}]);