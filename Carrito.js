// Variables globales
let cart = [];

// Función para alternar la visibilidad del carrito
function toggleCart() {
    document.querySelector('.cart-dropdown').classList.toggle('active');
}

// Actualizar ícono del carrito
function updateCartIcon() {
    const badge = document.querySelector('.badge');
    badge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Renderizar el carrito
function renderCart() {
    const cartList = document.querySelector('.cart-list');
    const totalText = document.querySelector('.total');
    cartList.innerHTML = ''; // Limpia la lista
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartList.innerHTML += `
            <li>
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <span>${item.name} (x${item.quantity})</span><br>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button onclick="removeFromCart(${index})">&times;</button> <!-- Solo la "X" -->
            </li>
        `;
    });

    totalText.textContent = `Total: $${total.toFixed(2)}`;
}

// Agregar producto al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartIcon();
    renderCart();
    saveCart();
}

// Eliminar producto del carrito
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--; // Reduce la cantidad en 1
    } else {
        cart.splice(index, 1); // Elimina el producto si la cantidad es 0
    }

    updateCartIcon(); // Actualiza el ícono del carrito
    renderCart(); // Renderiza el carrito actualizado
    saveCart(); // Guarda los cambios en localStorage
}

// Vaciar carrito
function clearCart() {
    cart = [];
    updateCartIcon();
    renderCart();
    saveCart();
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = savedCart;
    updateCartIcon();
    renderCart();
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadCart);
