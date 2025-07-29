// Sample product data
const products = [
  {
    id: 1,
    title: "HEPA Air Purifier Pro",
    description:
      "Advanced air purifier with HEPA filter, removes 99.97% of particles",
    price: 149.99,
    category: "air-purifiers",
    condition: "new",
    location: "usa",
    rating: 4.5,
    reviews: 128,
    image:
      "https://www.thespruce.com/thmb/txRoMNF5h1hObhPQZoX7eSlVdx8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spr-primary-hwortock-001-e165b9a055e14512abf7a52884cd6b86.jpeg",
  },
  {
    id: 2,
    title: "Solar Power Bank 20000mAh",
    description: "Portable solar charger with high capacity battery",
    price: 79.99,
    category: "green-tech",
    condition: "new",
    location: "europe",
    rating: 4.2,
    reviews: 89,
    image:
      "https://www.xtorm.eu/cdn/shop/files/Xtorm_20__20XR203_20_Elmar_23_1280x.jpg?v=1752548626",
  },
  {
    id: 3,
    title: "Environmental Science Textbook",
    description: "Complete guide to environmental science, excellent condition",
    price: 24.99,
    category: "used-books",
    condition: "good",
    location: "usa",
    rating: 4.7,
    reviews: 45,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center",
  },
  {
    id: 4,
    title: "Bamboo Fiber Water Bottle",
    description: "Eco-friendly water bottle made from sustainable bamboo fiber",
    price: 19.99,
    category: "eco-products",
    condition: "new",
    location: "asia",
    rating: 4.3,
    reviews: 67,
    image:
      "https://apnakraft.com/wp-content/uploads/2025/04/bottle-600x338.png",
  },
  {
    id: 5,
    title: "Smart Air Quality Monitor",
    description: "Real-time air quality monitoring with mobile app integration",
    price: 89.99,
    category: "green-tech",
    condition: "like-new",
    location: "usa",
    rating: 4.6,
    reviews: 156,
    image:
      "https://media.wired.com/photos/67ec4980ff12d808adb2aa48/4:3/w_960,c_limit/Govee-Smart-Air-Quality-Monitor-Reviewer-Photo-SOURCE-Lisa-Wood-Shapiro.-(no-border).jpg",
  },
  {
    id: 6,
    title: "Desktop Air Purifier Mini",
    description: "Compact air purifier perfect for small spaces and offices",
    price: 49.99,
    category: "air-purifiers",
    condition: "new",
    location: "europe",
    rating: 4.1,
    reviews: 93,
    image:
      "https://smartairfilters.com/wordpress/wp-content/uploads/2021/12/qt3-portable-air-purifier-table-living-room-1-1-1536x1090.jpg",
  },
  {
    id: 7,
    title: "Organic Gardening Guide",
    description:
      "Complete handbook for sustainable organic gardening practices",
    price: 16.99,
    category: "used-books",
    condition: "fair",
    location: "usa",
    rating: 4.4,
    reviews: 34,
    image:
      "https://greeneraagri.com/wp-content/uploads/2023/08/10-Easy-Steps-to-Start-with-Organic-Gardening-1024x614.webp",
  },
  {
    id: 8,
    title: "Reusable Food Storage Set",
    description:
      "Set of 6 silicone food containers, BPA-free and dishwasher safe",
    price: 34.99,
    category: "eco-products",
    condition: "new",
    location: "other",
    rating: 4.8,
    reviews: 112,
    image: "https://m.media-amazon.com/images/I/61s51miB6UL._SX522_.jpg",
  },
  {
    id: 9,
    title: "Wind Power Generator Kit",
    description: "DIY wind turbine kit for renewable energy learning",
    price: 129.99,
    category: "green-tech",
    condition: "new",
    location: "europe",
    rating: 4.0,
    reviews: 67,
    image:
      "https://content.instructables.com/FER/S2WU/JYIZF41R/FERS2WUJYIZF41R.jpg?auto=webp&frame=1&width=1024&height=1024&fit=bounds&md=MjAxOS0wNy0yOCAwMzoyMDozNC4w&_gl=1*1g096kg*_ga*MTcyOTIyODA5OC4xNzUzNzc5MzA2*_ga_NZSJ72N6RX*czE3NTM3NzkzMDYkbzEkZzEkdDE3NTM3NzkzMDYkajYwJGwwJGgw",
  },
  {
    id: 10,
    title: "Professional Air Purifier",
    description: "Industrial-grade air purifier for large rooms and offices",
    price: 299.99,
    category: "air-purifiers",
    condition: "like-new",
    location: "usa",
    rating: 4.9,
    reviews: 203,
    image: "https://eoleaf.com/cdn/shop/files/AEROPRO100-ENV4.jpg?v=1751988292",
  },
];

