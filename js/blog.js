// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Understanding Air Quality Index: A Complete Guide",
    excerpt:
      "Learn what AQI means, how it's calculated, and why it matters for your daily health decisions.",
    category: "air-quality",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    image:
      "https://environmental-initiative.org/wp-content/uploads/2022/05/WordPress_AQI_202222-1110x740.webp",
    content: `
      <p>The Air Quality Index (AQI) is a crucial tool for understanding the quality of the air we breathe every day. This standardized system provides a simple way to communicate air pollution levels to the public.</p>

      <p>The AQI scale runs from 0 to 500, with higher values indicating worse air quality. The scale is divided into six categories, each represented by a different color:</p>

      <p><strong>Good (0-50):</strong> Air quality is satisfactory and poses little or no risk.</p>
      <p><strong>Moderate (51-100):</strong> Air quality is acceptable for most people, though sensitive individuals may experience minor issues.</p>
      <p><strong>Unhealthy for Sensitive Groups (101-150):</strong> Members of sensitive groups may experience health effects.</p>
      <p><strong>Unhealthy (151-200):</strong> Everyone may begin to experience health effects.</p>
      <p><strong>Very Unhealthy (201-300):</strong> Health warnings of emergency conditions.</p>
      <p><strong>Hazardous (301-500):</strong> Emergency conditions affecting the entire population.</p>

      <p>Understanding these levels helps you make informed decisions about outdoor activities and protect your health accordingly.</p>
    `,
    tags: ["AQI", "Health", "Air Pollution", "Guide"],
  },
  {
    id: 2,
    title: "10 Plants That Naturally Purify Indoor Air",
    excerpt:
      "Discover nature's air purifiers and learn how these plants can improve your home's air quality.",
    category: "green-living",
    author: "Maria Rodriguez",
    date: "2024-01-12",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop",
    content: `
      <p>Indoor air pollution can be up to 5 times worse than outdoor air pollution. Fortunately, nature provides us with beautiful solutions that can help purify the air in our homes.</p>

      <p>Here are 10 plants that NASA's Clean Air Study identified as excellent air purifiers:</p>

      <p><strong>1. Snake Plant (Sansevieria):</strong> Removes formaldehyde and benzene, perfect for bedrooms.</p>
      <p><strong>2. Peace Lily:</strong> Filters ammonia, formaldehyde, and trichloroethylene.</p>
      <p><strong>3. Spider Plant:</strong> Great for beginners, removes formaldehyde and xylene.</p>
      <p><strong>4. Aloe Vera:</strong> Removes formaldehyde and benzene, plus has healing properties.</p>
      <p><strong>5. Boston Fern:</strong> Natural humidifier that removes formaldehyde.</p>

      <p>These plants not only improve air quality but also add natural beauty to your living space. Most require minimal care and can thrive in various lighting conditions.</p>
    `,
    tags: ["Indoor Plants", "Air Purification", "Home", "Natural"],
  },
  {
    id: 3,
    title: "Climate Change Impact on Air Quality Worldwide",
    excerpt:
      "Exploring the complex relationship between global warming and air pollution patterns.",
    category: "climate-change",
    author: "Prof. James Wilson",
    date: "2024-01-10",
    readTime: "7 min read",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiXSsm6Gstx9xUXRmdOpzHSwoqMovl5-QI3Q&s",
    content: `
      <p>Climate change and air quality are intricately connected in ways that scientists are still discovering. As global temperatures rise, we're seeing significant changes in air pollution patterns worldwide.</p>

      <p>Rising temperatures increase the formation of ground-level ozone, a key component of smog. For every degree Celsius of warming, ozone concentrations can increase by 1-5%, making hot days even more dangerous for respiratory health.</p>

      <p>Wildfires, which are becoming more frequent and intense due to climate change, release massive amounts of particulate matter into the atmosphere. These particles can travel thousands of miles, affecting air quality in regions far from the fires themselves.</p>

      <p>Changes in precipitation patterns also affect air quality. Droughts increase dust storms and reduce the natural cleaning effect of rain, while extreme weather events can overwhelm pollution control systems.</p>

      <p>Understanding these connections is crucial for developing effective strategies to protect public health in our changing climate.</p>
    `,
    tags: ["Climate Change", "Global Warming", "Pollution", "Environment"],
  },
  {
    id: 4,
    title: "Smart Air Purifiers: Technology Meets Clean Air",
    excerpt:
      "Review of the latest smart air purification technologies and their effectiveness.",
    category: "technology",
    author: "Alex Kim",
    date: "2024-01-08",
    readTime: "6 min read",
    image:
      "https://acko-cms.ackoassets.com/Xiaomi_Smart_Purifier_4_1_2497047a1e.jpg",
    content: `
      <p>The air purifier market has evolved dramatically with the integration of smart technology. Today's devices don't just clean air—they monitor, analyze, and adapt to your environment in real-time.</p>

      <p>Modern smart air purifiers use multiple sensors to detect various pollutants including PM2.5, PM10, VOCs, and even specific allergens. This data is processed by AI algorithms that automatically adjust filtration intensity based on current air quality conditions.</p>

      <p>Key features to look for in smart air purifiers include:</p>

      <p><strong>Real-time Monitoring:</strong> Live air quality readings displayed on the device and mobile app.</p>
      <p><strong>Auto Mode:</strong> Automatic adjustment of fan speed based on pollution levels.</p>
      <p><strong>Smart Scheduling:</strong> Programmable operation based on your daily routine.</p>
      <p><strong>Filter Life Tracking:</strong> Notifications when filters need replacement.</p>
      <p><strong>Integration:</strong> Compatibility with smart home systems like Alexa or Google Home.</p>

      <p>While these devices can be effective, remember that the best air purification strategy combines technology with source control and proper ventilation.</p>
    `,
    tags: ["Technology", "Air Purifiers", "Smart Home", "Review"],
  },
  {
    id: 5,
    title: "The Hidden Health Costs of Air Pollution",
    excerpt:
      "Examining the long-term health impacts of poor air quality on communities worldwide.",
    category: "health",
    author: "Dr. Emily Park",
    date: "2024-01-05",
    readTime: "8 min read",
    image:
      "https://www.shutterstock.com/image-vector/bridging-health-divide-start-new-600nw-2328285273.jpg",
    content: `
      <p>Air pollution is often called the "invisible killer" because its health effects aren't immediately apparent. However, scientific research continues to reveal the extensive impact of poor air quality on human health.</p>

      <p>Short-term exposure to polluted air can trigger asthma attacks, respiratory infections, and cardiovascular problems. But the long-term effects are even more concerning.</p>

      <p>Chronic exposure to air pollution has been linked to:</p>

      <p><strong>Respiratory Diseases:</strong> Increased risk of lung cancer, COPD, and reduced lung function.</p>
      <p><strong>Cardiovascular Problems:</strong> Higher rates of heart disease, stroke, and high blood pressure.</p>
      <p><strong>Neurological Effects:</strong> Potential links to dementia, autism, and cognitive decline.</p>
      <p><strong>Pregnancy Complications:</strong> Low birth weight, premature birth, and developmental issues.</p>

      <p>Children and elderly individuals are particularly vulnerable, as their bodies are less able to cope with pollution stress. The economic cost of air pollution-related healthcare is estimated in the hundreds of billions globally.</p>

      <p>Protecting yourself involves monitoring air quality, using air purifiers indoors, wearing masks during high pollution days, and supporting policies that reduce emissions.</p>
    `,
    tags: ["Health", "Public Health", "Medical Research", "Prevention"],
  },
  {
    id: 6,
    title: "Green Transportation: Reducing Your Carbon Footprint",
    excerpt:
      "Practical tips for eco-friendly transportation choices that improve air quality.",
    category: "green-living",
    author: "Michael Green",
    date: "2024-01-03",
    readTime: "5 min read",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/85/Clean_mobility_instead_of_dirty_traffic.jpg",
    content: `
      <p>Transportation accounts for nearly 30% of greenhouse gas emissions worldwide. Making greener transportation choices is one of the most effective ways individuals can improve air quality in their communities.</p>

      <p>Here are practical strategies for reducing your transportation footprint:</p>

      <p><strong>Use Public Transportation:</strong> Buses and trains can reduce per-person emissions by up to 45% compared to driving alone.</p>
      <p><strong>Cycle or Walk:</strong> For trips under 3 miles, biking or walking eliminates emissions entirely while improving your health.</p>
      <p><strong>Carpool or Rideshare:</strong> Sharing rides reduces the number of vehicles on the road.</p>
      <p><strong>Electric Vehicles:</strong> EVs produce zero direct emissions and are becoming more affordable.</p>
      <p><strong>Remote Work:</strong> Working from home eliminates commuting emissions entirely.</p>

      <p>Small changes in transportation habits can have a significant cumulative impact on air quality, especially in urban areas where traffic is a major pollution source.</p>
    `,
    tags: [
      "Transportation",
      "Sustainability",
      "Carbon Footprint",
      "Green Living",
    ],
  },
];

