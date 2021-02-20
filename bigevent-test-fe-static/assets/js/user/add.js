$(function () {
    // 添加用户
    var form = layui.form

    form.verify({
        same: function (value) {
            var uname = $('.layui-form input[name=password]').val()
            if (value !== uname) {
                return '两次输入的密码不一样'
            }
        }
    })

    // 绑定添加用户表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'admin/users',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message)
                layer.msg('添加用户成功！')
                form.render();
                // 文章分类渲染完毕在调用，初始化form方法
                initForm();
            }
        })
    })
})