let filteredProducts = [...products];

// DOM elements
const productsGrid = document.getElementById("products-grid");
const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const conditionFilter = document.getElementById("condition-filter");
const locationFilter = document.getElementById("location-filter");

// Initialize the page
function init() {
  renderProducts(products);
  setupEventListeners();
  setupHamburgerToggle();
  setupModalEventListeners();
  setupSearchFunctionality();
  setupCartEventListeners();
  setupFilterDropdown();
  updateCartBadge();
}

// Setup event listeners for filters
function setupEventListeners() {
  categoryFilter.addEventListener("change", applyFilters);
  priceFilter.addEventListener("change", applyFilters);
  conditionFilter.addEventListener("change", applyFilters);
  locationFilter.addEventListener("change", applyFilters);
}

// Setup search functionality
function setupSearchFunctionality() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Search on input change (debounced)
  let searchTimeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });

  // Search on button click
  searchButton.addEventListener("click", () => {
    performSearch(searchInput.value);
  });

  // Search on Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch(searchInput.value);
    }
  });
}

// Perform search
function performSearch(query) {
  if (!query.trim()) {
    // If search is empty, apply current filters
    applyFilters();
    return;
  }

  const searchTerm = query.toLowerCase().trim();
  const searchResults = products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = product.description
      .toLowerCase()
      .includes(searchTerm);
    const categoryMatch = getCategoryName(product.category)
      .toLowerCase()
      .includes(searchTerm);

    return titleMatch || descriptionMatch || categoryMatch;
  });

  // Apply other filters to search results
  filteredProducts = searchResults.filter((product) => {
    const categoryMatch =
      categoryFilter.value === "all" ||
      product.category === categoryFilter.value;
    const priceMatch = checkPriceRange(product.price, priceFilter.value);
    const conditionMatch =
      conditionFilter.value === "all" ||
      product.condition === conditionFilter.value;
    const locationMatch =
      locationFilter.value === "all" ||
      product.location === locationFilter.value;

    return categoryMatch && priceMatch && conditionMatch && locationMatch;
  });

  renderProducts(filteredProducts);
}

