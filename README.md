# Next Ticket Notifier
Just do:  
node nxt.js  

You'll need to do:  
npm install email-templates  
npm install nodemailer  
npm install node-twitter-api  

You'll also need your own config file for your twitter keys.  

Your config file should have the following template and should be in the same directory as nxt.js (the 5 attributes will be given to you once you follow the instructions [here](https://dev.twitter.com/docs/auth/obtaining-access-tokens):  

var config = {};

config.consumerKey = 'consumer key here';  
config.consumerSecret = 'consumer secret here';  
config.accessToken = 'access token here';  
config.accessTokenSecret = 'access token secret here';  
config.emailPass = 'email password here';  

module.exports = config;


