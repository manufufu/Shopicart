function Shopicart(settings = {
  form,
  itemTemplate,
  appendere,
  miniFunc,
  miniTotal
}){

  String.prototype.ShopiInterpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
  }

  let AJAXSingleton = (function(){
    let instance;

    function init(){
      
      function forms(){
        settings.form.forEach( form => form.addEventListener("submit", ajaxAddjs));
      }

      function ajaxAddjs(e){
        let http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        let item = {
          quantity: 1,
          id: (this.querySelector("input:checked") !== null) ? this.querySelector("input:checked").value : null || this.querySelector("input[type=hidden]").value 
        };
        let itemString = JSON.stringify(item);
        http.open("POST", "/cart/add.js", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(itemString);
        http.addEventListener("load", function() {
          if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            ajaxCartjs(data);
          }
        });
      }

      function ajaxCartjs(data){
        let prdId = data.variant_id,
        theTarget = document.querySelector(`tr[data-id='${prdId}']`),
        itemPrice = document.querySelector(`tr[data-id='${prdId}'] [data-item-price]`),
        theQuantity = document.querySelector(`tr[data-id='${prdId}'] [data-item-quantity]`),
        totalPrice = document.querySelector(`tr[data-id='${prdId}'] [data-item-total]`),
        itemDiscount = document.querySelector(`tr[data-id='${prdId}'] [data-item-discount]`),
        http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  
        http.open("GET", "/cart.js", true);
        http.send();
        http.addEventListener("load", function() {
        let vGetRes = JSON.parse(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
          if (theTarget !== null) {
            _updateMinicartItems(
              {
                price: itemPrice,
                quantity: theQuantity,
                totalprice: totalPrice,
                total: settings.miniTotal,
                discount : itemDiscount,
                getResponse: vGetRes
              },
              data
            );
          } else {
            _addToMiniCart(data, vGetRes);
          }
        }
      });
      }

      function _updateMinicartItems(elems = { price, quantity, totalprice, total, getResponse },data){
        elems.price.textContent = `${Shopify.formatMoney(data.price)} ${Shopify.currency.active} x ${data.quantity}`;
        elems.quantity.value = data.quantity;
        elems.totalprice.textContent = `${Shopify.formatMoney(data.line_price)} ${Shopify.currency.active}`;
        elems.total.textContent = `${Shopify.formatMoney(elems.getResponse.total_price)} ${Shopify.currency.active}`;
        settings.miniFunc ? settings.miniFunc() : 0;
        }

        function _addToMiniCart(data, response) {
          settings.appendHere.insertAdjacentHTML(
            "afterbegin", 
            settings.itemTemplate.ShopiInterpolate({
              variantId: data.variant_id,
              url:data.url,
              image_url:data.featured_image.url,
              image_alt:data.featured_image.alt,
              vendor:data.vendor,
              title:data.title,
              variant_title:data.variant_title,
              quantity:data.quantity,
              line_price:Shopify.formatMoney(data.line_price),
              discount: data.discounted_price,
              currency:Shopify.currency.active
            })
          );
          settings.miniTotal.textContent = `${Shopify.formatMoney(response.total_price)} ${Shopify.currency.active}`;
          settings.miniFunc ? settings.miniFunc() : 0;
        }

      return {
        forms:forms
      }

    }
    

    return {
      getInstance: function(){
        if(!instance) instance = init();
        return instance;
      }
    }
  })();


  let Minicart = new AJAXSingleton;

   Minicart.forms();
}