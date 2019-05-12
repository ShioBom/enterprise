
layui.use(['table', 'jquery', 'layer'], function () {
    var table = layui.table;
    var $ = layui.$;
    let form = layui.form;
    let layer = layui.layer;
    table.render({
        elem: '#test',
        cellMinWidth: 100,
        url: 'http://127.0.0.1:3002/admin/getorder',
        toolbar: '#toolbarDemo',
        method: "post",
        title: '用户数据表',
        cols: [
            [{
                checkbox: true,
                fixed: true
            },
            {
                field: 'o_id',
                title: 'ID',
                width: 80,
                fixed: 'left',
                unresize: true,
                sort: true,
            }, {
                field: 'u_name',
                title: '用户',
            }, {
                field: 'chamber',
                title: '影厅',
                edit: 'text'
            },  {
                field: 'cinema',
                title: '影院',
                edit: 'text',
            }, {
                field: 'seat',
                title: '座位',
                edit: 'text',
            }, {
                field: 'price',
                title: '费用',
                edit: 'text',
            },  {
                fixed: 'right',
                align: 'center',
                unresize: true,
                toolbar: '#barDemo'
            }
            ]
        ],
        page: true,
        limits: [5, 10, 15, 20],
        id: 'testReload',
        response: {
            statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
        },
        parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
            return {
                "code": res.status, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.rows //解析数据列表
            };
        }
    });
    active = {
        reload: function () {
            var demoReload = $('#demoReload');
            //执行重载
            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: {
                        id: demoReload.val()
                    }
                }
            });
        }
    };
    // 全局搜索
    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        // let flag = active[type] ? active[type].call(this) : '';
        if (active[type]) {
            let o = active[type].call(this);
        } else {
            return '';
        }
    });
    //工具栏事件
    table.on('toolbar(test)', function (obj) {
        switch (obj.event) {
            case 'addMenu':
                layer.open({
                    type: 2,
                    title: '添加菜单',
                    shadeClose: true,
                    shade: 0.8,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['500px', '400px'],
                    content: './addMenu' //iframe的url
                });
        };
    });
    //监听行工具事件,删除
    table.on('tool(test)', function (obj) {
        console.log(obj);
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:3002/admin/deleteOrder",
                    data: {
                        o_id: obj.data.o_id
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res.status == 1) {
                            obj.del();
                            layer.close(index);
                        }
                    }
                });
            });
        }
    });
    //监听单元格编辑
    table.on('edit(test)', function (obj) {
        var value = obj.value, //得到修改后的值
            data = obj.data, //得到所在行所有键值
            field = obj.field; //得到字段
        console.log(data);
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:3002/admin/updateOrder",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == 1) {
                    layer.msg('[ID: ' + data.o_id + '] ' + field + ' 字段更改为：' + value);
                }
            }
        });
    });
    //监听菜单状态操作
    //监听锁定操作
    form.on('checkbox(lockDemo)', function (obj) {
        //监听行单双击事件
        this.value = this.value == "close" ? "on" : "close";
        console.log(this.value);
        table.on('row(test)', function (obj) {
            console.log(obj.data) //得到当前行数据
            $.ajax({
                type: "post",
                url: "http://127.0.0.1:8080/admin/updateMenuStatus",
                data: {
                    m_status: obj.value,
                    m_id: obj.data.m_id
                },
                dataType: "json",
                success: function (response) {
                    if (response.status == 1) {
                        layer.msg(response.msg);
                    }
                }
            });
        });
    });

});