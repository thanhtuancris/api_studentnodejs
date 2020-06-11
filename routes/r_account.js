module.exports = function(app){
    var ctrAccount = require('../controller/c_account');
    app.route('/api/login').post(ctrAccount.login);
    app.route('/api/semester').post(ctrAccount.semester);
}