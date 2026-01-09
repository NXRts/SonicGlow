// Product Data
const products = [
    {
        id: 1,
        name: "SonicGlow Pro X",
        price: 299.00,
        image: "https://placehold.co/400x400/333/d4af37?text=Headphone+X",
        description: "Studio-grade noise cancelling headphones."
    },
    {
        id: 2,
        name: "SonicBuds Air",
        price: 149.00,
        image: "https://placehold.co/400x400/333/d4af37?text=Buds+Air",
        description: "True wireless earbuds with deep bass."
    },
    {
        id: 3,
        name: "SonicGlow Elite",
        price: 450.00,
        image: "https://placehold.co/400x400/333/d4af37?text=Headphone+Elite",
        description: "Audiophile open-back headphones."
    },
    {
        id: 4,
        name: "SonicBass 300",
        price: 199.00,
        image: "https://placehold.co/400x400/333/d4af37?text=Bass+300",
        description: "Wireless headphones focused on low-end impact."
    },
    {
        id: 5,
        name: "SonicBuds Sport",
        price: 129.00,
        image: "https://placehold.co/400x400/333/d4af37?text=Buds+Sport",
        description: "Water-resistant earbuds for active lifestyles."
    },
    {
        id: 6,
        name: "SonicGlow Studio",
        price: 350.00,
        image: "https://placehold.co/400x400/333/d4af37?text=Studio+Master",
        description: "Flat response reference headphones."
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

// Initialize
function init() {
    renderProducts();
}

// Render Skeletons
function renderSkeletons(count = 6) {
    productGrid.innerHTML = Array(count).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-btn"></div>
        </div>
    `).join('');
}

// Render Products
function renderProducts() {
    renderSkeletons();
    
    // Simulate network delay
    setTimeout(() => {
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('');
    }, 2000); // 2 seconds delay
}

// Add to Cart
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    openCart(); // Optional: Automatically open cart when adding
}

// Update Cart Quantity
window.updateQty = function(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    // Update Count
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountElement.innerText = totalQty;

    // Update Total Price
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotalPriceElement.innerText = '$' + totalPrice.toFixed(2);

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Toggle Cart Sidebar
window.toggleCart = function() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

// Toggle Mobile Menu
window.toggleMenu = function() {
    mobileMenuOverlay.classList.toggle('active');
}

// Run Init
init();