// State variables
let currentPosts = [];
let filteredPosts = [];
let currentCategory = "all";
let postsPerLoad = 6;
let currentLoadIndex = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerToggle();
  setupCategoryFilters();
  setupSearch();
  setupModal();
  setupCreatePostModal();
  setupEditPostModal();
  setupPostActionsDropdown();
  setupDeleteConfirmationModal();
  loadInitialPosts();
});

// Setup hamburger menu toggle
function setupHamburgerToggle() {
  const hamburger = document.getElementById("hamburger-button");
  const navbarMenu = document.getElementById("navbar-menu");

  if (!hamburger || !navbarMenu) {
    console.error("Hamburger menu elements not found");
    return;
  }

  hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
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

// Setup category filters
function setupCategoryFilters() {
  const sortDropdown = document.getElementById("sort-dropdown");

  if (sortDropdown) {
    sortDropdown.addEventListener("change", () => {
      // Filter posts by category
      currentCategory = sortDropdown.value;
      filterPosts();
    });
  }
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById("blog-search");
  const searchButton = document.getElementById("search-button");

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterPosts(searchTerm);
  }

  searchButton.addEventListener("click", performSearch);

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Real-time search as user types
  searchInput.addEventListener("input", () => {
    setTimeout(performSearch, 300);
  });
}

