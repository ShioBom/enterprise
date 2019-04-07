layui.use(['form', 'jquery', 'layedit'], function () {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    var $ = layui.jquery;
    let layedit = layui.layedit;
    form.render();
    //自定义验证规则
    var editIndex = layedit.build('LAY_demo_editor');
    form.verify({
        link: [
            /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/, '菜单链接必须为url'
        ],
        order: [
            /^[\d]+$/, '菜单序号必须为数字'
        ],
        content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听指定开关
    form.on('switch(menu_status)', function (data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
    });

    //监听提交
    form.on('submit(submit)', function (data) {
        $.ajax({
            type: "post",
            url: "./addMenuData",
            data: data.field,
            dataType: "json",
            success: function (response) {
                if (response.status == 1) {
                    //提示信息
                     layer.msg(response.msg);
                    //关闭窗口
                    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                    parent.layer.close(index);
                }
            }
        });
        return false;
    });
});