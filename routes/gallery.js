var express = require('express');
var router = express.Router();

/* Get : gallery 목록 요청 */
router.get('/', function (req, res, next) {
  res.render('gallery/list', { title: '겔러리 데이터입니다' });
});

//글등록

//글삭제

//글수정

module.exports = router;