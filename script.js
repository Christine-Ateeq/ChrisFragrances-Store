$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        $("#cart-count").text(count);
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        saveCart();
        updateCartCount();
        alert(`${name} has been added to the cart.`);
    }

    function renderCartItems() {
        const $cartItems = $("#cart-items");
        $cartItems.empty();

        if (cart.length === 0) {
            $cartItems.append("<li>Your cart is empty.</li>");
            return;
        }

        cart.forEach(item => {
            const $item = $(`
                <li>
                    ${item.name} - $${item.price} x ${item.quantity}
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </li>
            `);
            $cartItems.append($item);
        });
    }

    function removeItemFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    function buyNow() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        alert("You have purchased the items!");
        cart = [];
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    updateCartCount();

    $(".add-to-cart").on("click", function () {
        const id = $(this).data("id");
        const name = $(this).data("name");
        const price = $(this).data("price");
        addToCart(id, name, price);
    });

    $(document).on("click", ".remove-item", function () {
        const id = $(this).data("id");
        removeItemFromCart(id);
    });

    $("#buy-now").on("click", buyNow);

    if ($("#cart-items").length) {
        renderCartItems();
    }
});

$('#search').on('input', function () {
    const searchValue = $(this).val().toLowerCase();
    $('.product').each(function () {
        const title = $(this).find('h3').text().toLowerCase();
        $(this).toggle(title.startsWith(searchValue));
    });
});
