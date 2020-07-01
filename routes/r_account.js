module.exports = function(app){
    var ctrAccount = require('../controller/c_account');
    app.route('/api/login').post(ctrAccount.login);
    app.route('/api/semester').post(ctrAccount.semester);
    app.route('/api/mark').post(ctrAccount.mark);
    app.route('/api/notiictu').post(ctrAccount.NotiICTU);
    app.route('/api/contentnoti').post(ctrAccount.ContentnotiICTU);
    app.route('/api/makr_extra').post(ctrAccount.markExtracurricular);
}