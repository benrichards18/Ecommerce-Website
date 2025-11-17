const deals = [
  {
    name: "Plasma TV Set",
    price: 567.99,
    original: 697.0,
    discount: "15% off",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smartphone Pro",
    price: 101.99,
    original: 150.0,
    discount: "30% off",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Appliances Bundle",
    price: 42.0,
    original: 60.0,
    discount: "18% off",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Photo & Video Kit",
    price: 320.0,
    original: 400.0,
    discount: "10% off",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1478298014878-50d21ef46704?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Next-gen Console",
    price: 85.0,
    original: 120.0,
    discount: "15% off",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smart AC",
    price: 52.0,
    original: 80.0,
    discount: "12% off",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1582719478193-3d00e8df1d39?auto=format&fit=crop&w=600&q=80",
  },
];

const dealsGrid = document.getElementById("dealsGrid");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const yearElement = document.getElementById("year");

const renderDeals = (items) => {
  dealsGrid.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <h3>${item.name}</h3>
      <p class="price">$${item.price.toFixed(2)} <del>$${item.original.toFixed(
      2
    )}</del></p>
      <p class="discount">${item.discount}</p>
      <div class="card__footer">
        <span>⭐ ${item.rating.toFixed(1)}</span>
        <button class="primary-btn add-cart" data-index="${index}">
          Add to cart
        </button>
      </div>
    `;
    dealsGrid.appendChild(card);
  });
};

renderDeals(deals);

dealsGrid.addEventListener("click", (event) => {
  if (event.target.closest(".add-cart")) {
    const count = Number(cartCount.textContent) + 1;
    cartCount.textContent = count;
  }
});

const filterDeals = () => {
  const query = searchInput.value.toLowerCase();
  const filtered = deals.filter((deal) =>
    deal.name.toLowerCase().includes(query)
  );
  renderDeals(filtered);
};

searchBtn.addEventListener("click", filterDeals);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    filterDeals();
  }
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterEmail.value.trim()) return;

  alert(
    `Thanks for subscribing! Check your inbox at ${newsletterEmail.value.trim()}`
  );
  newsletterEmail.value = "";
});

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Navigation Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (targetId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Login Modal Functionality
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const loginLink = document.getElementById('loginLink');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('loginForm');

const openModal = () => {
  loginModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeModalFunc = () => {
  loginModal.classList.remove('active');
  document.body.style.overflow = '';
};

if (loginBtn) {
  loginBtn.addEventListener('click', openModal);
}

if (loginLink) {
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
}

if (closeModal) {
  closeModal.addEventListener('click', closeModalFunc);
}

// Close modal when clicking outside
if (loginModal) {
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModalFunc();
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && loginModal.classList.contains('active')) {
    closeModalFunc();
  }
});

// Login Form Submission
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
      alert(`Welcome back! Logged in as ${email}`);
      closeModalFunc();
      loginForm.reset();
    }
  });
}

// Register Link (toggle to register form - simplified)
const registerLink = document.getElementById('registerLink');
if (registerLink) {
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    const modalContent = loginModal.querySelector('.modal-content');
    const formTitle = modalContent.querySelector('h2');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    if (formTitle && submitBtn) {
      if (formTitle.textContent.includes('Login')) {
        formTitle.textContent = 'Create Account';
        submitBtn.textContent = 'Register';
        registerLink.textContent = 'Already have an account? Login here';
      } else {
        formTitle.textContent = 'Login / Register';
        submitBtn.textContent = 'Login';
        registerLink.textContent = "Don't have an account? Register here";
      }
    }
  });
}

// View All Button
const viewAllBtn = document.getElementById('viewAllBtn');
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', () => {
    window.scrollTo({
      top: document.getElementById('shop').offsetTop - 100,
      behavior: 'smooth'
    });
    // Show all products (already showing all, but could expand here)
    alert('Showing all products!');
  });
}

// Category Cards Click Handler
document.querySelectorAll('.category-card.clickable').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    window.scrollTo({
      top: document.getElementById('shop').offsetTop - 100,
      behavior: 'smooth'
    });
    // Filter products by category (simplified - just show alert)
    setTimeout(() => {
      alert(`Showing ${category} products!`);
    }, 500);
  });
});

// Blog Links
document.querySelectorAll('.blog-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const blogId = link.getAttribute('data-blog');
    const blogTitles = {
      'tech-gadgets': 'Top 10 Tech Gadgets of 2025',
      'smart-home': 'Smart Home Setup Guide',
      'gaming': 'Gaming Console Comparison'
    };
    alert(`Reading: ${blogTitles[blogId]}\n\nThis is a demo. In a real application, this would open the full blog post.`);
  });
});

// Page Links
document.querySelectorAll('.page-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    const pageInfo = {
      'about': 'About Us: StyleAura is your trusted partner for premium electronics and lifestyle accessories.',
      'contact': 'Contact Us:\nEmail: support@styleaura.com\nPhone: +1 (555) 123-4567\nHours: 24/7 Support Available',
      'faq': 'Frequently Asked Questions:\n\nQ: What is your return policy?\nA: 90 days return policy for all items.\n\nQ: Do you offer free shipping?\nA: Yes, free shipping on orders over $50.'
    };
    alert(pageInfo[page] || 'Page information coming soon!');
  });
});

// Action Links (Topbar)
document.querySelectorAll('.action-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const action = link.getAttribute('data-action');
    const actionInfo = {
      'sell': 'Sell on StyleAura:\n\nJoin thousands of sellers on StyleAura! Contact us at sellers@styleaura.com to get started.',
      'track': 'Track Your Order:\n\nEnter your order number to track your shipment. This feature will be available soon!',
      'currency': 'Currency: US Dollar selected. Other currencies coming soon!',
      'language': 'Language: English selected. Other languages coming soon!'
    };
    alert(actionInfo[action] || 'Feature coming soon!');
  });
});

// Footer Links
document.querySelectorAll('.footer-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    const action = link.getAttribute('data-action');
    
    if (page) {
      const pageInfo = {
        'help': 'Help Center:\n\nVisit our help center for guides, tutorials, and support articles.',
        'returns': 'Returns & Refunds:\n\n90 days return policy. Full refund if item is returned in original condition.',
        'about': 'About Us:\n\nStyleAura - Your trusted e-commerce platform for premium products.',
        'careers': 'Careers:\n\nJoin our team! Visit careers@styleaura.com to see open positions.',
        'press': 'Press:\n\nFor media inquiries, contact press@styleaura.com'
      };
      alert(pageInfo[page] || 'Page information coming soon!');
    } else if (action === 'track') {
      alert('Track Your Order:\n\nEnter your order number to track your shipment. This feature will be available soon!');
    }
  });
});

// Wishlist Button
const wishlistBtn = document.getElementById('wishlistBtn');
if (wishlistBtn) {
  wishlistBtn.addEventListener('click', () => {
    alert('Wishlist:\n\nYour wishlist is empty. Add items to your wishlist to save them for later!');
  });
}

// Cart Button
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    const cartCount = document.getElementById('cartCount').textContent;
    if (cartCount === '0') {
      alert('Your cart is empty. Start shopping to add items!');
    } else {
      alert(`Cart:\n\nYou have ${cartCount} item(s) in your cart. Proceed to checkout!`);
    }
  });
}

