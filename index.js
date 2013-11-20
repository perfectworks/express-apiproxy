'use strict';

var _ = require('underscore');
var request = require('request');
var localIp = null;

var apiproxy = function (req, options) {
    if (!req || !req.header) {
        throw new Error('Invalid request');
    }

    var ips = req.ips;
    if (localIp === null) {
        localIp = require('dev-ip').getIp();
    }

    var forwarded = (ips || []).concat([localIp]).join(', ');

    options = _.defaults({
        headers: {
            cookie: req.header('cookie'),
            'x-forwarded-for': forwarded
        }
    }, options);

    return request.defaults(options);
};

module.exports = apiproxy;
