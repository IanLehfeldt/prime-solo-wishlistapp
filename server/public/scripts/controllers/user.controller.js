myApp.controller('UserController', function (UserService, ListService) {
  var self = this;
  console.log('UserController created');
  self.userService = UserService;
  self.userObject = { data: {} };
  self.userObject = UserService.userObject;
  self.wishlists = ListService.wishlists;

  console.log('userObject: ', self.userObject);

  //handles post route
  self.startList = (newList) => {
    self.newList.userId = self.userObject.userId;
    //console.log('New wishlist as: ', self.newList);
    ListService.startList(newList);
  }

  //handles get route
  ListService.getLists(self.userObject.userId);
});