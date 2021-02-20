$(function () {
    // 评论功能
    // 时间的过滤器函数
    template.defaults.imports.formatDate = function (date) {
        // 对时间进行格式化
        date = new Date(date)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
    }
    // 加载评论列表
    function loadCommmentList() {
        $.ajax({
            type: 'GET',
            url: 'admin/comments',
            success: function (res) {
                // 请求成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将评论列表渲染出来
                var tags = template('table-tpl', res)
                $('.layui-table tbody').html(tags)

            }
        })
    }

    loadCommmentList()



    // 删除评论
    // 事件委托
    $('.layui-table tbody').on('click', '.delete', function (e) {
        // 获取删除键的id值
        var id = $(e.target).data('id')
        // 弹出确定删除的询问框
        layer.confirm('确认要删除吗？', function (index) {
            // 确定删除时发送删除请求
            $.ajax({
                type: 'DELETE',
                url: 'admin/comments/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 关闭窗口
                    layer.close(index)
                    // 删除完成后，重新获取评论列表并渲染
                    loadCommmentList()
                }
            })
        })
    })
})