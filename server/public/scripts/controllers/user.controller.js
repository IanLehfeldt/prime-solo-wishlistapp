myApp.controller('UserController', function(UserService, ListService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;

  self.startList = (newList) => {
    console.log('New wishlist as: ', newList);
    ListService.startList(newList);
  }
  
});