// Render products to the grid
function renderProducts(productsToRender) {
  productsGrid.innerHTML = "";

  if (productsToRender.length === 0) {
    productsGrid.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary); grid-column: 1 / -1;">No products found matching your filters.</p>';
    return;
  }

  productsToRender.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const stars = generateStars(product.rating);
  const conditionDisplay =
    product.condition.charAt(0).toUpperCase() + product.condition.slice(1);
  const locationDisplay =
    product.location.charAt(0).toUpperCase() + product.location.slice(1);

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}" loading="lazy">
    </div>
    <div class="product-info">
      <div class="product-category">${getCategoryName(product.category)}</div>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-price">$${product.price}</div>
      <div class="product-condition">Condition: ${conditionDisplay}</div>
      <div class="product-rating">
        <div class="stars">${stars}</div>
        <span class="rating-text">${product.rating} (${
    product.reviews
  } reviews)</span>
      </div>
      <div class="product-location">
        <i class="fas fa-map-marker-alt"></i>
        ${locationDisplay}
      </div>
      <button class="buy-button" onclick="buyProduct(${
        product.id
      })">View Product</button>
    </div>
  `;

  return card;
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = "";

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<span class="star filled">★</span>';
    } else if (i === fullStars && hasHalfStar) {
      starsHTML += '<span class="star filled">☆</span>';
    } else {
      starsHTML += '<span class="star">☆</span>';
    }
  }

  return starsHTML;
}

// Get category display name
function getCategoryName(category) {
  const categoryNames = {
    "air-purifiers": "Air Purifiers",
    "green-tech": "Green Tech",
    "used-books": "Used Books",
    "eco-products": "Eco Products",
  };
  return categoryNames[category] || category;
}

// Apply all filters
function applyFilters() {
  filteredProducts = products.filter((product) => {
    const categoryMatch =
      categoryFilter.value === "all" ||
      product.category === categoryFilter.value;
    const priceMatch = checkPriceRange(product.price, priceFilter.value);
    const conditionMatch =
      conditionFilter.value === "all" ||
      product.condition === conditionFilter.value;
    const locationMatch =
      locationFilter.value === "all" ||
      product.location === locationFilter.value;

    return categoryMatch && priceMatch && conditionMatch && locationMatch;
  });

  renderProducts(filteredProducts);
}

// Check if price is in selected range
function checkPriceRange(price, range) {
  if (range === "all") return true;

  switch (range) {
    case "0-50":
      return price >= 0 && price <= 50;
    case "50-100":
      return price > 50 && price <= 100;
    case "100-200":
      return price > 100 && price <= 200;
    case "200+":
      return price > 200;
    default:
      return true;
  }
}

// Handle view product button click
function buyProduct(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    openProductModal(product);
  }
}

// Open product modal with detailed information
function openProductModal(product) {
  currentProduct = product; // Store current product for purchase

  const modal = document.getElementById("product-modal");
  const modalImage = document.getElementById("modal-product-image");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalRating = document.getElementById("modal-rating");
  const modalCondition = document.getElementById("modal-condition");
  const modalLocation = document.getElementById("modal-location");
  const modalDescription = document.getElementById("modal-description");

  // Populate modal with product data
  modalImage.src = product.image;
  modalImage.alt = product.title;
  modalCategory.textContent = getCategoryName(product.category);
  modalTitle.textContent = product.title;
  modalPrice.textContent = `$${product.price}`;
  modalRating.innerHTML = `
    <div class="stars">${generateStars(product.rating)}</div>
    <span class="rating-text">${product.rating} (${
    product.reviews
  } reviews)</span>
  `;
  modalCondition.textContent = `Condition: ${
    product.condition.charAt(0).toUpperCase() + product.condition.slice(1)
  }`;
  modalLocation.innerHTML = `
    <i class="fas fa-map-marker-alt"></i>
    ${product.location.charAt(0).toUpperCase() + product.location.slice(1)}
  `;
  modalDescription.textContent = getExtendedDescription(product);

  // Show modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Close product modal
function closeProductModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Get extended product description
function getExtendedDescription(product) {
  const extendedDescriptions = {
    1: "This advanced HEPA air purifier features a 3-stage filtration system that captures particles as small as 0.3 microns. Perfect for homes, offices, and bedrooms up to 500 sq ft. Includes smart sensors that automatically adjust fan speed based on air quality levels. Energy Star certified with whisper-quiet operation.",
    2: "High-efficiency solar power bank with premium lithium polymer battery. Features dual USB ports, LED flashlight, and weather-resistant design. Perfect for camping, hiking, or emergency backup power. Charges via solar panel or AC adapter. Includes carrying case and charging cables.",
    3: "Comprehensive environmental science textbook covering climate change, pollution, conservation, and sustainability. Used in excellent condition with minimal highlighting. Perfect for students, professionals, or anyone interested in environmental issues. Includes access code for online resources.",
    4: "Sustainable bamboo fiber water bottle with leak-proof design. BPA-free, eco-friendly alternative to plastic bottles. Keeps drinks cold for 24 hours or hot for 12 hours. Easy-clean wide mouth design with ergonomic grip. Dishwasher safe.",
    5: "Professional-grade air quality monitor with real-time tracking of PM2.5, PM10, temperature, and humidity. WiFi-enabled with smartphone app for remote monitoring and historical data. Perfect for health-conscious individuals and families. Includes wall mount and desktop stand.",
    6: "Compact desktop air purifier ideal for personal spaces. HEPA filter removes allergens, dust, and odors. Ultra-quiet operation perfect for offices and bedrooms. One-button operation with LED indicators. Filter replacement indicator included.",
    7: "Complete guide to organic gardening with step-by-step instructions for growing vegetables, herbs, and flowers without chemicals. Includes soil preparation, composting, pest control, and seasonal planning. Gently used with some notes in margins.",
    8: "Premium silicone food storage containers in various sizes. Airtight seals keep food fresh longer. Microwave, freezer, and dishwasher safe. Stackable design saves space. Great for meal prep, leftovers, and on-the-go meals.",
    9: "Educational wind power generator kit perfect for STEM learning. Build your own working wind turbine to generate renewable energy. Includes all components, tools, and detailed instruction manual. Great for students and hobbyists.",
    10: "Industrial-grade air purifier designed for large spaces up to 1500 sq ft. Multi-stage filtration including HEPA, activated carbon, and UV-C sterilization. Smart controls with app connectivity and air quality monitoring. Whisper-quiet operation with timer function.",
  };

  return extendedDescriptions[product.id] || product.description;
}

// Cart management
let cart = JSON.parse(localStorage.getItem("marketplace-cart")) || [];
let currentProduct = null;

// Setup modal event listeners
function setupModalEventListeners() {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("close-modal");
  const buyNowBtn = document.getElementById("buy-now-btn");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const contactSellerBtn = document.getElementById("contact-seller-btn");

  // Close modal when clicking X
  closeBtn.addEventListener("click", closeProductModal);

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeProductModal();
    }
  });

  // Buy Now button - Start checkout process
  buyNowBtn.addEventListener("click", () => {
    if (currentProduct) {
      startCheckoutProcess(currentProduct);
    }
  });

  // Add to Cart button
  addToCartBtn.addEventListener("click", () => {
    if (currentProduct) {
      addToCart(currentProduct);
      showNotification("Product added to cart!", "success");
    }
  });

  // Contact Seller button
  contactSellerBtn.addEventListener("click", () => {
    showContactSellerForm();
  });
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem("marketplace-cart", JSON.stringify(cart));
  updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById("cart-badge");

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "flex" : "none";
  }
}

// Setup cart event listeners
function setupCartEventListeners() {
  const cartButton = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const closeCartBtn = document.getElementById("close-cart");

  // Open cart modal
  cartButton.addEventListener("click", openCartModal);

  // Close cart modal
  closeCartBtn.addEventListener("click", closeCartModal);

  // Close cart modal when clicking outside
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCartModal();
    }
  });

  // Close cart modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal.style.display === "block") {
      closeCartModal();
    }
  });
}

// Open cart modal
function openCartModal() {
  const cartModal = document.getElementById("cart-modal");
  renderCartItems();
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close cart modal
function closeCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <p>Add some products to get started!</p>
      </div>
    `;
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  const cartHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateCartQuantity(${
            item.id
          }, -1)">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateCartQuantity(${
            item.id
          }, 1)">+</button>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");

  cartItemsContainer.innerHTML = cartHTML;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Update cart item quantity
