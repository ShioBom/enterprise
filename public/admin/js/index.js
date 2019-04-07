layui.define(['jquery'],function (exports) {
    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
        var $ = layui.jquery;
        //自己的代码
        $(".layui-nav-item dd").on("click", "a", function () {

            let tabId = $(this).data("menuid");
            let tabTitle = $(this).data("title");
            let tabURL = $(this).data("url");
            console.log(tabURL);
            
            //1.判断layui-tab-title 里面,有没有跟我id相同一个选项,有,就切换,
            if ($("li[lay-id=" + tabId + "]").length > 0) {
                element.tabChange('demo', tabId); //切换到
            } else {
                //2.没有,addtab
                let mainHeight = $(document).height() - $(".layui-header").height() - $(".layui-footer").height() - $(".layui-tab-title").height() - 5;

                //新增一个Tab项
                element.tabAdd('demo', {
                    title: tabTitle, //用于演示 ,
                    content: '<iframe id="mainIframe"  height="' + mainHeight + 'px" width="100%" src="' + tabURL + '" frameborder="0" scrolling="no" ></iframe>',
                    id: tabId //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('demo', tabId); //切换到
            }
        })
        //. 如果窗口大小发生了变化 iframe 也变化
        $(window).on("resize", function () {
            let mainHeight = $(window).height() - $(".layui-header").height() - $(".layui-footer").height() - $(".layui-tab-title").height() - 5;
            $("#mainIframe").height(mainHeight);
        })
    });
})