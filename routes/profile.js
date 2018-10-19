var express = require('express');
var router = express.Router();
var pool = require("../module/pool");

/* Get : gallery 목록 요청 */
router.get('/', function (req, res, next) {
  res.render('profile/index', { title: '프로필 메인 입니다' });
});

//프로필 등록
router.post('/regist', function (req, res, next) {

  var name = req.body.name;
  var phone1 = req.body.phone1;
  var phone2 = req.body.phone2;
  var phone3 = req.body.phone3;

  //디비에 입력 
  pool.getConnection(function (error, con) {
    if (error) {
      console.log(error, "커넥션 얻기 실패");
    } else {

      var sql = "insert into profile(name,phone1,phone2,phone3) values(?,?,?,?)";
      console.log(sql);
      con.query(sql, [name, phone1, phone2, phone3], function (err, result) {
        if (err) {
          console.log(err, "쿼리문 문제 발생");
        } else {
          console.log(result);
          var obj = null;
          if (result.affectedRows == 0) {
            obj = { result: 0 };
          } else {
            obj = { result: 1 };
          }
          res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
          res.end(JSON.stringify(obj));
        }
        pool.releaseConnection(con, function (e) { });
      });
    }
  });
});


//목록조회 
router.get("/list", function (req, res, next) {
  pool.getConnection(function (error, con) {
    if (error) {
      console.log(error);
    } else {
      var sql = "select * from profile order by profile_id desc";
      con.query(sql, function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.end(JSON.stringify(result));
        }
        pool.releaseConnection(function (e) { console.log(e) });
      });
    }
  });

});


//수정하기
router.post('/edit', function (req, res, next) {
  var name = req.body.name;
  var phone1 = req.body.phone1;
  var phone2 = req.body.phone2;
  var phone3 = req.body.phone3;
  var profile_id=req.body.profile_id;
  
  console.log(name,phone1,phone2,phone3,profile_id);

  pool.getConnection(function (error, con) {
    if (error) {
      console.log(error, "커넥션 얻기 실패");
    } else {

      var sql = "update profile set name=?, phone1=?, phone2=?, phone3=? where profile_id=?";
      console.log(sql);
      con.query(sql, [name, phone1, phone2, phone3,profile_id], function (err, result) {
        if (err) {
          console.log(err, "쿼리문 문제 발생");
        } else {
          console.log(result);
          var obj = null;
          if (result.affectedRows == 0) {
            obj = { result: 0 };
          } else {
            obj = { result: 1 };
          }
          res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
          res.end(JSON.stringify(obj));
        }
        pool.releaseConnection(con, function (e) { });
      });
    }
  });
});

//수정하기
router.get('/delete', function (req, res, next) {
  var profile_id=req.query.profile_id;
  
  console.log(profile_id);

  pool.getConnection(function (error, con) {
    if (error) {
      console.log(error, "커넥션 얻기 실패");
    } else {

      var sql = "delete from profile where profile_id=?";
      
      console.log(sql);

      con.query(sql, [profile_id], function (err, result) {
        if (err) {
          console.log(err, "쿼리문 문제 발생");
        } else {
          console.log(result);
          var obj = null;
          if (result.affectedRows == 0) {
            obj = { result: 0 };
          } else {
            obj = { result: 1 };
          }
          res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
          res.end(JSON.stringify(obj));
        }
        pool.releaseConnection(con, function (e) { });
      });
    }
  });
});

module.exports = router;