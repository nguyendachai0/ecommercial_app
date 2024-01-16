
class CartController {

    renderCartPage(req, res) {
        res.render('client/cart', { title: 'Cart page'});
    }
    addToCart(req, res){
        const {itemId, quantity} = req.body;
        // res.json(itemId, quantity);
        req.session.cart = req.session.cart || [];
        const existingItem = req.session.cart.find((item) => item.itemId === itemId);
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    req.session.cart.push({ itemId: parseInt(itemId), quantity: parseInt(quantity) });
    
  }
  res.json(req.session.cart)
    }
    
}
module.exports = new CartController()