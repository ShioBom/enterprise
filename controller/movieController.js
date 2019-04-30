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
        "SELECT userinfo.u_id,`u_name`,`u_img`,`r_date`,`r_content` FROM review JOIN userinfo ON review.u_id = userinfo.u_id WHERE m_id=?;";
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
   getCinemaMovie: function () {
    return function (req, res, next) {
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
 getChambers: function () {
    return function (req, res, next) {
      let params =[req.body.m_id,req.body.c_id];
      let sql =
        "SELECT `ch_time`,`ch_lang`,`name` FROM chamber_movie INNER JOIN chamber ON chamber_movie.id=chamber.id AND m_id=? AND c_id=?";
      dbhelper.query(sql, params, (err, result) => {
        if (!err) {
          res.json({ code: 1, result });
        } else {
          res.json({ code: -1, msg: "数据获取失败" });
          console.log(err);
        }
      });
    };
  }
};
