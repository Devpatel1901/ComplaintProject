var express = require('express');
var router = express.Router();
const res = require('express/lib/response');
var con = require('../db');
var moment = require('moment');
const transporter = require('../email_sender');
const { htmlToText } = require('html-to-text');
// const jwt = require("jsonwebtoken");

// let refreshTokens = [];

// const generateAccessToken = (user,email) => {
//     return jwt.sign({ id: user.customer_id,email: email }, "mySecretKey", {
//       expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
//     });
//   };
  
// const generateRefreshToken = (user,email) => {
//     return jwt.sign({ id: user.customer_id,email: email }, "mySecretKey", {
//         expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
//       });
// };

// const verify = (req, res, next) => {
//     console.log(req.headers);
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
  
//       jwt.verify(token, "mySecretKey", (err, user) => {
//         if (err) {
//           return res.status(403).json("Token is not valid!");
//         }
//         console.log(user);
//         req.user = user;
//         next();
//       });
//     } else {
//       res.status(401).json("You are not authenticated!");
//     }
// };

router.post("/get_cinfo",(req, res) => {
    console.log(req.body);
    const sqlInsert = "SELECT CustomerName,CustomerID FROM CustomerMaster WHERE CustomerID = ?";
    con.query(sqlInsert,[req.body.customer_id] ,(err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.get("/get_pinfo", (req, res) => {
    const sqlInsert = "SELECT ProductName,ProductID FROM ProductMaster";
    con.query(sqlInsert, (err, result) => {
        if(err){
            throw err;
        }
        // console.log(result);
        res.json(result);
    })
})

router.post("/get_branchinfo", (req, res) => {
    const sqlInsert = "SELECT CustomerBranchID,BranchName FROM BranchMaster WHERE CustomerID = ?";
    con.query(sqlInsert,[req.body.customer_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

async function getProductName(req,res,next){
    var sql = "SELECT ProductName FROM ProductMaster WHERE ProductID = ?";
    con.query(sql,[req.body.prod_id],(err,result)=>{
        if(err){
            throw err;
        }
        req.body.ProductName = result[0].ProductName;
        next(); 
    });
} 
router.post("/add_complaint",getProductName, (req, res) => {
    console.log(req.body)
    var today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const sqlInsert = "INSERT INTO ComplaintMaster (ProductID, ComplaintDescription, ComplaintDate, CustomerBranchID,MachineNo,ComplainID) values(?, ?, ?, ?, ?, ?)";
    // console.log(req.session.email);
    con.query(sqlInsert, [req.body.prod_id, req.body.complaint_description, today, req.body.branch_id, req.body.machine_no,req.body.complain_id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        var mailOptions = {
            from: "theinfinityitsolution@gmail.com",
            to: req.body.customer_email,
            subject: 'Complaint Detail',
            html: `<div>
            <p>Ticket Number: ${result.insertId}</p>
            <p>Product Name: ${req.body.ProductName}</p>
            <p>Complaint Description: ${`<b><i style="color:grey">${req.body.complaint_description}</i></b>`}</p>
            <p>Machine No: ${req.body.machine_no}</p>
            <p>Customer Branch Name: ${req.body.branch_name}</p>
            <p>Complain Name: ${req.body.complain_name}</p>
            </div>`
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
              res.send({message:"Error"})
            } else {
              res.send({message:"Email sent",result:result});
            }
          });
    })
})

router.get("/get-complaint",(req,res)=>{
    var sql="SELECT * FROM ComplaintMaster";
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.get("/get-complain",(req,res)=>{
    var sql="SELECT * FROM ComplainMaster";
    con.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.post("/get-customer-complaint",(req,res)=>{
    console.log(req.body);
    console.log(req.session.customer_id);
    var sql = "SELECT p.ProductID,p.ProductName,s.ComplaintID,s.ComplaintDescription,s.CustomerBranchID,s.MachineNo,s.BranchName FROM ProductMaster as p , (SELECT ComplaintMaster.ComplaintID,ComplaintMaster.ProductID,ComplaintMaster.ComplaintDescription,ComplaintMaster.CustomerBranchID,ComplaintMaster.MachineNo,BranchMaster.BranchName FROM ComplaintMaster,BranchMaster WHERE ComplaintMaster.CustomerBranchID = BranchMaster.CustomerBranchID AND BranchMaster.CustomerID = ?) as s WHERE p.ProductID = s.ProductId";
    // var sql = "SELECT ComplaintMaster.ComplaintID,ComplaintMaster.ProductID,ComplaintMaster.ComplaintDescription,ComplaintMaster.CustomerBranchID,ComplaintMaster.MachineNo,BranchMaster.BranchName FROM ComplaintMaster,BranchMaster WHERE ComplaintMaster.CustomerBranchID = BranchMaster.CustomerBranchID AND BranchMaster.CustomerID = ?"
    con.query(sql, [req.body.customerid], (err, result) => {
        if(err){
            throw err;
        }
        // console.log(result);
        res.json(result);
    })
})

router.post("/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
    //if everything is ok, create new access token, refresh token and send to user
});
  

router.post("/login",(req,res)=>{
    console.log(req.body);
    var sql = "SELECT CustomerID,Password FROM CustomerMaster WHERE EmailID = ?";
    con.query(sql,[req.body.customer_email],(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        if(result.length === 0){
            res.send({message:"User doesn't exist"});
        }else{
            if(result[0].Password === req.body.password)
            {
                req.session.customer_id = result[0].CustomerID;
                req.session.email = req.body.customer_email;
                // console.log(req.session.email);
                // const accessToken = generateAccessToken(result[0],req.body.customer_email);
                // const refreshToken = generateRefreshToken(result[0],req.body.customer_email);
                // refreshTokens.push(refreshToken);
                res.send({message:"Successfull Login",CustomerID:result[0].CustomerID});
                // res.json({
                //     message: "Successfull Login",
                //     CustomerID: result[0].CustomerID,
                //     accessToken,
                //     refreshToken,
                // });
            }else{
                res.send({message:"Wrong Username/Password Combination"});
            }
        }
    })
})

router.get("/get-customer-id",function(req,res){
    console.log(req.session.customer_id);
    console.log(req.session.email);
    if(!req.session.customer_id){
        res.send({message: "Session is not set"});
    }else{
        // console.log(config.FORM_CLOSE);
        res.send({message: "Session is set" ,CustomerID: req.session.customer_id,CustomerEmail: req.session.email});
    }
})

router.post("/get-user-chats",function(req,res){
    console.log(req.body);  
    var sql = "SELECT ReplyDescription,ReplyDate,EmployeeID FROM TicketMasterAddReply WHERE ComplaintID = ? GROUP BY ReplyDate ORDER BY ReplyDate ASC";
    con.query(sql,[req.body.complaint_id],(err,result)=>{
        if(err){
            throw err;
        }
        for(var i = 0 ; i < result.length ; i++)
        {
            var reply = result[i].ReplyDescription;
            result[i].ReplyDescription = htmlToText(reply, {
                wordwrap: 130
            });
        }
        console.log(result);
        res.json(result);
    })
})

router.post("/add-note",function(req,res){
    console.log(req.body);  
    var today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    console.log(today);
    var sql = "INSERT INTO TicketMasterAddReply (ComplaintID,PreDefineReplyID,EmployeeID,ReplyDescription,CurrentUserID,ReplyStatus,ReplyDate) VALUES(?,?,?,?,?,?,?)";
    con.query(sql,[req.body.complaint_id,0,0,req.body.note,0,"Pending",today],(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json(result);
    })
})

router.get("/logout",function(req,res){
    console.log(req.session.customer_id);
    if(req.session.customer_id != null){
        req.session.destroy(function(err){
            if(err){
                console.log("/logout:", err)
                res.send({err:err});
            }else{
                res.clearCookie("session-id");
                res.send({message:"Success"});
            }
        });
    }
});

module.exports = router;