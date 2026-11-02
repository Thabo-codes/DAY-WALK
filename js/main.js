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
                product.style.display =
                    productName.includes(searchTerm) ? "" : "none";
            });
        });
    }

    // 2. AUTOMATIC PRODUCT SELECTION
    const params = new URLSearchParams(window.location.search);
    const selectedProduct = params.get("product");
    const productField = document.getElementById("product");

    if (selectedProduct && productField) {
        productField.value = selectedProduct;
    }

    // 3. AJAX ENQUIRY FORM
    const form = document.getElementById("enquiry-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const product = document.getElementById("product").value;
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !product || !message) {
                status.textContent = "Please complete all required fields.";
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                status.textContent = "Please enter a valid email address.";
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');

            status.textContent = "Sending enquiry...";
            if (submitButton) submitButton.disabled = true;

            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            title: name,
                            body: message,
                            email: email,
                            phone: phone,
                            product: product,
                            userId: 1
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Request failed");
                }

                const result = await response.json();

                status.textContent =
                    "AJAX test successful! Test response ID: " +
                    result.id +
                    ". This is a demonstration; enquiries are not stored or emailed.";

                form.reset();

            } catch (error) {
                status.textContent =
                    "Unable to send the test enquiry. Please check your internet connection and try again.";
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

});


// 4. BUY NOW FUNCTION
function buyProduct(productName) {
    window.location.href = "enquiry.html?product=" +
        encodeURIComponent(productName);
}