$(function () {
    //获取对应的id  
    //location.search.substring(4)  得到是一个字符串，在实际开发中由于我们更推荐 === ，所以我们这里要转成数字
    let id = parseInt(location.search.substring(4));
    //遍历查找数组，获得相对应的id
    let obj = phoneData.find(e => {
        //返回一个满足条件
        return e.pID === id;
    });
    //找到相应的id 后，更改要更改的东西
    //商品描述或者名字
    $('.sku-name').text(obj.name);
    //商品的价格
    $('.summary-price em').text('￥' + obj.price);
    //图片
    $('.preview-img img').attr('src', obj.imgSrc);



    //商品的添加和减少
    // 获得文本框的元素和内容
    let num = $('.choose-number').val();
    //获取元素
    $('.choose-amount .add').on('click', function (e) {
        if (num == 1) {
            $('.reduce').removeClass('disabled');
        }
        num++;
        $('.choose-number').val(num);
    });
    $('.reduce').on('click', function (e) {
        if (num == 1) {
            return;
        }
        num--;
        if (num == 1) {
            $('.reduce').addClass('disabled');
        }
        $('.choose-number').val(num);
    })
});