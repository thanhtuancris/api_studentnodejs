const tnu = require('sscores');
const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const request = require ('request');
var ictu = tnu.Open("ICTU");

module.exports = {
    login: function (req, res) {
        ictu.Login(req.body.username, req.body.password).then(function (session) {
            if (session) {
                var newToken = jwt.sign({
                    username: req.body.username,
                    password: req.body.password
                }, fs.readFileSync('primary.key'));

                ictu.GetProfile().then(function (data) {
                    res.json({
                        status: "success",
                        message: {
                            Token: newToken,
                            Profile: data
                        },
                    });
                    newToken ='';
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
        
        try{
            var decoded = jwt.verify(newToken, fs.readFileSync('primary.key'));
        }catch(err){
            res.json({
                status: "error",
                message: "Token lỗi, vui lòng kiểm tra lại",
            });
        }
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
    mark: function (req, res) {
        newToken = req.headers['token'];
        var decoded = jwt.verify(newToken, fs.readFileSync('primary.key'));
        var username = decoded.username;
        var password = decoded.password;
        ictu.Login(username, password).then(function (session) {
            if (session) {
                ictu.GetMarkTable().then(function (data) {
                    res.json({
                        status: "success",
                        message: data,
                    });
                }, console.log);
            }
        }, function (err) {
            console.log(err);
        });
    },
    NotiICTU: function (req, res) {
        newToken = req.headers['token'];
        var decoded = jwt.verify(newToken, fs.readFileSync('primary.key'));
        var username = decoded.username;
        var password = decoded.password;
        ictu.Login(username, password).then(function (session) {
            if (session) {
                ictu.GetNews().then(function (data) {
                    res.json({
                        status: "success",
                        message: data,
                    });
                }, console.log);
            }
        }, function (err) {
            console.log(err);
        });
    },
    ContentnotiICTU: function (req, res) {
        newToken = req.headers['token'];
        var decoded = jwt.verify(newToken, fs.readFileSync('primary.key'));
        var username = decoded.username;
        var password = decoded.password;
        var id = req.body.id;
        ictu.Login(username, password).then(function (session) {
            if (session) {
                ictu.GetNewsDetail(id).then(function (data) {
                    res.json({
                        status: "success",
                        message: data,
                    });
                }, console.log);
            }
        }, function (err) {
            console.log(err);
        });
    },
    markExtracurricular: function (req, res) {

        ids = req.body.ids;
        var headers = {
            'hostname' : "sinhvien.ictu.edu.vn",
        };
        var bodys = {
            'ids' : ids,
        };
        getImage = {
            url: 'https://api.dhdt.vn/activity/student-score',
            method: 'POST',
            headers: headers,
            body: bodys,
        }
        request(getImage, function (error, response, body ) {
            if (!error && response.statusCode == 200) {
                var parsedData = JSON.parse(body);
                var arrayData = parsedData.info.list;
                console.log(arrayData);
                // var total = parsedData.info.total;
                // var waiting = parsedData.info.waiting;
                // var class_s = parsedData.info.unit_full_name;
                // var name_s = parsedData.info.full_name;
                // var id_s = parsedData.info.ids;
                // res.json({
                //     status: "success",
                //     message: {
                //         total: total,
                //         waiting: waiting,
                //         class_s: class_s,
                //         name_s: name_s,
                //         id_s: id_s,

                //     },
                // });
                // arrayData.forEach(function(index){
                //     var id = index.idn;
                //     var title = index.title;
                //     var status = index.accept;
                //     var score_s = index.score;
                // });
            }
        });
    },
}
