# Shopicart
 
### Dependency required, for Shopify currency formatting.
```
<script src="https:{{ 'api.jquery.js' | shopify_asset_url | remove: 'http:' | remove: 'https:'}}" defer="defer" crossorigin="anonymous"></script>
```

## Shopify Minicart AJAX


```Shopicart({
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
      <input type="submit" value="Update" class="update update-mn" data-a-index="0" role="button">
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
});```
