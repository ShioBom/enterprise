import dbhelper from "../lib/dbhelper";
import async from "async";
import Tree from "../lib/toTree";

module.exports = {
  powerLimits: function() {
    return function(req, res, next) {
      let SQL = "SELECT * FROM roles";

      dbhelper.query(SQL, [], function(err, result) {
        res.render("./admin/power_limits.html", { roles: result });
      });
    };
  },
  getMenus: function() {
    return function(req, res, next) {
      let SQL =
        "SELECT `m_id`,`m_name`,`m_link`,`m_status`,`m_num`,`m_father`,`m_icon`,`m_order`,`m_status2`,`m_name`AS title FROM menulist;";
      let params = [];
      dbhelper.query(SQL, params, function(err, result) {
        res.json(Tree.toTree(result, 0));
      });
    };
  },
  addOrUpdate: function() {
    return function(req, res, next) {
      let callbackList = [];
      //先删除
      function roleDel(callback) {
        let delSQL = "DELETE FROM sys_role_menu WHERE r_id = ?;";
        let params = [parseInt(req.body.role_id)];
        dbhelper.query(delSQL, params, (err, result) => {
          callback(err, result);
        });
      }
      callbackList.push(roleDel);
      //再添加
      req.body.menus.forEach(ele => {
        callbackList.push(function(val, callback) {
          let params = [];
          let insertSQL = "INSERT INTO sys_role_menu(r_id,m_id) VALUES (?,?);";
          params.push(req.body.role_id);
          params.push(parseInt(ele));
          dbhelper.query(insertSQL, params, (err, result) => {
            callback(err, result);
          });
        });
      });
      async.waterfall(callbackList, function(err, result) {
        console.log(result);
        res.json(result);
      });
    };
  }
};
