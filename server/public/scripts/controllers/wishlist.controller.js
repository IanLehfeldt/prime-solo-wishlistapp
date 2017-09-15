myApp.controller('WishController', ['UserService', 'ListService', '$routeParams', function (UserService, ListService, $routeParams) {
    console.log('WishController created');
    var self = this;
    self.userService = UserService;
    self.currentList = ListService.currentList;
    ListService.getList($routeParams.id);

    // handling items
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
    // end handling items

    // handling delete current list
    self.deleteCurrentList = () => {
        console.log('Current list delete!!');
        ListService.deleteCurrentList($routeParams.id);
    }
    //
    // uib alert test
    self.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];
    self.closeAlert = function (index) {
        self.alerts.splice(index, 1);
    };
    // end test
}]);
//Source wishcontroller into index, set up to handle wishlist params