function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem("marketplace-cart", JSON.stringify(cart));
      updateCartBadge();
      renderCartItems();
    }
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("marketplace-cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
  showNotification("Item removed from cart", "info");
}

// Clear entire cart
function clearCart() {
  if (cart.length === 0) {
    showNotification("Cart is already empty", "info");
    return;
  }

  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    localStorage.setItem("marketplace-cart", JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
    showNotification("Cart cleared", "info");
  }
}

// Checkout cart
function checkoutCart() {
  if (cart.length === 0) {
    showNotification("Your cart is empty", "warning");
    return;
  }

  closeCartModal();
  showCheckoutModal(cart, "cart");
}

// Start checkout process
function startCheckoutProcess(product) {
  closeProductModal();
  showCheckoutModal([{ ...product, quantity: 1 }], "buy-now");
}

// Show checkout modal
function showCheckoutModal(items, type = "cart") {
  const checkoutHTML = createCheckoutModal(items, type);
  document.body.insertAdjacentHTML("beforeend", checkoutHTML);

  const checkoutModal = document.getElementById("checkout-modal");
  checkoutModal.style.display = "block";
  document.body.style.overflow = "hidden";

  setupCheckoutEventListeners(items, type);
}

// Create checkout modal HTML
function createCheckoutModal(items, type) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemsHTML = items
    .map(
      (item) => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.title}" class="checkout-item-image">
      <div class="checkout-item-details">
        <h4>${item.title}</h4>
        <p>Quantity: ${item.quantity}</p>
        <p class="checkout-item-price">$${(item.price * item.quantity).toFixed(
          2
        )}</p>
      </div>
    </div>
  `
    )
    .join("");

  return `
    <div class="checkout-modal" id="checkout-modal">
      <div class="checkout-content">
        <span class="close-checkout" id="close-checkout">&times;</span>
        <h2>Checkout</h2>
        
        <div class="checkout-section">
          <h3>Order Summary</h3>
          <div class="checkout-items">
            ${itemsHTML}
          </div>
          <div class="checkout-total">
            <strong>Total: $${total.toFixed(2)}</strong>
          </div>
        </div>

        <div class="checkout-section">
          <h3>Shipping Information</h3>
          <form id="checkout-form" class="checkout-form">
            <div class="form-group">
              <label for="full-name">Full Name *</label>
              <input type="text" id="full-name" name="fullName" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
              <label for="address">Street Address *</label>
              <input type="text" id="address" name="address" required>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="city">City *</label>
                <input type="text" id="city" name="city" required>
              </div>
              
              <div class="form-group">
                <label for="state">State *</label>
                <input type="text" id="state" name="state" required>
              </div>
              
              <div class="form-group">
                <label for="zip">ZIP Code *</label>
                <input type="text" id="zip" name="zip" required>
              </div>
            </div>
        </div>

        <div class="checkout-section">
          <h3>Payment Information</h3>
          <div class="form-group">
            <label for="card-number">Card Number *</label>
            <input type="text" id="card-number" name="cardNumber" placeholder="1234 5678 9012 3456" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="expiry">Expiry Date *</label>
              <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required>
            </div>
            
            <div class="form-group">
              <label for="cvv">CVV *</label>
              <input type="text" id="cvv" name="cvv" placeholder="123" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="card-name">Name on Card *</label>
            <input type="text" id="card-name" name="cardName" required>
          </div>
        </div>

        <div class="checkout-actions">
          <button type="button" class="cancel-checkout-btn">Cancel</button>
          <button type="submit" form="checkout-form" class="complete-purchase-btn">
            Complete Purchase - $${total.toFixed(2)}
          </button>
        </div>
        </form>
      </div>
    </div>
  `;
}

// Setup checkout event listeners
function setupCheckoutEventListeners(items, type) {
  const checkoutModal = document.getElementById("checkout-modal");
  const closeBtn = document.getElementById("close-checkout");
  const cancelBtn = checkoutModal.querySelector(".cancel-checkout-btn");
  const form = document.getElementById("checkout-form");

  // Close checkout modal
  const closeCheckout = () => {
    checkoutModal.remove();
    document.body.style.overflow = "auto";
  };

  closeBtn.addEventListener("click", closeCheckout);
  cancelBtn.addEventListener("click", closeCheckout);

  // Close on outside click
  checkoutModal.addEventListener("click", (e) => {
    if (e.target === checkoutModal) {
      closeCheckout();
    }
  });

  // Format card number input
  const cardNumberInput = document.getElementById("card-number");
  cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    if (formattedValue.length > 19)
      formattedValue = formattedValue.substr(0, 19);
    e.target.value = formattedValue;
  });

  // Format expiry date input
  const expiryInput = document.getElementById("expiry");
  expiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substr(0, 2) + "/" + value.substr(2, 2);
    }
    e.target.value = value;
  });

  // Format CVV input
  const cvvInput = document.getElementById("cvv");
  cvvInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").substr(0, 4);
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    processPurchase(items, type, new FormData(form));
  });
}

// Process the purchase
function processPurchase(items, type, formData) {
  const purchaseButton = document.querySelector(".complete-purchase-btn");
  purchaseButton.disabled = true;
  purchaseButton.textContent = "Processing...";

  // Simulate payment processing
  setTimeout(() => {
    const orderData = {
      orderId: generateOrderId(),
      items: items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      customerInfo: Object.fromEntries(formData),
      orderDate: new Date().toISOString(),
      status: "confirmed",
    };

    // Save order to localStorage (in real app, this would be sent to server)
    const orders = JSON.parse(localStorage.getItem("marketplace-orders")) || [];
    orders.push(orderData);
    localStorage.setItem("marketplace-orders", JSON.stringify(orders));

    // If this was a cart purchase, clear the cart
    if (type === "cart") {
      cart = [];
      localStorage.setItem("marketplace-cart", JSON.stringify(cart));
      updateCartBadge();
    }

    // Close checkout and show success
    document.getElementById("checkout-modal").remove();
    document.body.style.overflow = "auto";

    showOrderConfirmation(orderData);
  }, 2000); // Simulate 2 second processing time
}

// Generate order ID
function generateOrderId() {
  return (
    "ORD-" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substr(2, 5).toUpperCase()
  );
}

// Show order confirmation
function showOrderConfirmation(orderData) {
  const confirmationHTML = `
    <div class="order-confirmation-modal" id="order-confirmation">
      <div class="confirmation-content">
        <div class="success-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase!</p>
        
        <div class="order-details">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
          <p><strong>Items:</strong> ${orderData.items.length} item(s)</p>
          <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
        </div>
        
        <div class="confirmation-actions">
          <button class="continue-shopping-btn" onclick="closeOrderConfirmation()">Continue Shopping</button>
          <button class="view-orders-btn" onclick="showOrderHistory()">View Order History</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", confirmationHTML);
  document.getElementById("order-confirmation").style.display = "block";
  document.body.style.overflow = "hidden";

  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (document.getElementById("order-confirmation")) {
      closeOrderConfirmation();
    }
  }, 10000);
}

