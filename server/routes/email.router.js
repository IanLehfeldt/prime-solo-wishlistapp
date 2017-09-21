var nodemailer = require('nodemailer');
var router = express.Router();

var emailUser = process.env.EMAIL_USER || require('../config.js').user;
var emailPass = process.env.EMAIL_PASS || require('../config.js').pass;


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

// setup email data with unicode symbols
var mailOptions = {
    from: '"WelcomeToWishlist" <welcometowishlist@gmail.com>', // sender address
    to: mailListArray, // list of receivers
    subject: 'Someone wants to send you their Wishlist!', // Subject line

    // text: 'Welcome to Wishlist! '+wishlistUser+' would like you to check out their Wishlist! You can view items on their list and let the user know if you\'d like to buy them something off their list or keep it a secret to them! ( '+wishlistUser+' wont be able to see, but other friends totally can! ) Come check it out @ '+wishlistUserList, // plain text body

    //Consider creating the html file on the client and sending it to the server.
    html: 'Check out this hot new website @ ' +website,
    // '<b>Welcome to Wishlist!</b> <h4>' + wishlistUser + ' would like you to check out their Wishlist!</h4> <p>You can view items on their list and let the user know if you\'d like to buy them something off their list or keep it a secret to them! ( ' + wishlistUser + ' wont be able to see, but other friends totally can! )</p> Come check it out @ <a href=' + wishlistUserList + '>Wishlist!</a>' // html body
};


sendMail = function () {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
            //   transporter.close(); nodemailer recommended using a pool and this closes a connection if it takes too long
        }
        // console.log('Message %s sent: %s', info.messageId, info.response);
        console.log('messageId:', info.messageId);
        console.log('response', info.response);
        //   transporter.close();
    });
};

//sendMail() function that sends the mail
//email route should be a post in order to send dynamic information - you have the right idea with the email array to send to multiple users, you do not need a pool to do that

router.post('/', emails)
module.exports = router;