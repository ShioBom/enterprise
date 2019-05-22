import dbhelper from "../lib/dbhelper";
let fs= require("fs");
var path = require('path');
module.exports = {
  //根据id查询用户头像
  getPortrait:function () {
    return function (req, res, next) {
      let sql = "SELECT u_img FROM userinfo WHERE u_id=?;";
      dbhelper.query(sql, req.body.u_id, (err, result) => {
        if (!err) {
          res.json({ code: 1, msg:"头像数据获取成功",img:result[0].u_img });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //拿到所有的电影数据
  getMovies: function() {
    return function(req, res, next) {
      let sql = "SELECT * FROM movie where m_status=1;";
      dbhelper.query(sql, [], (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //根据电影id获取数据
  getMovie: function() {
    return function(req, res, next) {
      let sql = "SELECT * FROM movie WHERE m_id=?;";
      dbhelper.query(sql, req.body.m_id, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //上传电影图片
  uploadMovie: function () {
    return function (req, res, next) {
      var file = req.file;
      console.log(file);
        var fileName =
          Math.random()
            .toString()
            .split(".")[1] +
          Date.now() +
          "." +
          file.originalname.split(".")[1];
      var sourceFile = "public/upload/" + fileName;
      fs.rename(req.file.path, sourceFile, function (err) {
        if (err) {
          throw err;
        }
      });   
      console.log(sourceFile);
      var destFile = path.join("d:\\Code\\junjia\\movieTicket\\static\\img\\movies\\", fileName);
      fs.rename(sourceFile, destFile, function (err) {
        if (err) throw err;
        fs.stat(destFile, function (err, stats) {
          if (err) throw err;
          console.log('stats: ' + JSON.stringify(stats));
        });
      });   
      res.json({ code: 1, path: `/static/img/movies/${fileName}`});
    };
  },
  //添加电影数据
  addMovie: function () {
    return function (req, res, next) {
      let params=[
        req.body.m_name,
        // req.body.m_time,
        req.body.m_intro,
        req.body.m_price,
        req.body.m_type,
        req.body.m_length,
        req.body.m_picture,
      ]
      let sql = "INSERT INTO movie(`m_name`, `m_intro`, `m_price`, `m_type`, `m_length`, `m_picture`) VALUES(?,?,?,?,?,?);";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          res.json({ code: 1, msg: "电影添加成功", result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //根据用户id查询票据
  getOrderByID: function () {
    return function (req, res, next) {
      let queryMenuSql =
        "SELECT * FROM orderform WHERE u_id=?;";
      dbhelper.query(queryMenuSql, req.body.u_id, function (err, result) {
        if (!err) {
            res.json({
              status: 200,
              message: "查询票据信息成功",
              result
            });
        }
      })
    }
  },
  //删除电影
  delMovie: function () {
    return function (req, res, next) {
      let sql = "UPDATE movie SET m_status=0 WHERE m_id=?;";
      console.log(req.body.m_id);
      dbhelper.query(sql, req.body.m_id, (err, result) => {
        if (!err) {
          if(result.affectedRows>=1){
            res.json({ code: 1, msg: "电影删除成功" });
          }
        } else {
          res.json({ code: -1, msg: "数据库操作失败" });
          console.log(err);
        }
      });
    };
  },
  //根据电影id获取演员数据
  getActors: function() {
    return function(req, res, next) {
      let sql = "SELECT * FROM actor WHERE m_id=?;";
      dbhelper.query(sql, req.body.m_id, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //获取该电影的评论
  getReviews: function() {
    return function(req, res, next) {
      let sql =
        "SELECT userinfo.u_id,`u_name`,`u_img`,`r_date`,`r_content`,`r_grade` FROM review JOIN userinfo ON review.u_id = userinfo.u_id WHERE m_id=?;";
      dbhelper.query(sql, req.body.m_id, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //获取该电影的影院信息
  getCinemas: function() {
    return function(req, res, next) {
      let sql =
        "SELECT m_price+c_price AS price,`c_cinema`,`c_address`,movie.m_id,cinema.c_id FROM cinema,cinema_movie,movie WHERE  cinema_movie.m_id=movie.m_id AND cinema.c_id=cinema_movie.c_id AND movie.m_id=1;";
      dbhelper.query(sql, req.body.m_id, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //观影厅页面获取电影信息的
  getCinemaMovie: function() {
    return function(req, res, next) {
      let sql =
        "SELECT m.m_id,`m_name`,`m_type`,`m_length`FROM movie AS m INNER JOIN actor AS a ON m.m_id=a.m_id WHERE m.m_id=?";
      dbhelper.query(sql, req.body.id, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //获取影厅信息
  getChambers: function() {
    return function(req, res, next) {
      let params = [req.body.m_id, req.body.c_id];
      let sql =
        "SELECT `ch_time`,`ch_lang`,`name`,chamber.id,chamber_id FROM chamber_movie INNER JOIN chamber ON chamber_movie.id=chamber.id AND m_id=? AND c_id=?";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //根据影院id获取影院信息
  getCinema: function() {
    return function(req, res, next) {
      let params = req.body.c_id;
      let sql = "SELECT * FROM cinema WHERE c_id =?";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //查询该影厅已经被购买的座位
  seatIsBought: function () {
    return function (req, res, next) {
      let sql =
        "SELECT seat FROM orderform WHERE STATUS=0 AND o_time=? AND m_name=? AND cinema=? AND chamber=?;";
      let params = [
        req.body.time,
        req.body.m_name,
        req.body.cinema,
        req.body.chamber
      ];
      console.log(params);
      dbhelper.query(sql, params, (err, result) => {
        console.log(result);
        if (!err) {
          res.json({
            status: 1,
            msg: "查询已被购买的座位成功",
            result
          });
        } else {
          res.json({
            status: -1,
            msg: "查询失败"
          });
          console.log(err);
        }
      });
    };
  },
  //向数据库中添加订单信息
  insertOrder: function() {
    return function(req, res, next) {
      let params = [];
      req.body.seats.forEach(ele => {
        let arr = [
          req.body.u_id,
          req.body.m_name,
          req.body.time,
          req.body.chamber,
          req.body.cinema,
          ele,
          req.body.price
        ];
        params.push(arr);
        console.log(params);
      });
      let sql =
        "INSERT INTO orderform(`u_id`,`m_name`,`o_time`,`chamber`,`cinema`,`seat`,`price`) VALUES ?";
      dbhelper.query(sql, [params], (err, result) => {
        if (!err) {
          res.json({ code: 1, msg: "订单建立成功" });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  },
  //根据用户查询还未结算的订单数据
  queryOrderByUser: function() {
    return function(req, res, next) {
      let sql =
        "SELECT * FROM orderform WHERE STATUS=1 AND u_id=? AND m_name=? AND cinema=? AND chamber=?;";
      let params = [
        req.body.u_id,
        req.body.m_name,
        req.body.cinema,
        req.body.chamber
      ];
      dbhelper.query(sql, params, (err, result) => {
        console.log(result);
        if (!err) {
          res.json({
            status: 1,
            msg: "用户未支付订单数据查询成功",
            result
          });
        } else {
          res.json({
            status: -1,
            msg: "查询失败"
          });
          console.log(err);
        }
      });
    };
  },
  //取消订单
  cancelOrderByUser: function() {
    return function(req, res, next) {
      let sql =
        "DELETE FROM orderform WHERE STATUS=1 AND u_id=? AND m_name=? AND cinema=? AND chamber=?;";
      let params = [
        req.body.u_id,
        req.body.m_name,
        req.body.cinema,
        req.body.chamber
      ];
      dbhelper.query(sql, params, (err, result) => {
        console.log(result);
        if (!err) {
          res.json({
            status: 1,
            msg: "订单取消成功",
          });
        } else {
          res.json({
            status: -1,
            msg: "查询失败"
          });
          console.log(err);
        }
      });
    };
  },
  //订单结算
  checkoutByUser: function() {
    return function(req, res, next) {
      let sql =
        "UPDATE orderform SET STATUS=0 WHERE STATUS=1 AND u_id=? AND m_name=? AND cinema=? AND chamber=?;";
      let params = [
        req.body.u_id,
        req.body.m_name,
        req.body.cinema,
        req.body.chamber
      ];
      dbhelper.query(sql, params, (err, result) => {
        console.log(result);
        if (!err) {
          res.json({
            status: 1,
            msg: "用户未支付订单数据查询成功",
            
          });
        } else {
          res.json({
            status: -1,
            msg: "查询失败"
          });
          console.log(err);
        }
      });
    };
  },
  //添加评论数据
  addReview:function(){
    return function (req, res, next) {
      let params = [req.body.r_content, req.body.u_id,req.body.m_id,req.body.r_grade];
      let sql =
        "INSERT INTO review(`r_content`,`u_id`,`m_id`,`r_grade`) VALUES(?,?,?,?)";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          console.log(result);
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "评论发布失败" });
          console.log(err);
        }
      });
    };
  },
  //获取该电影的平均评分
  getAvgGrade: function() {
    return function (req, res, next) {
      let params = req.body.m_id;
      let sql =
        "SELECT AVG(r_grade) AS avgGrade,COUNT(DISTINCT u_id) AS userNum,m_id FROM review WHERE m_id=?;";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          console.log(result);
          res.json({ code: 1, msg: "查询平均评分成功",result:result[0] });
        } else {
          res.json({ code: -1, msg: "查询平均评分失败" });
          console.log(err);
        }
      });
    };
  },
  //根据电影名搜索电影
  searchMovie: function () {
    return function (req, res, next) {
      let params = req.body.text;
      let sql ="SELECT * FROM movie WHERE m_name LIKE ?";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          res.json({ code: 1, msg: "搜索电影成功", result });
        } else {
          res.json({ code: -1, msg: "搜索电影失败" });
          console.log(err);
        }
      });
    };
  }
};
