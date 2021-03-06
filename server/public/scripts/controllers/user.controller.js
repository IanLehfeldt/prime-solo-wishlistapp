myApp.controller('UserController', ['UserService', 'ListService', '$http', '$location', '$window', function (UserService, ListService, $http, $location, $window) {
  var self = this;
  self.newList = {
    name: '',
    description: ''
  };
  console.log('UserController created');

  // handles new user call, checks if user is logged in
  // UserService.getuser();
  self.userService = UserService;
  // console.log('UserObject from service: ', UserService.userObject);

  // ListService.getLists(self.userService.userObject.userId);
  // console.log('User Service User Object: ', UserService);

  self.userObject = {};
  $http.get('/user').then(function (response) {
    if (response.data.username) {
      self.userObject.userId = response.data.id;
      self.userObject.userName = response.data.username;
      ListService.getLists(self.userObject.userId);
    } else {
      console.log('Not Logged In');
    }
  });
  // console.log('userObject: ', self.userObject);


  // handles wishlist population
  self.wishlists = ListService.wishlists;
  console.log('Wishlists recieved: ', ListService.wishlists);
  // end wishlist population

  //list route handling
  self.startList = (newList) => {
    if (self.newList.name === '' || self.newList.description === '') {
      swal({
        title: 'Please name and describe your list!',
        type: 'warning'
      })
    } else {
      self.newList.userId = UserService.userObject.userId;
      //console.log('New wishlist as: ', self.newList);
      self.startNewList = false;
      swal({
        title: 'List Created!',
        text: 'Lets add to it!',
        type: 'info',
        confirmButtonText: 'Thanks!'
      });
      ListService.startList(newList);
    }
  }

  self.deleteList = (list) => {
    list.userId = self.userService.userObject.userId;
    //console.log('Delete list: ', list);
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
        'Your file has been deleted.',
        'success'
      )
      ListService.deleteList(list);
    });
  }

  self.saveList = (list) => {
    list.userId = self.userService.userObject.userId;
    console.log('Editing list: ', list);
    // swal({
    //   title: 'List Updated!',
    //   type: 'info',
    //   confirmButtonText: 'Thanks!'
    // });
    ListService.saveList(list);
  }

  //end list route handling

  // anchors away!
  self.backToTop = () => {
    $window.scrollTo(0, 0);
  }
}]);