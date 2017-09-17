myApp.controller('InfoController', function (UserService, ListService, $http, $location) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;

  // user authentication for later
  self.userObject = {};
  self.getuser = () => {
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        self.userObject.userId = response.data.id;
        self.userObject.userName = response.data.username;
        ListService.getLists(self.userObject.userId);
      } else {
        console.log('Failure getting user');
      }
    });
  }
  self.wishlists = ListService.wishlists;

  self.login = () => {
    $location.path('/home')
  }

  self.getuser();
  // end user auth
});
