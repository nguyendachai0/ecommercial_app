const Product = require('../../models/Product');
class CartController {

    renderCartPage(req, res) {
      const cartData = req.session.cart || [];
     
      if(cartData.length == 0){
        res.render('client/empty-cart', {title: 'Cart empty'});
      }else {
      const total = cartData.reduce((acc, item) => acc + item.price, 0);
          res.render('client/cart', { title: 'Cart page', cart:cartData, total: total});
      }
    }
    addToCart(req, res){
        const {itemId, color, size, quantity} = req.body;
        req.session.cart = req.session.cart || [];
        const existingItem = req.session.cart.find((item) => item.itemId == itemId);
        const product = Product.getProductById(itemId);
  if (existingItem) {
    existingItem.title = product.title || '';
    existingItem.unit_price = existingItem.unit_price || 0;
    existingItem.price = product.price * parseInt(quantity) + existingItem.price || 0;
    existingItem.image = product.image || '';
    existingItem.quantity += parseInt(quantity);
    existingItem.color = existingItem.color || [];
    existingItem.size = existingItem.size || [];
    for (let i = 0; i < parseInt(quantity); i++) {
      existingItem.color.push(color);
      existingItem.size.push(size);
  }
  } else {
    const colors = new Array(parseInt(quantity)).fill(color);
    const sizes = new Array(parseInt(quantity)).fill(size);
    req.session.cart.push({
      itemId,
      title: product.title,
      unit_price: product.price,
      price: product.price * parseInt(quantity),
      image: product.image,
      quantity: parseInt(quantity),
      color: colors,
      size: sizes
  });    
  const itemsCount = req.session.cart ? req.session.cart.length : 0;
}
  res.redirect('/cart');}
    
  deleteFromCart(req, res){
    const itemId = req.body.itemId;
    const cart = req.session.cart || [];
    const itemIndex = cart.findIndex(item => item.itemId == itemId);

    // Check if the item was found in the cart
    if (itemIndex !== -1) {
      // Remove the item from the cart
      cart.splice(itemIndex, 1);

      // Update the cart in the session
      req.session.cart = cart;
      res.redirect('/cart');  }
}
}

module.exports = new CartController()