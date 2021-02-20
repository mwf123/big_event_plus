$(function () {
    // 背景  使用layui提供的设置方法
    $(document).ready(function () {
        $('.layui-container').particleground({
            dotColor: '#7ec7fd',
            lineColor: '#7ec7fd'
        })
    })


    // 登录表单提交事件
    var form = layui.form
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        var fd = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: 'api/login',
            data: fd,
            success: function (res) {


                // 登录成功
                if (res.status === 0) {
                    // 存储token值
                    sessionStorage.setItem('mytoken', res.token)
                    // 跳转到主页面
                    location.href = './index.html'
                } else {
                    // 登录失败
                    layer.msg(res.message)
                }
            }
        })
    })
})