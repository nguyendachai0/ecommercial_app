function updateProductTable(products, allCategoryNamesWithIds) {
    const tableBody = $("#productTableBody");
    tableBody.empty();
    products.forEach((product, index) => {
        const row = `
        <tr>
        <td><strong>${index + 1}</strong></td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${allCategoryNamesWithIds.find(category => product.category_id == category.id).title}</td>
        <td>
        <div class="d-flex align-items-center"><img
                src="/uploads/product/${product.image}"
                class="rounded-lg mr-2" width="24" alt=""></div>
    </td>
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
                    <button class="dropdown-item" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        </td>
    </tr>
            `;
        tableBody.append(row);
    });
}
function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        $.ajax({
            url: "/admin/product/delete",
            method: "POST",
            data: {
                id: productId,
            },
            dataType: 'json',
            success: function (response) {
                updateProductTable(response.products, response.allCategoryNamesWithIds);
            },
        });
    }
}
$(document).ready(function () {
    $("#addProductForm").on("submit", function (event) {
        event.preventDefault();
        const formData = new FormData();
        if ($(this).valid()) {
            formData.append('title', document.getElementById('val-title').value);
            formData.append('price', document.getElementById('val-price').value);
                formData.append('description', document.getElementById('val-description').value);
                formData.append('category_id', document.getElementById('val-category-id').value);
                formData.append('image', document.getElementById('val-image').files[0]);
        $.ajax({    
            url: "/admin/product",
            method: "POST",
            data: formData,        
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                updateProductTable(response.products, response.allCategoryNamesWithIds);
                $("#addProductForm")[0].reset();
                $(".custom-file-label").text("Choose file");
            },
            error: function (err) {
                console.error("Request failed", err);
            }
        })
    }
})
    $("#updateProductForm").on("submit", function (event) {
        event.preventDefault();
        const formData = new FormData();
        if ($(this).valid()) {
            formData.append('id', document.getElementById('val-id').value);
            formData.append('title', document.getElementById('val-title').value);
            formData.append('price', document.getElementById('val-price').value);
            formData.append('description', document.getElementById('val-description').value);
            formData.append('category_id', document.getElementById('val-category-id').value);
            const imageInput = document.getElementById('val-image');
        if (imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }
            console.log(formData.get("id"));    
            console.log(formData.get("title"));    
            console.log(formData.get("description"));    
            console.log(formData.get("category_id"));    
            console.log(formData.get("image"));    
            $.ajax({
            url: "/admin/product/edit/:id",
            method: "POST",
            data: formData,        
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                console.log('yea');
                updateProductTable(response.products,  response.allCategoryNamesWithIds);
            },
            error: function (err) {
                console.error("Request failed", err);
            }
        })
    }})
}
)