// Filter posts based on category and search term
function filterPosts(searchTerm = "") {
  filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      currentCategory === "all" || post.category === currentCategory;
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    return matchesCategory && matchesSearch;
  });

  currentLoadIndex = 0;
  loadPosts();
}

// Load initial posts
function loadInitialPosts() {
  filteredPosts = [...blogPosts];
  loadPosts();
}

// Load and display posts
function loadPosts() {
  const blogGrid = document.getElementById("blog-grid");
  const loadMoreBtn = document.getElementById("load-more-btn");

  if (currentLoadIndex === 0) {
    blogGrid.innerHTML = "";
  }

  const endIndex = Math.min(
    currentLoadIndex + postsPerLoad,
    filteredPosts.length
  );
  const postsToShow = filteredPosts.slice(currentLoadIndex, endIndex);

  postsToShow.forEach((post) => {
    const postCard = createPostCard(post);
    blogGrid.appendChild(postCard);
  });

  currentLoadIndex = endIndex;

  // Show/hide load more button
  if (currentLoadIndex >= filteredPosts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }

  // Setup load more button
  loadMoreBtn.onclick = loadPosts;
}

// Create post card element
function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.onclick = () => openPostModal(post);

  card.innerHTML = `
    <div class="blog-image">
      <img src="${post.image}" alt="${post.title}" loading="lazy">
    </div>
    <div class="blog-content">
      <div class="blog-category">${getCategoryName(post.category)}</div>
      <h3 class="blog-title">${post.title}</h3>
      <p class="blog-excerpt">${post.excerpt}</p>
      <div class="blog-meta">
        <span class="blog-author">By ${post.author}</span>
        <div>
          <span class="blog-date">
            <i class="fas fa-calendar"></i> ${formatDate(post.date)}
          </span>
          <span class="blog-read-time">
            <i class="fas fa-clock"></i> ${post.readTime}
          </span>
        </div>
      </div>
    </div>
  `;

  return card;
}

// Get category display name
function getCategoryName(category) {
  const categoryNames = {
    "air-quality": "Air Quality",
    "green-living": "Green Living",
    "climate-change": "Climate Change",
    health: "Health",
    technology: "Technology",
  };
  return categoryNames[category] || category;
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Setup modal functionality
function setupModal() {
  const modal = document.getElementById("post-modal");
  const closeBtn = document.getElementById("close-modal");

  closeBtn.onclick = closePostModal;

  // Close modal when clicking outside content
  modal.onclick = (e) => {
    if (e.target === modal) {
      closePostModal();
    }
  };

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closePostModal();
    }
  });
}

