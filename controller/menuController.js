import dbhelper from "../lib/dbhelper";

module.exports={
    showMenu:function () {
        return function (req, res, next) {
            res.render("./admin/menu.html", { order: 34 });
        }
    },
    getMenu:function(){
        return function (req, res, next) {
            let queryMenuSql =
                "SELECT * FROM menulist WHERE m_id IN(SELECT m_id FROM sys_role_menu WHERE r_id IN(SELECT r_id FROM userinfo WHERE u_name=?)) AND m_status=1 AND m_status2='on' ORDER BY m_order;";
            let params = 'tangyu';
            dbhelper.query(queryMenuSql, params, function (err, result) {
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
    deleteMenu:function(){
        return function (req, res, next) {
            let updateMenuSql = "UPDATE menulist SET m_status=0 WHERE m_id=?;";
            let params = req.body.m_id;
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
    updateMenu:function(){
        return function (req, res, next) {
            let queryMenuSql = "UPDATE menulist SET m_name=?,m_link=?,m_status=?,m_num=?,m_father=?,m_icon=? WHERE m_id=?;";
            let data = req.body;
            //时刻记得参数列表是一个数组,在这里吃了大亏
            let params = [data.m_name, data.m_link, data.m_status, data.m_num, data.m_father, data.m_icon, data.m_id]
            console.log(params);
            dbhelper.query(queryMenuSql, params, function (err, result) {
                if (!err) {
                    console.log("111");
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
    updateMenuStatus:function(){
        return function (req, res, next) {
            let queryMenuSql = "UPDATE menulist SET m_status2=? WHERE m_id=?;";
            let data = req.body;
            //时刻记得参数列表是一个数组,在这里吃了大亏
            let params = [data.m_status2, data.m_id];
            console.log(params);
            dbhelper.query(queryMenuSql, params, function (err, result) {
                if (!err) {
                    console.log(result);
                    if (result.affectedRows >= 1) {
                        res.json({
                            msg: "修改菜单状态成功",
                            status: 1
                        });
                    } else {
                        res.json({
                            msg: "修改菜单状态失败",
                            status: -1
                        });
                    }
                }
            })
        }
    },
    showAddMenu:function(){
        return function (req, res, next) {
            res.render("./admin/addMenu.html");
        }
    },
    addMenuData:function(){
        return function (req, res, next) {
            let insertMenuSql = "INSERT INTO menulist(`m_name`,`m_link`,`m_num`,`m_father`,`m_icon`,`m_order`,`m_status2`)VALUES(?,?,?,?,?,?,?);";
            let data = req.body;
            console.log(data.menu_status);

            let params = [
                data.menu_name,
                data.menu_link,
                data.menu_num,
                data.menu_father,
                data.menu_icon,
                data.menu_order,
                data.menu_status
            ]
            dbhelper.query(insertMenuSql, params, function (err, result) {
                console.log(result);
                if (!err) {
                    if (result.affectedRows >= 1) {
                        res.json({
                            msg: "菜单添加成功",
                            status: 1
                        });
                    } else {
                        res.json({
                            msg: "菜单添加失败",
                            status: -1
                        });
                    }
                }
            })

        }
    }
}