
var fs = require('fs');
var winston = require('winston');

exports.profile = {
    //page for main login form
    login_url: 'https://soichi7.ppa.iu.edu/auth',
}

exports.db = {
    dialect: 'sqlite',
    storage: '/usr/local/sqlite/profile.sqlite',
    logging: false,
}

exports.express = {
    //web server port
    port: 12402,

    jwt: {
        pub: fs.readFileSync('/home/hayashis/git/auth/api/config/auth.pub'),
        test: fs.readFileSync(__dirname+'/../../test/test.jwt'),
    }
};

exports.logger = {
    winston: {
        requestWhitelist: ['url', /*'headers',*/ 'method', 'httpVersion', 'originalUrl', 'query'],
        transports: [
            //display all logs to console
            new winston.transports.Console({
                timestamp: function() {
                    var d = new Date();
                    return d.toString(); //show timestamp
                },
                level: 'debug',
                colorize: true
            }),
        ]
    }
}


