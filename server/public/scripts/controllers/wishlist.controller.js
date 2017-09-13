myApp.controller('WishController', ['UserService', 'ListService', '$routeParams', function(UserService, ListService, $routeParams) {
  console.log('WishController created');
  var self = this;
  self.userService = UserService;
  

//   ListService.getList($routeParams.id);
}]);
//Source wishcontroller into index, set up to handle wishlist params