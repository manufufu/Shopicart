# Shopicart
 
### Dependency required, for Shopify currency formatting.
```
<script src="https:{{ 'api.jquery.js' | shopify_asset_url | remove: 'http:' | remove: 'https:'}}" defer="defer" crossorigin="anonymous"></script>
```

## Shopify Minicart AJAX


```
Shopicart({
  form: document.querySelectorAll(".lete-add-cart"),
  appendHere: document.getElementById("tbody-mc"),
  miniTotal: document.querySelector("#mini-cart-total"),
  miniFunc: toggleMiniCart,
  itemTemplate: `<tr class="product-cart-c mini-cart-tr" data-id="${"${variantId}"}">
  <td class="cart-item-td cart-item-td--img">
      <a href="${"${url}"}" class="product-image">
          <img src=${"${image_url}"}" alt="${"${image_alt}"}">
      </a>
  </td>
  <td class="cart-item-td cart-item-description">
      <a href="${"${url}"}">
          <h2 class="model">${"${vendor}"}</h2>
          <h1 class="name">${"${title}"}</h1>
      </a>
      <br>
      <p>Size: ${"${variant_title}"}</p>
  </td>
  <td class="cart-item-td cart-item-td--quantity">
      <input type="number" name="updates[]" data-id="${"${variantId}"}" value="${"${quantity}"}" size="1" min="1" max="999" autocomplete="off" data-item-quantity>
      <input type="submit" value="Update" class="update update-mn" role="button">
      <br>
      <a href="/cart/change?line=1&quantity=0" class="remove" role="button">Remove</a>
  </td>
  <td class="cart-item-td cart-item-td--price">
      <div class="cart-price">
          <p class="ck-item-price multi-mn" data-item-price></p>
          <div class="total-price item-mn" data-item-total>${"${line_price}"}${"${currency}"}</div>
      </div>
  </td>
</tr>`
});
```

### Shopicart parameters

| Parameters    | Value           | Example  |
| ------------- |:-------------:| -----:|
| form    | element | document.querySelectorAll(".lete-add-cart") |
| appendHere     | element      |   document.getElementById("tbody-mc") |
| miniFunc     | function      |   toggleMiniCart |
| miniTotal | element      |   document.querySelector("#mini-cart-total") |
| itemTemplate | HTML text      | ``` `<p>Hello ${"${vendor}"}</p>` ``` |


### Shopicart parameter's description.

1. form - Add items to cart form.
2. appendHere - This is where itemTemplate will be appended.
3. miniTotal - Total price of items in the mini-cart.
4. miniFunc - Function that will run after the item is added in the minicart.
5. itemTemplate - Only accepts backticks format HTML text.

### Paramaters for itemTemplate.

1. **variantId** - will be replaced by item's variant_id.
2. **url** - will be replaced by item's URL.
3. **image_url** - will be replaced item's featured_image.url.
4. **image_alt** - will be replaced by item's featured_image.alt
5. **vendor** - will be replaced by item's vendor.
6. **title** - will be replaced by item's title.
7. **variant_title** - will be replaced by item's variant_title.
8. **quantity** - will be replaced by item's quantity.
9. **line_price** - will be replaced by item's line_price.
10. **discount** - will be replaced by item's discounted_price.
11. **currency** - will be replaced by Shops current active currency format.

### itemTemplate data's

1. **data-item-price** - Add data-item-price attribute to where you want to output the item price.
2. **data-item-total** - Add data-item-total attribute to where you want to output the cart's total price.
3. **data-item-quantity** - Add data-item-quantity attribute to where you want to ouput the item's quantity.
4. **data-id** - Add data-id attribute with the value of variantId

### itemTemplate description.

itemTemplate should be of the same format in your theme file.

#### Inside my Shopify theme's custom created minicart template

```
{%- for line_item in cart.items -%}
  <tr class="product-cart-c mini-cart-tr line-{{ forloop.index }}" data-id="{{ line_item.variant_id }}">
     <td class="cart-item-td cart-item-td--img">
       <a href="{{- line_item.product.url -}}" class="product-image">
       <img src="{{- line_item.product.featured_image | img_url: '200x300' -}}" alt="{{- line_item.product.featured_image.alt -}}">
       </a>
     </td>
    <td class="cart-item-td cart-item-description">
       <a href="{{- line_item.product.url -}}">
       <h2 class="model">{{- line_item.product.vendor -}}</h2>
       <h1 class="name">{{- line_item.product.title -}}</h1>
       </a>
       <br>
       <p>Size: {{ line_item.variant.title }}</p>
    </td>
    <td class="cart-item-td cart-item-td--quantity">
       <input type="number" name="updates[]" data-id="{{ line_item.variant_id }}" value="{{- line_item.quantity -}}" size="1" min="1"   max="999" autocomplete="off" data-item-quantity>
       <input type="submit" value="Update" class="update update-mn" role="button" data-a-index="{{ forloop.index | minus: 1}}">
       <br>
       <a href="/cart/change?line={{ forloop.index }}&quantity=0" class="remove" role="button">Remove</a>
    </td>
    <td class="cart-item-td cart-item-td--price">
       <div class="cart-price">
         {%- if line_item.quantity > 1 -%}
           <p class="ck-item-price multi-mn" data-item-price>{{ line_item.product.price | money_with_currency }}
           x {{ line_item.quantity }}</p>
           {%- else -%}
           <p class="ck-item-price multi-mn"></p>
        {%- endif -%}
       <div class="total-price item-mn" data-item-total>{{- line_item.line_price | money_with_currency -}}</div>
    </div>
  </td>
 </tr>
{%- endfor -%}
```




