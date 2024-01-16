const base_url = 'http://localhost:3000/admin/';
function updateTable(categories) {
   
    const tableBody = $("#categoryTableBody");

    // Clear existing rows
    tableBody.empty();

    // Rebuild the table with updated data
    categories.forEach((category, index) => {
        const row = `
                <tr>
                    <td><strong>${index + 1}</strong></td>
                    <td>${category.title}</td>
                    <td>${category.description}</td>
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
                                <a class="dropdown-item" href="${base_url}category/edit/${category.id}">Edit</a>
                                <button class="dropdown-item"
                                                        onclick="deleteCategory(${category.id})">Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        tableBody.append(row);
    });
}
function deleteCategory(categoryId) {
    // Confirm the deletion
    if (confirm("Are you sure you want to delete this category?")) {
        event.preventDefault();
        $.ajax({
            url: "/admin/category/delete",
            method: "POST",
            data: {
                id: categoryId,
            },
            dataType: 'json',
            success: function (response) {
                updateTable(response.categories);
            },
        });
    }
}

$(document).ready(function () {
    $("#addCategoryForm").on("submit", function (event) {
        event.preventDefault();
        if ($(this).valid()) {
        let title = $("#val-title").val();
        let description = $("#val-description").val();
        $.ajax({
            url: "/admin/category",
            method: "POST",
            data: {
                title: title,
                description: description,
            },
            dataType: 'json',
            success: function (response) {

                updateTable(response.categories);
                // Clear the form fields
                $("#val-title").val('');
                $("#val-description").val('');
            },
        })
    }
})


    $("#updateCategoryForm").on("submit", function (event) {
        event.preventDefault();
        if ($(this).valid()) {
        let id = $('#val-id').val();
        let title = $("#val-title").val();
        let description = $("#val-description").val();
        $.ajax({
            url: "/admin/category/edit/:id",
            method: "POST",
            data: {
                id: id,
                title: title,
                description: description,
            },
            dataType: 'json',
            success: function (response) {

                updateTable(response.categories);
            },
        })
    }})


}
)