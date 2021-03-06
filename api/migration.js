
//contrib
var winston = require('winston');
var async = require('async');
var Promise = require('promise');
var Sequelize = require('sequelize');

//mine
var config = require('./config');
var logger = new winston.Logger(config.logger.winston);
var db = require('./models');

var migrations = [
    /*
    function(qi, next) {
        logger.info("renaming host.host to host.info");
        qi.renameColumn('Hosts', 'host', 'info').then(function() { next(); });
    },
    */
];

exports.run = function() {
    logger.debug("running migration");
    return new Promise(function(resolve, reject) {
        db.Migration.findOne({}).then(function(info) {
            //logger.debug(info);
            if(!info) {
                //assume brand new - skip everything
                return db.Migration.create({version: migrations.length}).then(resolve);
            } else {
                var ms = migrations.splice(info.version);
                qi = db.sequelize.getQueryInterface();
                async.eachSeries(ms, function(m, next) {
                    m(qi, function(err) {
                        if(err) return next(err);
                        info.version++;
                        next();
                    });
                }, function(err) {
                    info.save().then(function() {
                        if(err) reject(err);
                        else resolve("migration complete");
                    });
                });
            }
        });
    });
}

