myApp.service('ListService', function ($http, $location){
    var self = this;

    self.startList = (newList) => {
        $http.post('/wishlist', newList).then(function (response){
            console.log("Server handshake: ", response);
        });
    }
});