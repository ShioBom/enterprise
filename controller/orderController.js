import dbhelper from "../lib/dbhelper";

module.exports = {
    showOrder: function () {
        return function (req, res, next) {
            res.render("./admin/order.html", { order: 34 });
        }
    },
    getOrder: function () {
        return function (req, res, next) {
            let queryMenuSql =
                "SELECT `o_id`,`u_name`,`m_name`,`chamber`,`cinema`,`seat`,`price`,`status` FROM orderform AS o INNER JOIN userinfo AS u WHERE o.u_id=u.u_id; ";
            dbhelper.query(queryMenuSql, [], function (err, result) {
                if (!err) {

                    let obj = {
                        "status": 200,
                        "message": "",
                        "total": result.length,//显示记录总条数
                        "rows": result
                    }
                    res.json(obj);
                }
            })
        }
    },
    deleteOrder: function () {
        return function (req, res, next) {
            let updateMenuSql = "DELETE from orderform  WHERE o_id=?;";
            let params = req.body.o_id;
            dbhelper.query(updateMenuSql, params, function (err, result) {
                if (!err) {
                    if (result.affectedRows >= 1) {
                        res.json({
                            msg: "删除成功",
                            status: 1
                        });
                    } else {
                        res.json({
                            msg: "删除失败",
                            status: -1
                        });
                    }
                }
            })
        }
    },
    updateOrder: function () {
        return function (req, res, next) {
            let queryMenuSql = "UPDATE orderform SET chamber=?,cinema=?,seat=?,price=?,status=? WHERE o_id=?;";
            let data = req.body;
            //时刻记得参数列表是一个数组,在这里吃了大亏
            let params = [data.chamber, data.cinema, data.seat, data.price,data.status,data.o_id]
            console.log(params);
            dbhelper.query(queryMenuSql, params, function (err, result) {
                if (!err) {
                    if (result.affectedRows >= 1) {
                        res.json({
                            msg: "修改成功",
                            status: 1
                        });
                    } else {
                        res.json({
                            msg: "修改失败",
                            status: -1
                        });
                    }
                }
            })
        }
    },
}