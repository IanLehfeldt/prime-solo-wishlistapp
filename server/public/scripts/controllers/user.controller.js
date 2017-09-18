myApp.controller('UserController', ['UserService', 'ListService', '$http', '$location', function (UserService, ListService, $http, $location) {
  var self = this;
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
        console.log('Failure getting user');
        $location.path('/home');
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
    self.newList.userId = self.userObject.userId;
    //console.log('New wishlist as: ', self.newList);
    self.startNewList = false;
    ListService.startList(newList);
  }

  self.deleteList = (list) => {
    list.userId = self.userObject.userId;
    //console.log('Delete list: ', list);
    ListService.deleteList(list);
  }

  self.saveList = (list) => {
    list.userId = self.userObject.userId;
    console.log('Editing list: ', list);
    ListService.saveList(list);
  }

  //end list route handling

  //handles get route(s)
  self.getuser();
}]);