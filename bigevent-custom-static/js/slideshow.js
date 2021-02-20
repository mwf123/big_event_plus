$(function () {
    // 直接使用layui  轮播图功能
    layui.use('carousel', function () {
        // 轮播模块
        var carousel = layui.carousel

        // 加载轮播图数据
        function loadSwiperList() {
            // 发送请求
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8888/api/swipers',
                success: function (res) {
                    if (res.status === 0) {
                        // 创建一个空的数组
                        var arr = []
                        // 遍历请求得到的data
                        res.data.forEach(function (item) {
                            // 每循环一次，添加一个li标签，内容为数去中图片的地址
                            arr.push(`
                                    <li class="img-effect">
                                        <a href="javascript:;">
                                            <img src="${'http://localhost:8888/uploads/' + item.swiperimg}" alt="">
                                        </a>
                                    </li>
                        `)
                        })
                        // 将数组转为字符串添加到HTML轮播图模块的ul标签中
                        $('#kr_carousel ul').html(arr.join(''))
                        // 轮播交互
                        carousel.render({
                            elem: '#kr_carousel',
                            width: 720,
                            height: 300,
                            interval: 3000
                        })
                    }
                }
            })
        }

        loadSwiperList()




    })

})