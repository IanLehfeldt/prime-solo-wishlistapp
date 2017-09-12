myApp.controller('UserController', function(UserService, ListService) {
  console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  console.log('userObject: ', self.userObject);
  
  
  self.newList = {
    userId: self.userObject.userId
  }
  

  self.startList = () => {
    console.log('New wishlist as: ', self.newList); 
    ListService.startList(self.newList);
  }
  
});
