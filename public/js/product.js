
function updateProductTable(products) {
   
    const tableBody = $("#productTableBody");

    // Clear existing rows
    tableBody.empty();

    // Rebuild the table with updated data
    products.forEach((product, index) => {
        const row = `
                <tr>
                    <td><strong>${index + 1}</strong></td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>
                        <div class="dropdown">
                            <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"></rect>
                                        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                                        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                                        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                                    </g>
                                </svg>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="${base_url}product/edit/${product.id}">Edit</a>
                                <button class="dropdown-item"
                                                        onclick="deleteProduct(${product.id})">Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        tableBody.append(row);
    });
}
function deleteProduct(productId) {
    // Confirm the deletion
    if (confirm("Are you sure you want to delete this product?")) {
        event.preventDefault();
        $.ajax({
            url: "/admin/product/delete",
            method: "POST",
            data: {
                id: productId,
            },
            dataType: 'json',
            success: function (response) {
                updateProductTable(response.products);
            },
        });
    }
}

$(document).ready(function () {
    $("#addProductForm").on("submit", function (event) {
        event.preventDefault();
        if ($(this).valid()) {
        let title = $("#val-title").val();
        let description = $("#val-description").val();
        let category_id = $("#val-category-id").val();
        let image = $("#val-image").val();
       
        
        $.ajax({
            url: "/admin/product",
            method: "POST",
            data: {
                title: title,
                description: description,
                category_id: category_id,
                image: image,
            },
            dataType: 'json',
            success: function (response) {

                updateProductTable(response.products);
                $("#val-title").val('');
                $("#val-description").val('');
                $("#val-category-id").val('');
                $("#val-image").val('');
            },
        })
    }
})


    $("#updateProductForm").on("submit", function (event) {
        event.preventDefault();
        if ($(this).valid()) {
        let id = $('#val-id').val();
        let title = $("#val-title").val();
        let description = $("#val-description").val();
        $.ajax({
            url: "/admin/product/edit/:id",
            method: "POST",
            data: {
                id: id,
                title: title,
                description: description,
            },
            dataType: 'json',
            success: function (response) {

                updateProductTable(response.products);
                // Clear the form fields

            },
        })
    }})


}
)