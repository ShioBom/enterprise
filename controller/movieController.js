import dbhelper from "../lib/dbhelper";

module.exports = {
  //拿到所有的电影数据
  getMovies: function() {
    return function(req, res, next) {
      let sql = "SELECT * FROM movie LIMIT 8;";
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
  //根据电影id获取数据
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
