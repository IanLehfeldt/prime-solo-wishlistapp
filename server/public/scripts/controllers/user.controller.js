myApp.controller('UserController', ['UserService', 'ListService', '$http', '$location', function (UserService, ListService, $http, $location) {
  var self = this;
  self.newList = {
    name: '',
    description: ''
  };
  console.log('UserController created');

  // handles log out
  self.userService = UserService;

  // handles new user call, checks if user is logged in
  self.userObject = {};
  self.getuser = () => {
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        self.userObject.userId = response.data.id;
        self.userObject.userName = response.data.username;
        ListService.getLists(self.userObject.userId);
      } else {
        console.log('Not Logged In');
        //omg I cant believe i forgot to take out the $location.path
      }
    });
  }
  console.log('userObject: ', self.userObject);
  // 

  // handles wishlist population
  self.wishlists = ListService.wishlists;
  console.log('Wishlists recieved: ', ListService.wishlists);
  // end wishlist population



  //list route handling
  self.startList = (newList) => {
    if (self.newList.name === '' || self.newList.description === '' ) {
      swal({
        title: 'Please name and describe your list!',
        type: 'warning'
      })
    } else {
      self.newList.userId = self.userObject.userId;
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
    list.userId = self.userObject.userId;
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
    list.userId = self.userObject.userId;
    console.log('Editing list: ', list);
    // swal({
    //   title: 'List Updated!',
    //   type: 'info',
    //   confirmButtonText: 'Thanks!'
    // });
    ListService.saveList(list);
  }

  //end list route handling

  //handles get route(s)
  self.getuser();
}]);