// Close order confirmation
function closeOrderConfirmation() {
  const modal = document.getElementById("order-confirmation");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

// Show order history
function showOrderHistory() {
  closeOrderConfirmation();
  const orders = JSON.parse(localStorage.getItem("marketplace-orders")) || [];

  if (orders.length === 0) {
    showNotification("No orders found.", "info");
    return;
  }

  const ordersHTML = orders
    .map(
      (order) => `
    <div class="order-item">
      <h4>Order ${order.orderId}</h4>
      <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
      <p>Total: $${order.total.toFixed(2)}</p>
      <p>Items: ${order.items.length}</p>
      <p>Status: <span class="order-status">${order.status}</span></p>
    </div>
  `
    )
    .join("");

  const historyHTML = `
    <div class="order-history-modal" id="order-history">
      <div class="history-content">
        <span class="close-history" onclick="closeOrderHistory()">&times;</span>
        <h2>Order History</h2>
        <div class="orders-list">
          ${ordersHTML}
        </div>
        <button class="close-history-btn" onclick="closeOrderHistory()">Close</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", historyHTML);
  document.getElementById("order-history").style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close order history
function closeOrderHistory() {
  const modal = document.getElementById("order-history");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

// Show contact seller form
function showContactSellerForm() {
  const contactHTML = `
    <div class="contact-modal" id="contact-modal">
      <div class="contact-content">
        <span class="close-contact" onclick="closeContactForm()">&times;</span>
        <h2>Contact Seller</h2>
        <form id="contact-form" class="contact-form">
          <div class="form-group">
            <label for="contact-name">Your Name *</label>
            <input type="text" id="contact-name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="contact-email">Your Email *</label>
            <input type="email" id="contact-email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="contact-subject">Subject *</label>
            <input type="text" id="contact-subject" name="subject" required>
          </div>
          
          <div class="form-group">
            <label for="contact-message">Message *</label>
            <textarea id="contact-message" name="message" rows="4" required></textarea>
          </div>
          
          <div class="contact-actions">
            <button type="button" onclick="closeContactForm()">Cancel</button>
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", contactHTML);
  document.getElementById("contact-modal").style.display = "block";
  document.body.style.overflow = "hidden";

  // Handle form submission
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Message sent to seller!", "success");
    closeContactForm();
  });
}

