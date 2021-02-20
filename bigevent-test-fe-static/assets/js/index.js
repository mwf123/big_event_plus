$(function () {
    // 判断token是否存在
    var mytoken = sessionStorage.getItem('mytoken')
    if (!mytoken) {
        // 表示token不存在，跳转到登录页面
        location.href = './login.html'
    }
    // 绑定退出按钮的点击事件
    $('#logout-btn').click(function (e) {
        e.preventDefault()
        layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 实现退出的功能：清除token,跳转到登录页面
            localStorage.removeItem('mytoken')
            // 关闭弹窗
            layer.close(index)
            // 跳转到登录页面
            location.href = './login.html'
        });
    })

    var defalutAvatar = 'data:image/png;base64,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'

    $('.layui-nav-img').attr('src', defalutAvatar)
})