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
});