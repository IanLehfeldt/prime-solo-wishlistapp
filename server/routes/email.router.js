var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

var emailUser = process.env.EMAIL_USER || require('../../config.js').user;
var emailPass = process.env.EMAIL_PASS || require('../../config.js').pass;

// setup email data with unicode symbols
// var mailOptions = {
//     from: '"WelcomeToWishlist" <welcometowishlist@gmail.com>', // sender address
//     to: mailListArray, // list of receivers
//     subject: 'Someone wants to send you their Wishlist!', // Subject line

//     // text: 'Welcome to Wishlist! '+wishlistUser+' would like you to check out their Wishlist! You can view items on their list and let the user know if you\'d like to buy them something off their list or keep it a secret to them! ( '+wishlistUser+' wont be able to see, but other friends totally can! ) Come check it out @ '+wishlistUserList, // plain text body

//     //Consider creating the html file on the client and sending it to the server.
//     html: 'Check out this hot new website @ ' +website,
//     // '<b>Welcome to Wishlist!</b> <h4>' + wishlistUser + ' would like you to check out their Wishlist!</h4> <p>You can view items on their list and let the user know if you\'d like to buy them something off their list or keep it a secret to them! ( ' + wishlistUser + ' wont be able to see, but other friends totally can! )</p> Come check it out @ <a href=' + wishlistUserList + '>Wishlist!</a>' // html body
// };


//sendMail() function that sends the mail
//email route should be a post in order to send dynamic information - you have the right idea with the email array to send to multiple users, you do not need a pool to do that

router.post('/', function (req, res) {
    var emails = req.body.emailList;
    var user = req.body.user;
    var link = req.body.link;

    var transporter = nodemailer.createTransport({
        // host: 'smtp.example.com',
        service: 'Gmail',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

    var mailOptions = {
        from: 'Welcome To Wishlist! <welcometowishlist@gmail.com>',
        to: emails,
        subject: 'Someone wants you to check out their Wishlist @ Wishlist!',
        html: '<b>Welcome to Wishlist!</b> <h4>' + user + ' would like you to check out their Wishlist!</h4> <p>You can view items on their list and let the user know if you\'d like to buy them something off their list or keep it a secret to them! ( ' + user + ' wont be able to see, but other friends totally can! )</p> Come check it out @ <a href=' + link + '>Wishlist!</a>'
    }

    if (req.isAuthenticated()) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.sendStatus(500);
                return console.log(error);
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
            console.log('messageId:', info.messageId);
            console.log('response', info.response);
            res.sendStatus(200);
        })
    } else {
        res.sendStatus(403);
    }
})
module.exports = router;