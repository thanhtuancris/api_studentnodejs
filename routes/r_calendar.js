module.exports = function(app){
    var ctrCalendar = require('../controller/c_calendar');
    app.route('/api/time-table').post(ctrCalendar.timetable);
    app.route('/api/exam-table').post(ctrCalendar.examtable);
}