// Setup post actions dropdown
function setupPostActionsDropdown() {
  const dropdownToggle = document.getElementById("post-actions-toggle");
  const dropdownMenu = document.getElementById("post-actions-menu");

  // Toggle dropdown
  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownToggle.classList.toggle("active");
    dropdownMenu.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !dropdownToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownToggle.classList.remove("active");
      dropdownMenu.classList.remove("show");
    }
  });

  // Handle dropdown item clicks
  document
    .getElementById("create-post-btn")
    .addEventListener("click", openCreatePostModal);
  document
    .getElementById("edit-post-btn")
    .addEventListener("click", openEditPostSelection);
  document
    .getElementById("delete-post-btn")
    .addEventListener("click", openDeletePostSelection);
}

// Setup create post modal functionality
function setupCreatePostModal() {
  const createModal = document.getElementById("create-post-modal");
  const closeCreateBtn = document.getElementById("close-create-modal");
  const cancelBtn = document.getElementById("cancel-create-post");
  const createForm = document.getElementById("create-post-form");

  // Close create post modal
  const closeCreateModal = () => {
    createModal.style.display = "none";
    document.body.style.overflow = "auto";
    createForm.reset();
  };

  closeCreateBtn.onclick = closeCreateModal;
  cancelBtn.onclick = closeCreateModal;

  // Close modal when clicking outside content
  createModal.onclick = (e) => {
    if (e.target === createModal) {
      closeCreateModal();
    }
  };

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && createModal.style.display === "block") {
      closeCreateModal();
    }
  });

  // Handle form submission
  createForm.onsubmit = (e) => {
    e.preventDefault();
    handleCreatePost(createForm);
    closeCreateModal();
  };
}

// Setup edit post modal functionality
function setupEditPostModal() {
  const editModal = document.getElementById("edit-post-modal");
  const closeEditBtn = document.getElementById("close-edit-modal");
  const cancelBtn = document.getElementById("cancel-edit-post");
  const editForm = document.getElementById("edit-post-form");

  // Close edit post modal
  const closeEditModal = () => {
    editModal.style.display = "none";
    document.body.style.overflow = "auto";
    editForm.reset();
  };

  closeEditBtn.onclick = closeEditModal;
  cancelBtn.onclick = closeEditModal;

  // Close modal when clicking outside content
  editModal.onclick = (e) => {
    if (e.target === editModal) {
      closeEditModal();
    }
  };

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && editModal.style.display === "block") {
      closeEditModal();
    }
  });

  // Handle form submission
  editForm.onsubmit = (e) => {
    e.preventDefault();
    handleEditPost(editForm);
    closeEditModal();
  };
}

// Setup delete confirmation modal functionality
function setupDeleteConfirmationModal() {
  const deleteModal = document.getElementById("delete-confirmation-modal");
  const cancelBtn = document.getElementById("delete-cancel-btn");
  const confirmBtn = document.getElementById("delete-confirm-btn");

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    deleteModal.style.display = "none";
    document.body.style.overflow = "auto";
    // Clear the stored post ID
    deleteModal.setAttribute("data-post-id", "");
  };

  cancelBtn.onclick = closeDeleteModal;

  // Handle delete confirmation
  confirmBtn.onclick = () => {
    const postId = parseInt(deleteModal.getAttribute("data-post-id"));
    if (postId) {
      // Find and remove the post
      const postIndex = blogPosts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1);
        filterPosts(); // Refresh the display
        showSuccessMessage("Post deleted successfully!");
      }
    }
    closeDeleteModal();
  };

  // Close modal when clicking outside content
  deleteModal.onclick = (e) => {
    if (e.target === deleteModal) {
      closeDeleteModal();
    }
  };

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && deleteModal.style.display === "block") {
      closeDeleteModal();
    }
  });
}

