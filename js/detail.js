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
    });


    //点击加入购物车，就把这些数据存储
    $('.addshopcar').on('click', function () {
        //我们现在要存储的有图片，名字，价格，id, 数量
        // 唯独数量是不固定和没有的，所以要先获取
        let number = parseInt($('.choose-number').val());
        //先读取数据，然后判断有没有数据
        let jsonStr = localStorage.getItem('shopCartData');
        let arr;
        if (jsonStr == null) {
            //如果没有，那么就给一个空数组
            arr = [];
        } else {
            //将字符串转换为对象   JSON.parse(必须放一个满足json格式的字符串)   返回值： 就是js里面的对象(也可能是数组)
            //如果有数据，那就把转换格式后装起来
            arr = JSON.parse(jsonStr);
        }
        // 把这些数据存储在本地存储
        /* 
            有两种情况：
            第一：用户一种商品只买一件
            第二：用户一种商品买了好几件
            如果是同一种商品，那么id是肯定相同的，所以遍历寻找
        */
        let isExit = arr.find(e => {
            return e.pID === id;
        });
        // 判断，如果相同，就加起来
        if (isExit !== undefined) {
            // 现在的有几个id加上原来的id
            isExit.number += number;
        } else {
            //我们现在要存储的有图片，名字，价格，pID, 数量
            let good = {
                pID: obj.pID,
                name: obj.name,
                imgSrc: obj.imgSrc,
                price: obj.price,
                number: number
            }
            arr.push(good);
            //开发中，我们会把对象转换成json格式,然后存储到本地数组
            jsonStr = JSON.stringify(arr);
            // localStorage.setItem(键，jsonStr);
            localStorage.setItem('shopCartData', jsonStr);
        }
    })

    // 点击加入购物车，跳转到购物页面  location.href
    $('.addshopcar').on('click', function () {
        location.href = './cart.html';
    });
});