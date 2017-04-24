'use strict';


var express = require('express');
var path= require('path');
var config = require('../config/config.json');
var nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
        user: config.username,
        pass: config.password
    }
}, {
    // default values for sendMail method
    from: config.from,

});

exports.send=  function(req, res) {
    console.log(req.body);
    transporter.sendMail({
        to: req.body.to,
        cc: req.body.cc,
        bcc: req.body.bcc,
        subject: req.body.subject,
        html: req.body.body,

    }, function (err, result) {
        if (err) {
            console.log('Error occurred');
            console.log(err.message);
            return;
        }
        console.log("Message sent successfully");
        console.log(result);

    });
};

