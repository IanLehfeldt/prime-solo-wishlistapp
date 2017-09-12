myApp.controller('UserController', function (UserService, ListService, $http) {
  var self = this;
  console.log('UserController created');

  // handles log out
  self.userService = UserService;

  // handles new user call
  self.userObject = {};
  self.getuser = () => {
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        self.userObject.userId = response.data.id;
        self.userObject.userName = response.data.username;
      } else {
        console.log('Failure getting user');
      }
    });
  }
  console.log('userObject: ', self.userObject);
  // 

  // handles wishlist population
  self.wishlists = ListService.wishlists;



  //handles post route
  self.startList = (newList) => {
    self.newList.userId = self.userObject.userId;
    //console.log('New wishlist as: ', self.newList);
    ListService.startList(newList);
  }

  //handles get route(s)
  self.getuser();
  ListService.getLists();
});