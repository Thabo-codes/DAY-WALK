// DAY WALK - Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {

    console.log("DAY WALK is ready!");

    // 1. PRODUCT SEARCH
    const searchInput = document.getElementById("product-search");
    const products = document.querySelectorAll(".product");

    if (searchInput && products.length > 0) {
        searchInput.addEventListener("input", function () {

            const searchTerm = searchInput.value.toLowerCase().trim();

            products.forEach(function (product) {
                const productName = product.textContent.toLowerCase();

                if (productName.includes(searchTerm)) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }
            });
        });
    }

    // 2. AUTOMATIC PRODUCT SELECTION
    const params = new URLSearchParams(window.location.search);
    const selectedProduct = params.get("product");
    const productField = document.getElementById("product");

    if (selectedProduct && productField) {
        productField.value = selectedProduct;
        console.log("Selected product:", selectedProduct);
    }

    // 3. ENQUIRY FORM VALIDATION
    const form = document.getElementById("enquiry-form");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const product = document.getElementById("product").value;
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !product || !message) {
                alert("Please complete all required fields.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (phone && !/^[0-9+ ]{10,15}$/.test(phone)) {
                alert("Please enter a valid phone number.");
                return;
            }

            alert("Thank you! Your enquiry has been validated successfully.");

            form.reset();
        });
    }

});


// 4. BUY NOW FUNCTION
function buyProduct(productName) {

    window.location.href = "enquiry.html?product=" +
        encodeURIComponent(productName);

}