var express = require('express');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');

router.get("/get-school",(req,res)=>{
    var sql="SELECT school_id,school_name FROM SchoolMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.json(result);
    })
});

router.post("/add-school",(req,res)=>{
    console.log(req.body);
    var sql="INSERT INTO StandardMaster (standard,faculty,school_id,type) VALUES (?,?,?,?)";
    // con.query(sql,[req.body.standard,req.body.faculty,req.body.school_id,req.body.type],(err,result)=>{
    //     if(err)
    //     {
    //         throw err;
    //     }
    //     res.json({message:"Success"});
    // })
});

router.get("/get-nibandh-title",(req,res)=>{
    var sql="SELECT Title,nibandh_title_id FROM NibandhTitleMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.get("/get-chapter-master",(req,res)=>{
    var sql="SELECT chapter_title,standard_id,subject_id,chapter_master_id FROM ChapterMaster";
    con.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/get-standard",(req,res)=>{
    var sql="SELECT standard_id,standard FROM StandardMaster WHERE school_id = ?";
    con.query(sql,[req.body.school_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/get-language-of-school",(req,res)=>{
    var sql="SELECT school_language FROM SchoolMaster WHERE school_id = ?";
    con.query(sql,[req.body.school_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-topic-heading",(req,res)=>{
    var sql="INSERT INTO TopicHeadingMaster (topic_heading_master_title,school_id,standard_id) VALUES (?,?,?)";
    con.query(sql,[req.body.topic_heading_master_title,req.body.school_id,req.body.standard_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-nibandh-title",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO NibandhTitleMaster (Title,language_id,standard_id,school_id) VALUES(?,?,?,?)";
    con.query(sql,[req.body.title,req.body.language_id,req.body.standard_id,req.body.school_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-nibandh",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO NibandhMaster (nibandh_title_id,Nibandh) VALUES(?,?)";
    con.query(sql,[req.body.nibandh_title_id,req.body.nibandh],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-old-paper-year",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO OldPaperYearMaster (YearId,Year,StandardId) VALUES(?,?,?)";
    con.query(sql,[req.body.year_id,req.body.year,req.body.standard_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-subject-wise-paper",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO SubjectWisePaperMaster (SubjectId,YearId,StandardId,QuestionPaper) VALUES(?,?,?,?)";
    con.query(sql,[req.body.subject_id,req.body.year_id,req.body.standard_id,req.body.questionpaper],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-notification",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO NotificationMaster (name,date) VALUES(?,?)";
    con.query(sql,[req.body.name,req.body.date],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-language-type",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO LanguageMaster (LanguageType) VALUES(?)";
    con.query(sql,[req.body.language_type],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-swadhyay",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO SwadhyayMaster (swadhyay_qus,swadhyay_ans,subject_id,standard_id,chapter_master_id) VALUES(?,?,?,?,?)";
    con.query(sql,[req.body.swadhyay_que,req.body.swadhyay_ans,req.body.subject_id,req.body.standard_id,req.body.chapter_master_id],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-book-master-material",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO BookMasterMaterial (standard_id,subject_id,chapter_master_id,book_pdf) VALUES(?,?,?,?,?)";
    con.query(sql,[req.body.standard_id,req.body.subject_id,req.body.chapter_master_id,req.body.book_pdf],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

router.post("/add-video-master-material",(req,res)=>{
    console.log(req.body);
    var sql = "INSERT INTO VideoMasterMaterial (standard_id,subject_id,chapter_master_id,video_link,video_name,video_image) VALUES(?,?,?,?,?,?)";
    con.query(sql,[req.body.standard_id,req.body.subject_id,req.body.chapter_master_id,req.body.video_link,req.body.video_name,req.body.video_image],(err,result)=>{
        if(err)
        {
            throw err;
        }
        console.log(result);
        res.json(result);
    })
});

module.exports = router;