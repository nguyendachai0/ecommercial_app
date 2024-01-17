const Product = require('../../models/Product');
class CartController {

    renderCartPage(req, res) {
      const cartData = req.session.cart || [];
      const total = cartData.reduce((acc, item) => acc + item.price, 0);
          res.render('client/cart', { title: 'Cart page', cart:cartData, total: total});
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
  }
  res.redirect('/cart');}
    
}
module.exports = new CartController()