const Product = require('../../models/Product');
class WishListController {

    renderWishListPage(req, res) {
      const wishListData = req.session.wishList || [];
      if(wishListData.length == 0){
        res.render('client/empty-wish-list', {title: 'WishList empty'});
      }else {
           res.render('client/wish-list', { title: 'Wist List page', wishList:wishListData});
      }
    }
    addToWishList(req, res){
        const itemId = req.body.itemId;
        req.session.wishList = req.session.wishList || [];
        const existingItem = req.session.wishList.find((item) => item.itemId == itemId);
        const product = Product.getProductById(itemId);
  if (existingItem) {
    existingItem.title = product.title || '';
    existingItem.unit_price = existingItem.unit_price || 0;
    existingItem.image = product.image || '';
  } else {
    req.session.wishList.push({
      itemId,
      title: product.title,
      unit_price: product.price,
      image: product.image,
  });    
  }
  res.redirect('/wishlist');
}
    
  deleteFromWishList(req, res){
    const itemId = req.body.itemId;
    const wishList = req.session.wishList || [];
    const itemIndex = wishList.findIndex(item => item.itemId == itemId);

    // Check if the item was found in the wishList
    if (itemIndex !== -1) {
      // Remove the item from the wishList
      wishList.splice(itemIndex, 1);

      // Update the wishList in the session
      req.session.wishList = wishList;
      res.redirect('/wishlist');  }
}
}

module.exports = new WishListController()