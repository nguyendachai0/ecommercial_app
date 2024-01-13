function addProduct() {
    const formData = new FormData();
    formData.append('title', document.getElementById('val-title').value);
    formData.append('description', document.getElementById('val-description').value);
    formData.append('category_id', document.getElementById('val-category-id').value);
    formData.append('image', document.getElementById('val-image').files[0]);

    // Make sure to adjust the URL to match your backend endpoint
    const apiUrl = '/admin/product';

    fetch(apiUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error(error);
    });
}

function updateProductTable(products) {
    const tableBody = $("#productTableBody");
    tableBody.empty();
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
//     $("#addProductForm").on("submit", function (event) {
//         event.preventDefault();
//         if ($(this).valid()) {
//         let title = $("#val-title").val();
//         let description = $("#val-description").val();
//         let category_id = $("#val-category-id").val();
//         let image = $("#files")[0].files[0];
//         console.log(image)
//         let formData = new FormData();
//         formData.append("title", title);
//         formData.append("description", description);
//         formData.append("category_id", category_id);
//         //     for(let i = 0; i < image.length; i++){
//         //         formData.append("images" ,image[i]);
//         //     }
//         formData.append("images", image, image.name);  
//         console.log(formData.get("title"));    
//         console.log(formData.get("description"));    
//         console.log(formData.get("category_id"));    
//         console.log(formData.get("images"));    
//         $.ajax({    
//             url: "/admin/product",
//             method: "POST",
//             data: formData,
//             // data: {
//             //     title: title,
//             //     description: description,
//             //     category_id: category_id,
//             //     image: image
//             // },
//             contentType: false,
//             processData: false,
//             dataType: 'json',
//             success: function (response) {
//                 console.log("fuck yeah")
//                 updateProductTable(response.products);
//                 $("#addProductForm")[0].reset();
//                 $(".custom-file-label").text("Choose file");
//             },
//             error: function (err) {
//                 console.error("Request failed", err);
//             }
//         })
//     }
// })
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
            },
        })
    }})
}
)