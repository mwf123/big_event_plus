$(function () {

    var form = layui.form
    var laypage = layui.laypage

    // 当前页码
    var pagenum = 1
    // 每页显示的条数
    var pagesize = 3

    // 1.获取用户列表
    getUserList();
    // 封装函数
    function getUserList(param) {
        console.log(param);
        $.ajax({
            type: "GET",
            url: "http://localhost:8888/admin/users",
            data: param,
            success: function (res) {
                // console.log(res);
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)
            }
        });
    }
    getUserList({
        // 页码：必须从1开始
        pagenum: pagenum,
        // 每页显示多少条数据
        pagesize: pagesize
    })

})