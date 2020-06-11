const tnu = require('tnucore');
const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

var ictu = tnu.Open("ICTU");

module.exports = {
    login: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        username = username || false;
        password = password || false;
        ictu.Login(username, password).then(function (session) {
            if (session) {
                var newToken = jwt.sign({
                    username: username,
                    password: password
                }, fs.readFileSync('primary.key'));

                ictu.GetProfile().then(function (data) {
                    res.json({
                        status: "success",
                        message: {
                            Token: newToken,
                            Profile: data
                        },
                    });
    
                }, function (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                });
            }else{
                res.json({
                    status: "error",
                    message: "Sai tài khoản hoặc mật khẩu",
                });
            }
        }, function (err) {
            res.json({
                status: "error",
                message: err,
            });
        });
    },
    semester: function (req, res) {
        newToken = req.headers['token'];
        var decoded = jwt.verify(newToken, fs.readFileSync('primary.key'));
        var username = decoded.username;
        var password = decoded.password;
        ictu.Login(username, password).then(function (session) {
            if (session) {
                ictu.GetSemestersOfStudy().then(function (resp) {
                    res.json({
                        status: "success",
                        message: resp,
                    });
                }, console.log);
            }else{
                res.json({
                    status: "error",
                    message: "Sai tài khoản hoặc mật khẩu",
                });
            }
        }, function (err) {
            res.json({
                status: "error",
                message: err,
            });
        });
    },
    // mark: function (req, res) {
    //     newToken = req.headers['token'];
    //     var decoded = jwt.verify(newToken, fs.readFileSync('primary.key'));
    //     var username = decoded.username;
    //     var password = decoded.password;
    //     ictu.Login(username, password).then(function (session) {
    //         if (session) {
    //             ictu.GetMarkTable().then(function (data) {
    //                 res.json({
    //                     status: "success",
    //                     message: data,
    //                 });
    //             }, console.log);
    //         }
    //     }, function (err) {
    //         console.log(err);
    //     });
    // }
}