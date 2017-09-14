myApp.controller('WishController', ['UserService', 'ListService', '$routeParams', function (UserService, ListService, $routeParams) {
    console.log('WishController created');
    var self = this;
    self.userService = UserService;
    self.currentList = ListService.currentList;
    ListService.getList($routeParams.id);

    self.addItem = (item) => {
        // shoving events to handle
        item.list = $routeParams.id;
        item.bought = false;
        item.secret = false;
        // log checker
        console.log('Item to send to server: ', item);
        // function
        ListService.addItem(item);
    }

    self.updateItem = (itemEdit) => {
        itemEdit.list = $routeParams.id;
        console.log('Update item button is clicked!', itemEdit);
        ListService.editItem(itemEdit);
    }


    self.deleteItem = (item) => {
        item.list = $routeParams.id;
        console.log('Delete item button is clicked!');
        ListService.deleteItem(item);
    }
}]);
//Source wishcontroller into index, set up to handle wishlist params