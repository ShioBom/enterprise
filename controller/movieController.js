import dbhelper from "../lib/dbhelper";

module.exports = {
    getMovies: function () {
        return function (req, res, next) {
            let sql = "SELECT * FROM movie LIMIT 8;";
            dbhelper.query(sql,[],(err,result)=>{
                if(!err){
                    res.json({code:1,result});
                }else{
                    res.json({code:-1,msg:"数据获取失败"});
                    console.log(err);
                }
            })
        }
    },
}