myApp.controller('WishController', ['UserService', 'ListService', '$routeParams', '$http', '$location', '$window', function (UserService, ListService, $routeParams, $http, $location, $window) {
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
                console.log('Currently not logged in.');
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
        emails.link = 'http://localhost:5000/#/wishlist/' + $routeParams.id;
        emails.user = self.userObject.userName;

        self.inputDiv = 'Default';
        swal({
            title: 'List is being sent!',
            type: 'info'
        })
        ListService.emailList(emails);
        self.emails = {};
    }
    //

    // anchor's away!
    self.backToTop = () =>{
        $window.scrollTo(0, 0);
    }

    // handles sorting functions
    self.itemSorter = 'name';
    self.reverse = false;
  
    self.sortBy = function(itemSorter) {
      self.reverse = (self.itemSorter === itemSorter) ? !self.reverse : true;
      self.itemSorter = itemSorter;
    };

    //check user, check lists
    self.getuser();
}]);

//Source wishcontroller into index, set up to handle wishlist params

// had high hopes to do it through sweetalerts, best to just use ngList

        // swal.setDefaults({
        //     input: 'text',
        //     confirmButtonText: 'Next &rarr;',
        //     showCancelButton: true,
        //     animation: true
        //   })

        //   var swalMsg = [
        //     {
        //       title: 'Email the wishlist to your friends!',
        //       text: 'Seperate multiple emails by commas'
        //     }
        //   ]

        //   swal.queue(swalMsg).then(function (result) {
        //       //result is the array with the direct information we put into the modal
        //     swal.resetDefaults();
        //     console.log('result: ', splitResult);
        //     // function that splits result into an array by comma 
        //     swal({
        //       title: 'All done!',
        //       html:
        //         'Sending out your list to: <pre>'+
        //            result
        //         +'!</pre>',
        //       confirmButtonText: 'Lovely!'
        //     })
        //     //console.log('Email list to send to server: ', result);
        //   }, function () {
        //     swal.resetDefaults()
        //   })
 // end high hopes