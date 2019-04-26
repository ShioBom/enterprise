import dbhelper from "../lib/dbhelper";

module.exports = {
  //后台首页路由
  indexController: function() {
    return function(req, res, next) {
    let params=req.session['userinfo'][0].u_name;
      let queryMenuSql =
        "SELECT * FROM menulist WHERE m_id IN(SELECT m_id FROM sys_role_menu WHERE r_id IN(SELECT r_id FROM userinfo WHERE u_name=?)) AND m_status=1 AND m_status2='on' ORDER BY m_order;";
      let webSql = "SELECT * FROM webinfo;";
      dbhelper.query(queryMenuSql, params, function(err, result) {
        if (!err) {
          dbhelper.query(webSql, [], function(err, result2) {
            if (!err) {
              res.render("./admin/index.html", {
                menu: result,
                webInfo: result2
              });
            }
          });
        }
      });
    };
  },
  //登录界面路由
  showLogin: function() {
    return function(req, res, next) {
      res.render("./admin/login.html");
    };
  },
  showLogin: function() {
    return function(req, res, next) {
      res.render("./admin/login.html");
    };
  },
  Login: function () {
        return function (req, res, next) {
            let loginSQL =
            "SELECT `u_id`,`u_name`,`u_email`,a.r_id,`u_status`,b.role FROM userinfo AS a INNER JOIN roles AS b ON a.r_id=b.r_id WHERE u_name=? AND u_pwd=? AND u_status='1';"; 
            let params = [req.body.u_name, req.body.u_pwd];
            dbhelper.query(loginSQL,params,function(err,result){
                if(result.length>=1){
                    req.session['userinfo'] = result;
                    res.json({ msg: "登录成功", status: 1,result });
                }else{
                    res.json({ msg: "登录失败", status:0});
                }
            })
        };
  }
};