// Show delete confirmation modal
function showDeleteConfirmation(postId) {
  const deleteModal = document.getElementById("delete-confirmation-modal");

  // Store the post ID in the modal
  deleteModal.setAttribute("data-post-id", postId.toString());

  // Show modal
  deleteModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Open create post modal
function openCreatePostModal() {
  const createModal = document.getElementById("create-post-modal");
  const dropdownToggle = document.getElementById("post-actions-toggle");
  const dropdownMenu = document.getElementById("post-actions-menu");

  // Close dropdown
  dropdownToggle.classList.remove("active");
  dropdownMenu.classList.remove("show");

  // Open modal
  createModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Open edit post selection
function openEditPostSelection() {
  const dropdownToggle = document.getElementById("post-actions-toggle");
  const dropdownMenu = document.getElementById("post-actions-menu");

  // Close dropdown
  dropdownToggle.classList.remove("active");
  dropdownMenu.classList.remove("show");

  // Get user's posts (assuming current user is the author)
  const userPosts = blogPosts.filter(
    (post) => post.author === "Current User" || post.id > 6
  ); // Posts created by user

  if (userPosts.length === 0) {
    showSuccessMessage("You have no posts to edit. Create a post first!");
    return;
  }

  // Create selection modal
  showPostSelectionModal(userPosts, "edit", "Edit Post");
}

// Open delete post selection
function openDeletePostSelection() {
  const dropdownToggle = document.getElementById("post-actions-toggle");
  const dropdownMenu = document.getElementById("post-actions-menu");

  // Close dropdown
  dropdownToggle.classList.remove("active");
  dropdownMenu.classList.remove("show");

  // Get user's posts (assuming current user is the author)
  const userPosts = blogPosts.filter(
    (post) => post.author === "Current User" || post.id > 6
  ); // Posts created by user

  if (userPosts.length === 0) {
    showSuccessMessage("You have no posts to delete. Create a post first!");
    return;
  }

  // Create selection modal
  showPostSelectionModal(userPosts, "delete", "Delete Post");
}

// Show post selection modal for edit/delete
function showPostSelectionModal(posts, action, title) {
  // Create modal HTML
  const modalHTML = `
    <div class="post-selection-modal" id="post-selection-modal">
      <div class="modal-content">
        <span class="close-modal" onclick="closePostSelectionModal()">&times;</span>
        <div class="create-header">
          <h2>${title}</h2>
        </div>
        <div class="post-list">
          ${posts
            .map(
              (post) => `
            <div class="post-selection-item" onclick="handlePostAction('${action}', ${
                post.id
              })">
              <div class="post-item-info">
                <h4>${post.title}</h4>
                <p>Category: ${getCategoryName(
                  post.category
                )} | Date: ${formatDate(post.date)}</p>
              </div>
              <button class="action-btn ${action}-btn">
                <i class="fas fa-${action === "edit" ? "edit" : "trash"}"></i>
                ${action === "edit" ? "Edit" : "Delete"}
              </button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Add modal to page
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
    .post-selection-modal {
      display: block;
      position: fixed;
      z-index: 1001;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      overflow-y: auto;
    }
    .post-list {
      padding: 2rem;
      max-height: 400px;
      overflow-y: auto;
    }
    .post-selection-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid var(--border-light);
      border-radius: 8px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .post-selection-item:hover {
      background-color: var(--bg-light);
    }
    .post-item-info h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
    }
    .post-item-info p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .action-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .edit-btn {
      background-color: #f39c12;
      color: white;
    }
    .delete-btn {
      background-color: #e74c3c;
      color: white;
    }
  `;
  document.head.appendChild(style);

  document.body.style.overflow = "hidden";
}

// Close post selection modal
function closePostSelectionModal() {
  const modal = document.getElementById("post-selection-modal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

// Handle post action (edit/delete)
function handlePostAction(action, postId) {
  closePostSelectionModal();

  if (action === "edit") {
    // Find the post to edit
    const postToEdit = blogPosts.find((post) => post.id === postId);
    if (postToEdit) {
      openEditPostModal(postToEdit);
    }
  } else if (action === "delete") {
    // Show custom delete confirmation modal
    showDeleteConfirmation(postId);
  }
}

// Open edit post modal with pre-filled data
function openEditPostModal(post) {
  const editModal = document.getElementById("edit-post-modal");

  // Pre-fill the form with existing post data
  document.getElementById("edit-post-id").value = post.id;
  document.getElementById("edit-post-title").value = post.title;
  document.getElementById("edit-post-category").value = post.category;
  document.getElementById("edit-post-author").value = post.author;
  document.getElementById("edit-post-excerpt").value = post.excerpt;
  document.getElementById("edit-post-image").value = post.image;
  document.getElementById("edit-post-content").value = post.content
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "\n\n")
    .trim();
  document.getElementById("edit-post-tags").value = post.tags.join(", ");
  document.getElementById("edit-post-read-time").value = post.readTime;

  // Open modal
  editModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Handle editing an existing blog post
function handleEditPost(form) {
  const formData = new FormData(form);
  const postId = parseInt(formData.get("postId"));

  // Find the post to update
  const postIndex = blogPosts.findIndex((post) => post.id === postId);

  if (postIndex !== -1) {
    // Update the existing post
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      category: formData.get("category"),
      author: formData.get("author"),
      readTime: formData.get("readTime") || "5 min read",
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop",
      content: formatPostContent(formData.get("content")),
      tags: formData.get("tags")
        ? formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
        : [],
    };

    // Refresh the displayed posts
    filterPosts();

    // Show success message
    showSuccessMessage("Post updated successfully!");
  }
}

// Handle creating a new blog post
function handleCreatePost(form) {
  const formData = new FormData(form);

  // Get the highest existing ID and increment it
  const maxId = Math.max(...blogPosts.map((post) => post.id), 0);

  // Create new post object
  const newPost = {
    id: maxId + 1,
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    category: formData.get("category"),
    author: formData.get("author"),
    date: new Date().toISOString().split("T")[0], // Today's date
    readTime: formData.get("readTime") || "5 min read",
    image:
      formData.get("image") ||
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=200&fit=crop",
    content: formatPostContent(formData.get("content")),
    tags: formData.get("tags")
      ? formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim())
      : [],
  };

  // Add the new post to the beginning of the array
  blogPosts.unshift(newPost);

  // Refresh the displayed posts
  filterPosts();

  // Show success message
  showSuccessMessage("Post created successfully!");
}

// Format post content to add paragraph tags
function formatPostContent(content) {
  return content
    .split("\n\n")
    .filter((paragraph) => paragraph.trim())
    .map((paragraph) => `<p>${paragraph.trim()}</p>`)
    .join("\n\n");
}

// Show success message
function showSuccessMessage(message) {
  // Create a temporary success message element
  const successDiv = document.createElement("div");
  successDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--primary-green);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1002;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  successDiv.textContent = message;

  // Add animation keyframes
  if (!document.getElementById("success-animation-style")) {
    const style = document.createElement("style");
    style.id = "success-animation-style";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(successDiv);

  // Remove the message after 3 seconds
  setTimeout(() => {
    successDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 300);
  }, 3000);
}

// Open post modal
function openPostModal(post) {
  const modal = document.getElementById("post-modal");

  // Populate modal content
  document.getElementById("modal-category").textContent = getCategoryName(
    post.category
  );
  document.getElementById("modal-title").textContent = post.title;
  document.getElementById("modal-author").textContent = `By ${post.author}`;
  document.getElementById("modal-date").textContent = formatDate(post.date);
  document.getElementById("modal-read-time").textContent = post.readTime;
  document.getElementById("modal-post-image").src = post.image;
  document.getElementById("modal-post-image").alt = post.title;
  document.getElementById("modal-content-text").innerHTML = post.content;

  // Populate tags
  const tagsContainer = document.getElementById("modal-tags");
  tagsContainer.innerHTML = post.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  // Show modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close post modal
function closePostModal() {
  const modal = document.getElementById("post-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Share post function
function sharePost() {
  const title = document.getElementById("modal-title").textContent;
  const url = window.location.href;

  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .catch(console.error);
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Post URL copied to clipboard!");
      })
      .catch(() => {
        alert("Unable to share. Please copy the URL manually.");
      });
  }
}

// Like post function
function likePost() {
  const likeBtn = document.querySelector(".like-btn");
  const icon = likeBtn.querySelector("i");

  if (icon.classList.contains("fas")) {
    icon.classList.remove("fas");
    icon.classList.add("far");
    likeBtn.innerHTML = '<i class="far fa-heart"></i> Like';
  } else {
    icon.classList.remove("far");
    icon.classList.add("fas");
    likeBtn.innerHTML = '<i class="fas fa-heart"></i> Liked';
    likeBtn.style.background = "#e74c3c";
  }
}

// Scroll to top when page loads
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

//setting module

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
