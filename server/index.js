const express = require("express");
var router = express.Router();
const session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
const con = require('./db');
const PORT = process.env.PORT || 3001;

var complaint = require('./routes/complaint.js');
// var school = require('./routes/school.js');

app.use(express.json());
app.use(cors({
  origin: ["http://192.168.29.174:3000"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(session({
  key: "userId",
  secret: 'subscribe',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    expires: 60 * 60 * 24,
    maxAge: 1000*60*60*24
  }
}))

app.use('/complaint', complaint);
// app.use('/school', school);

con.connect(function(err){
    if(err) throw err;
    console.log("MySql Database Connected");
    // var sql = "CREATE TABLE LanguageMaster (language_id INT(10) AUTO_INCREMENT PRIMARY KEY,LanguageType VARCHAR(20))";
    // var sql = "CREATE TABLE NibandhTitleMaster (nibandh_title_id int(10) AUTO_INCREMENT PRIMARY KEY,Title VARCHAR(100),LanguageTypeId int(10),StandardId int(10),SchoolId int(10))";
    // var sql = "CREATE TABLE NibandhMaster (nibandh_id int(10) AUTO_INCREMENT PRIMARY KEY,TitleId INT(10),Nibandh VARCHAR(500))";
    // var sql = "CREATE TABLE OldPaperYearMaster (old_year_paper_id int(10) AUTO_INCREMENT PRIMARY KEY,YearId INT(10),Year INT(10),StandardId INT(10))";
    // var sql = "CREATE TABLE SubjectWisePaperMaster (subject_wise_paper_id int(10) AUTO_INCREMENT PRIMARY KEY,SubjectId INT(10),YearId INT(10),StandardId INT(10),QuestionPaper VARCHAR(100))";
    // var sql = "CREATE TABLE SwadhyayMaster (id int(10) AUTO_INCREMENT PRIMARY KEY,SubjectId INT(10),StandardId INT(10),Question VARCHAR(500),Answer VARCHAR(500))";
    // var sql = "CREATE TABLE NotificationMaster (notification_id int(10) AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(50),Date date)";
    // var sql = "CREATE TABLE TimeTableMaster (time_table_id int(10) AUTO_INCREMENT PRIMARY KEY,StandardId INT(10),file VARCHAR(50))";
    // con.query(sql, function (err, result) {  
    //      if (err) throw err;  
    //      console.log("Table created");
    // });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});