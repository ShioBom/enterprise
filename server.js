import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import consolidate from 'consolidate';
import bodyParser from 'body-parser';
import logger from 'morgan';
import uuid from 'uuid';

const app = express();
app.listen(8080);
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended:true,limit:"500mb"}));
app.use(bodyParser.json());
app.use(bodyParser.text());//这两种是什么用处
app.use(cookieParser("cs"));
app.use(
    cookieSession({
    genid: function() {
      return uuid.v1();
    },
    secret: "cs",
    maxAge:1000*60*20
    //设置 session 的有效时间，单位毫秒
  })
);
app.use(logger("dev"));
let writeStream = require("fs").createWriteStream("./logs/logs.log",{flags:"a"});
app.use(logger("combined",{
    "stream":writeStream
}));

app.set("view engine","html");
app.set("views","./views");
app.engine("html",consolidate.ejs);

app.use("/admin", require("./route/admin/adminRouter"));