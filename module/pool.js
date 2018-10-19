var mysql=require("mysql");

var conURL={
    url:"localhost",
    user:"root",
    password:"",
    database:"weeknode"
};
var pool=mysql.createPool(conURL);

module.exports=pool