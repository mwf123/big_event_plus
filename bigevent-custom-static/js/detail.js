$(function () {
    // 获取文章id
    // let id = new URLSearchParams(location.search).get('id')

    // id值应为其他同学的模块动态获取
    // 暂时写死为1
    let id = 1;
    // 根据文章id查询文章的评论信息
    // 获取评论列表
    function loadCommentList() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/api/articles/' + id + '/comments',
            success: function (res) {
                if (res.status !== 0) {
                    // 获取失败
                    // return layer.msg(res.message)
                    return console.log(res.message);
                }
                // 获取成功
                console.log(res.message);
                // 新建一个数组，第一个元素为评论区标题
                var arr = ['<h4><i class="sprites"></i>评论区</h4>']
                res.data.forEach(function (item) {
                    // 遍历获取的数据，依次添加到数组中，添加的内容为每条评论的html字符串
                    arr.push(`
                                <div class="kr_comment_card">
                                    <div class="img-wrap">
                                        <img src="./uploads/avatar_3.jpg" alt="">
                                    </div>
                                    <div class="info">
                                        <p>${item.uname} · <span>2020-08-16</span></p>
                                        <p>${item.content}</p>
                                    </div>
                                    <a href="javascript:;" class="like">${item.count}</a>
                                </div>
                        `)
                })
                // 把数组转为字符串的形式添加到html中渲染出来
                $('#comment-list').html(arr.join(''))
            }
        })
    }
    // 渲染评论区
    loadCommentList()

    // 发表评论的表单提交
    $('#comment-form').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 获取表单数据
        let fd = $(this).serialize()
        // 把数据添加到id值对应文章的评论列表中
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/articles/' + id + '/comments',
            data: fd,
            success: function (res) {
                if (res.status !== 0) {
                    // 发表失败，返回失败信息
                    // return layer.msg(res.message)
                    return console.log(res.message);
                }
                // 发表评论成功
                // layer.msg(res.message)
                console.log(res.message);
                $('#comment-form').get(0).reset()
                loadCommentList()
            }
        })
    })
})