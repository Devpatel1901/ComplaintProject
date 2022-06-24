var mysql = require('mysql');

// var host = "103.171.180.222";
// var port = "3306";
// var user = "crystalsa_";
// var password = "TK_2AwaIg";
// var database = "crystalsa_db";

var host = "103.171.180.222";
var port = "3306";
var user = "xdemo_scrane";
var password = "4_qVSHzon";
var database = "xdemo_scrane";
// SELECT h.PredefinedReplyDescription,i.* FROM xdemo_scrane.PredefinedReplyMaster as h,(SELECT f.*,g.EmployeeName FROM xdemo_scrane.EmployeeMaster as g,(SELECT d.CustomerName,e.* FROM xdemo_scrane.CustomerMaster as d,(SELECT a.CustomerID,a.BranchName,b.* FROM xdemo_scrane.BranchMaster as a,(SELECT p.ComplainDescription,s.* FROM xdemo_scrane.ComplainMaster as p,(SELECT xdemo_scrane.TicketMasterAddReply.PreDefineReplyID,xdemo_scrane.TicketMasterAddReply.ComplaintID,xdemo_scrane.TicketMasterAddReply.EmployeeID,xdemo_scrane.ComplaintMaster.ComplainID,xdemo_scrane.ComplaintMaster.CustomerBranchID FROM xdemo_scrane.ComplaintMaster,xdemo_scrane.TicketMasterAddReply WHERE xdemo_scrane.ComplaintMaster.ComplaintID = xdemo_scrane.TicketMasterAddReply.ComplaintID) as s WHERE s.ComplainID = p.ComplainID) as b WHERE b.CustomerBranchID = a.CustomerBranchID) as e WHERE e.CustomerID = d.CustomerID) as f WHERE f.EmployeeID = g.EmployeeID) as i WHERE i.PreDefineReplyID = h.PredefinedReplyID;

var con = mysql.createConnection({
  host: host,
  user: user,
  port: port,
  password: password,
  database: database,
  timezone: 'utc'
});




module.exports = con;