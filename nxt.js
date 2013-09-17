var path = require('path')
, templatesDir = path.resolve(__dirname, '.', 'templates')
, emailTemplates = require('email-templates')
, nodemailer = require('nodemailer');
var config = require('./config');

var twitterAPI = require('node-twitter-api');
//Init
var twitter = new twitterAPI({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    callback: ''
});

//request token
var getRToken = function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        var request = {
            requestToken: requestToken,
            requestTokenSecret: requestTokenSecret,
            results: results
        };
	//this works
	console.log(request.requestToken);
	console.log(request.requestTokenSecret);
	//does not work?
	twitter.getAccessToken(request.requestToken, request.requestTokenSecret, null, getAToken);
    }
};
//for some reason this won't work - invalid request token
//var getAToken = function(error, accessToken, accessTokenSecret, results) {
//    if (error) {
//        console.log(error);
//    } else {
//	var request = {
//	    accessToken: accessToken,
//	    accessTokenSecret: accessTokenSecret,
//	    result: results
//	};
//	console.log(request);
//  }
//};

//print requests
var print_request = function(request){
    console.log(request);
};

var accessToken = config.accessToken;
var accessTokenSecret = config.accessTokenSecret;
//twitter.verifyCredentials(accessToken,accessTokenSecret,function(error,data,response) {
//    if (error) {
//	console.log(error)
//    } else {
//	console.log(data["screen_name"]);
//    }
//});
  
var params = {
    screen_name: 'NextRestaurant',
    count: 1
};


var parseJSON = function(dummy, data) {
    if (data != null) {
	var dat = JSON.parse(JSON.stringify(data));
	var txt = dat[0].text;
	rex1 = /(ticket|Ticket)/;
	rex2 = /(January|February|March|April|May|June|July|August|September|October|December)/;
	if (rex1.test(dat[0].text) && rex2.test(dat[0].text)){
	    emailTemplates(templatesDir, emailT(dat[0].text));
	}
    };
};

twitter.getTimeline('user', params, accessToken, accessTokenSecret, parseJSON);

//enclosing scope to shove an extra data information in there
var emailT = function(data) {
    return function(err, template) {
	if (err) {
            console.log(err);
	} else {
            var transport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
                    user: "angelowong0x59@gmail.com",
                    pass: config.emailPass
		}
            });
            var locals = {
		email: 'apocalypsecalvary@gmail.com',
		name: {
                    first: 'Angelo',
                    last: 'Wong'
		},
		nxt: data
            };
            template('next', locals, function(err,html,text) {
		if (err) {
                    console.log(err);
		} else {
                    transport.sendMail({
			from: 'Angelo Wong <angelowong0x59@gmail.com>',
			to: locals.email,
			subject: 'test',
			html: html,
			text: text
                    }, function(err, responseStatus) {
			if (err) {
                            console.log(err);
			} else {
                            console.log(responseStatus.message);
			}
                    });
		}
            });
	}
    };
};



