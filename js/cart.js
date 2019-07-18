$(function () {
  //先读取数据
  let jsonStr = localStorage.getItem('shopCartData');
  //然后判断，看有无数据
  //定义一个全局变量接收
  let arr;
  // 如果不是null ，那就是有数据
  if (jsonStr !== null) {
    // JOSN.parse(必须放一个满足json格式的字符串)
    arr = JSON.parse(jsonStr);
    // 我们动态生成结构
    let html = '';
    //b遍历数组，寻找相同id的商品，然后生产结构
    arr.forEach(e => {
      html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.number*e.price}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`
    });
    //点击加入购物车之后，把空空如也隐藏
    $('.empty-tip').addClass('hidden');
    //把表头和结算显示
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden');
    //动态生成结构
    $('.item-list').html(html);
  }

  //计算总的商品件数和总价，用一个函数封装，到时候直接调用
  function totalCountAndMoney() {
    // 算出总计里面的总数量和总价
    // 根据选中的多选框，得到选中的商品的id
    let totalCount = 0;
    let totalMoney = 0;
    $('.item-list .item-ck:checked').each((i, e) => {
      // console.log(e);  e 是每个元素
      // 我们这里找遍历，然后找到每个元素的父元素的id，我们这样做是因为等一下我们点击删除的时候，是删除整个我们动态生成的结构，和删除本地存储
      let id = parseInt($(e).parents('.item').attr('data-id')); /* 得到的是字符串，我们转为数字 attr方法   jq对象.attr(属性名)，一个值是获取 */
      // console.log(id);
      // 得到父元素的id之后，我们就遍历，然后判断
      arr.forEach(e => {
        if (e.pID == id) {
          // 这样相加，相当于我们的for循环里面算和，在外面声明 let sum = 0, 里面是  sum += i; 一样的
          totalCount += e.number;
          totalMoney += e.number * e.price;
        }
      });
    })
    //修改总件数
    $('.selected').text(totalCount);
    //修改总价
    $('.total-money').text(totalMoney);
  }
  totalCountAndMoney();

  //做全选和单选，然后计算总价
  //当我点击全选时，全部小框选中
  $('.pick-all').on('click', function () {
    // 看看自己当前的状态
    let status = $(this).prop('checked');
    //设置每个商品和自己一样
    $('.item-ck').prop('checked', status);
    $('.pick-all').prop('checked', status);
    //再次计算总价
    totalCountAndMoney();
  });
  //其实这里更加建议使用委托来实现，因为所有的商品的信息都是动态生成的，如果是以后从服务器获取数据，会失败的，必须是用委托的
  $('.item-list').on('click', '.item-ck', function () {
    //我们这里可以判断，如果我们点击的数量（长度）和总的小框数量是一样的，那就说明我们把全部的小框都勾选了，反之，没有全部勾选
    // 获取小框的元素
    let cks = $('.item-ck');
    //获取每个小框的元素
    let cked = $('.item-ck:checked');
    let status = cks.length === cked.length;
    $('.pick-all').prop('checked', status);
    totalCountAndMoney();
  });


  //使用事件委托来实现加减
  //为什么我要用item-list？  是因为事件委托要找一个已经存在页面结构的前代元素， item是动态生成的，所以只能用item-list
  $('.item-list').on('click', '.add', function () {
    // 先得到旧数据
    let oldVal = parseInt($(this).siblings('input').val());
    oldVal++;
    // 当数据大于1的时候，移除禁用手势
    if (oldVal > 1) {
      $(this).siblings('.reduce').removeClass('disabled');
    }
    // 把数据覆盖回去
    $(this).siblings('input').val(oldVal);
    // 把本地存储里面的数据，更新
    // 判断依据是 点击的按钮对应的商品的id
    let id = parseInt($(this).parents('.item').attr('data-id'));
    // 遍历，寻找相同的id
    let obj = arr.find((e) => {
      return e.pID == id;
    });
    // 找到之后，更新对应的数据
    obj.number = oldVal;
    //把数据重新更新在本地存储
    let jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    //从新计算总价和总和
    totalCountAndMoney();
    // 最后把对应的商品的小计给算出来
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  });

  //减
  $('.item-list').on('click', '.reduce', function () {
    let oldVal = parseInt($(this).siblings('.input').val());
    if (oldVal === 1) {
      return;
    }
    oldVal--;
    if (oldVal === 1) {
      $(this).addClass('disabled');
    }
    // 把数据覆盖回去
    $(this).siblings('input').val(oldVal);
    let id = parseInt($(this).parents('.item').attr('data-id'));
    let obj = arr.find(e => {
      return e.pID === id;
    });
    obj.number = oldVal;
    let jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    totalCountAndMoney();
    // 最后把对应的商品的小计给算出来
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
  });
});