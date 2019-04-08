import express from 'express';
import dbhelper from '../../lib/dbhelper';
import indexController from '../../controller/indexController';
import menuController from '../../controller/menuController';
import limitsController from "../../controller/limitsController";
let adminRouter = express.Router();
module.exports = adminRouter;
//监听路由，任何路径首先都要进入登录界面
// adminRouter.use("*",function(req,res,next){
//     if(req.session.userinfo == undefined && req.originalUrl!="/admin/login"){
//         res.redirect("./login");
//     }else{
//         next();
//     }
// })
//获取首页信息的路由接口
adminRouter.get(
  "/index",
  indexController.indexController()
);
//权限页面导航
adminRouter.get("/power_limits", limitsController.powerLimits());
//权限页面获取菜单
adminRouter.get("/getMenus", limitsController.getMenus());
//添加或者修改菜单权限
adminRouter.post("/addOrUpdate", limitsController.addOrUpdate());
//渲染menu内容
adminRouter.get("/menu", menuController.showMenu());
//menu接口,查询menu数据
adminRouter.post("/getmenu", menuController.getMenu());
//menu接口,软删除(即将数据状态改为0,状态为1的才会显示到页面去)
adminRouter.post("/deleteMenu",menuController.deleteMenu());
//menu接口,修改menu数据
adminRouter.post("/updateMenu", menuController.updateMenu())
//menu接口,修改菜单显示状态
adminRouter.post("/updateMenuStatus", menuController.updateMenuStatus())
//渲染菜单页面
adminRouter.get("/addMenu", menuController.showAddMenu())
//addMenu接口,添加新数据
adminRouter.post("/addMenuData", menuController.addMenuData());
//登录页面入口
adminRouter.get("/login",indexController.showLogin());
//登录接口
adminRouter.post("/login",indexController.Login());