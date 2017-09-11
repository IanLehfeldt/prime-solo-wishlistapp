var express = require('express');
var router = express.Router();

router.post('/', function (req, res){
    if(req.isAuthenticated){
        console.log("Recieved from client: ", req.body);
        res.send("Borf borf borf");
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;