// Close contact form
function closeContactForm() {
  const modal = document.getElementById("contact-modal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => notification.classList.add("show"), 100);

  // Hide notification
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Setup hamburger menu toggle
function setupHamburgerToggle() {
  const hamburger = document.getElementById("hamburger-button");
  const navbarMenu = document.getElementById("navbar-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navbarMenu.classList.toggle("show");
  });

  // Close menu when clicking on a nav item
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navbarMenu.classList.remove("show");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navbarMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navbarMenu.classList.remove("show");
    }
  });
}

// Setup filter dropdown functionality
function setupFilterDropdown() {
  const filterBtn = document.getElementById("filter-dropdown-btn");
  const filterMenu = document.getElementById("filter-dropdown-menu");

  // Toggle dropdown menu
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterBtn.classList.toggle("active");
    filterMenu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!filterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
      filterBtn.classList.remove("active");
      filterMenu.classList.remove("show");
    }
  });

  // Prevent dropdown from closing when clicking inside the menu
  filterMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

const settingsIcons = document.querySelectorAll(".settings-icon");
const modal = document.getElementById("settings-modal-tcg");
const darkModeToggleModal = document.getElementById("darkModeToggleModal");

function toggleTCGSettingsModal() {
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    syncToggleWithDarkMode();
  }
}

function syncToggleWithDarkMode() {
  if (darkModeToggleModal) {
    darkModeToggleModal.checked = document.body.classList.contains("dark-mode");
  }
}

settingsIcons.forEach((icon) => {
  icon.addEventListener("click", toggleTCGSettingsModal);
});

const closeButton = document.querySelector(".close-button");
if (closeButton) {
  closeButton.addEventListener("click", () => {
    return;
  });
}

// Dark Mode Logic
const modeName = document.getElementById("mode-name");
const savedDarkMode = localStorage.getItem("darkMode") === "enabled";
if (savedDarkMode) {
  document.body.classList.add("dark-mode");
}
if (darkModeToggleModal) {
  darkModeToggleModal.checked = savedDarkMode;
  darkModeToggleModal.addEventListener("change", () => {
    if (darkModeToggleModal.checked) {
      document.body.classList.add("dark-mode");
      modeName.innerText = "Light Mode";
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      modeName.innerText = "Dark Mode";
      localStorage.setItem("darkMode", "disabled");
    }
  });
}
