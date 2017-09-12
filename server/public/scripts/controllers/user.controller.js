myApp.controller('UserController', function (UserService, ListService) {
  console.log('UserController created');

  var self = this;
  self.userObject = UserService.userObject;
  //console.log('userObject: ', self.userObject);


  self.startList = (newList) => {
    self.newList.userId = self.userObject.userId;
    console.log('New wishlist as: ', self.newList);
    ListService.startList(newList);
  }

});
