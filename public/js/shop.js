function updateShopProduct(products, categoryId) {
    const filteredProductContainer = $('#filtered-products');
    if(!isNaN(categoryId)){
    const hiddenCategoryId = $('#hiddenCategoryId');
    hiddenCategoryId.val(parseInt(categoryId));
    }
    filteredProductContainer.empty();
    products.forEach((product, index) => {
        const row = `
   <div class="col-xl-4 col-sm-6 col-12">
                                                <!-- Start Product Default Single Item -->
                                                <div class="product-default-single-item product-color--golden"
                                                    data-aos="fade-up" data-aos-delay="0">
                                                    <div class="image-box">
                                                    
                                                        <a href="/product/${product.id}" class="image-link">
                                                            <img src="uploads/product/${product.image}" alt="">
                                                        </a>
                                                        <div class="action-link">
                                                            <div class="action-link-left">
                                                                <a href="#" data-bs-toggle="modal"
                                                                    data-bs-target="#modalAddcart">Add to Cart</a>
                                                            </div>
                                                            <div class="action-link-right">
                                                                <a href="#" data-bs-toggle="modal"
                                                                    data-bs-target="#modalQuickview"><i
                                                                        class="icon-magnifier"></i></a>
                                                                <a href="wishlist.html"><i
                                                                        class="icon-heart"></i></a>
                                                                <a href="compare.html"><i
                                                                        class="icon-shuffle"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="content">
                                                        <div class="content-left">
                                                            <h6 class="title"><a
                                                                    href="product-details-default.html">
                                                                    ${product.title}
                                                                </a></h6>
                                                            <ul class="review-star">
                                                                <li class="fill"><i class="ion-android-star"></i>
                                                                </li>
                                                                <li class="fill"><i class="ion-android-star"></i>
                                                                </li>
                                                                <li class="fill"><i class="ion-android-star"></i>
                                                                </li>
                                                                <li class="fill"><i class="ion-android-star"></i>
                                                                </li>
                                                                <li class="empty"><i class="ion-android-star"></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="content-right">
                                                            <span class="price">
                                                                ${product.price}$
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <!-- End Product Default Single Item -->
                                            </div>
       `;
        filteredProductContainer.append(row);
    });
}

$(document).ready(function () {
    window.filterProducts = function (categoryId) {
        var priceRange = $("#slider-range").slider("values");
        $.post('/shop', { id: categoryId, priceRange: priceRange }, function (response) {
            console.log(response);
            updateShopProduct(response.products, response.categoryId);
        });
    };
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [0, 500],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
          
        $("#slider-range").on('slidestop', function () {
            var categoryId = $("#hiddenCategoryId").val() || undefined;
            window.filterProducts(categoryId);
        });

    });

      // window.filterProductsByPrice = function () {
            //     var priceRange = $("#slider-range").slider("values");
            //     var categoryId = getCategoryFromSomeWhere();
            //    console.log(categoryId);
            //     console.log(priceRange);
            //     $.post('/shop', { priceRange: priceRange }, function (response) {
            //         console.log(response);
            //         updateShopProduct(response.products);
            //     });
            // };