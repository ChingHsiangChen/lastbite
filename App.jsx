import React, { useEffect, useMemo, useState } from "react";

const TAX_RATE = 0.08875; // 8.875%
const API = "https://lastbite-backend.onrender.com";

const SLIDER_IMAGES = [
  { src: "/Food/duck.jpeg", alt: "Peking Duck" },
  { src: "/Food/Mapo Tofu.jpeg", alt: "Mapo Tofu" },
  { src: "/Food/Noodles.jpeg", alt: "Beef Noodles" },
  { src: "/Food/porkbun.jpeg", alt: "Steamed Pork Buns" },
  { src: "/Food/seafood.jpeg", alt: "Seafood Platter" },
  { src: "/Food/shumai.jpeg", alt: "Shumai Dumplings" },
];

// ---------------------
// SMALL REUSABLE PIECES
// ---------------------

function Header({ cartCount, onCartOpen }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`bg-dark text-light sticky-top shadow-sm d-flex align-items-center justify-content-between px-3 py-2 ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <img
          src="/logo.png"
          alt="LastBite Logo"
          style={{ width: 26, height: 26, objectFit: "contain" }}
        />
        <span className="fw-bold text-warning fs-4">LastBite</span>
      </div>

      <nav className="d-none d-md-flex gap-3">
        <a href="#home" className="text-warning text-decoration-none">
          Home
        </a>
        <a href="#menu" className="text-warning text-decoration-none">
          Menu
        </a>
        <a href="#about" className="text-warning text-decoration-none">
          About
        </a>
        <a href="#contact" className="text-warning text-decoration-none">
          Contact
        </a>
      </nav>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-warning rounded-pill fw-bold cart-toggle"
          onClick={onCartOpen}
        >
          Your Cart{" "}
          <span id="cart-count" className="badge bg-dark text-light ms-1">
            {cartCount}
          </span>
        </button>

        <button
          className="btn btn-outline-warning d-md-none hamburger"
          onClick={() => setNavOpen(!navOpen)}
        >
          ☰
        </button>
      </div>

      {navOpen && (
        <nav 
          className="navbar bg-dark position-absolute top-100 start-0 w-100 d-md-none py-2 px-3"
          style={{ zIndex: 10000 }}
        >
          <a
            href="#home"
            className="d-block text-warning text-decoration-none mb-1"
            onClick={() => setNavOpen(false)}
          >
            Home
          </a>
          <a
            href="#menu"
            className="d-block text-warning text-decoration-none mb-1"
            onClick={() => setNavOpen(false)}
          >
            Menu
          </a>
          <a
            href="#about"
            className="d-block text-warning text-decoration-none mb-1"
            onClick={() => setNavOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="d-block text-warning text-decoration-none mb-1"
            onClick={() => setNavOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero position-relative text-center" style={{ marginTop: '60px' }}>
      <img
        src="/hero.jpeg"
        alt="Restaurant Interior"
        style={{
          width: "100%",
          height: "600px",
          objectFit: "cover",
          filter: "brightness(80%)",
        }}
      />
      <div
        className="hero-text position-absolute top-50 start-50 translate-middle text-light px-4 py-3 rounded-3"
        style={{ background: "rgba(0,0,0,0.45)" }}
      >
        <h1>Welcome to LastBite!!!</h1>
      </div>
    </section>
  );
}

function MenuTable({ title, items, onAdd }) {
  return (
    <>
      <h2 className="mt-5">{title}</h2>
      <table className="menu-table table table-bordered table-hover mx-auto">
        <thead>
          <tr>
            <th>Dish</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item._id}
              className="clickable-row"
              onClick={() => onAdd(item._id)}
            >
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                ${Number(item.price).toFixed(2)}
                <span
                  style={{
                    color: "#f8b400",
                    fontWeight: 700,
                    marginLeft: 8,
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(item._id);
                  }}
                >
                  + Add
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Slider() {
  const [index, setIndex] = useState(0);

  const goNext = () => setIndex((i) => (i + 1) % SLIDER_IMAGES.length);
  const goPrev = () =>
    setIndex((i) => (i - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);

  return (
    <div
      className="slider-container position-relative mx-auto mt-5"
      style={{
        maxWidth: 850,
        height: 500,
        overflow: "hidden",
      }}
    >
      <button className="prev-btn" onClick={goPrev}>
        &#10094;
      </button>

      <div
        className="slider"
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {SLIDER_IMAGES.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",
              flexShrink: 0,
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
      </div>

      <button className="next-btn" onClick={goNext}>
        &#10095;
      </button>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="about text-center py-5">
      <h2>About LastBite</h2>
      <p>
        Welcome to <strong>LastBite</strong>, where the timeless traditions of
        Chinese and Japanese cuisine come together under one roof.
      </p>
      <p>
        At <strong>LastBite</strong>, dining is more than just a meal — it's an
        experience rooted in culture and craftsmanship.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact text-center py-5">
      <h2>Find Us</h2>
      <div className="map-container mx-auto" style={{ maxWidth: 900 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.946245294236!2d-73.98513508459472!3d40.75889677932616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25854cfa83933%3A0xd0f1e82639d58e4f!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1701902468449!5m2!1sen!2sus"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          title="LastBite Location"
        />
      </div>
      <div className="contact-info mt-3">
        <h3>Contact Information</h3>
        <p>
          <strong>Address:</strong> 11 W 32nd Street, New York, NY 10001
        </p>
        <p>
          <strong>Phone:</strong> (340) 555-8888
        </p>
        <p>
          <strong>Email:</strong> EatWithUs123@lastbite.com
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="text-center py-4"
      style={{ background: "#2c2c2c", color: "#fff" }}
    >
      <p>Follow us:</p>
      <div className="social-icons d-flex justify-content-center gap-3">
        <a
          href="https://www.pinterest.com/search/pins/?q=chinese%20food&rs=typed"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/fb.png"
            alt="Facebook"
            style={{
              width: 32,
              height: 32,
              filter: "brightness(0) invert(1)",
            }}
          />
        </a>
        <a
          href="https://www.pinterest.com/search/pins/?q=chinese%20food&rs=typed"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/insta.png"
            alt="Instagram"
            style={{
              width: 32,
              height: 32,
              filter: "brightness(0) invert(1)",
            }}
          />
        </a>
      </div>
      <p>Open Everyday: 10 AM – 10 PM</p>
    </footer>
  );
}

// ... (Keep all previous code until CartPanel function)

function CartPanel({
  open,
  cart,
  onClose,
  onClear,
  onChangeQty,
  onRemove,
  onCheckout,
}) {
  const subtotal = cart.reduce((acc, i) => acc + i.qty * i.price, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleEscape);
      setTimeout(() => {
        const closeBtn = document.getElementById('close-cart');
        if (closeBtn) closeBtn.focus();
      }, 100);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Add overlay click handler
  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (open && e.target.classList.contains('cart-overlay')) {
        onClose();
      }
    };

    document.addEventListener('click', handleOverlayClick);
    return () => document.removeEventListener('click', handleOverlayClick);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="cart-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1199,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Cart Panel */}
      <aside
        id="cart-panel"
        className={`cart-panel ${open ? "open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-100%",
          width: "min(420px, 100vw)",
          height: "100vh",
          height: "100dvh",
          background: "#fff",
          boxShadow: "-4px 0 18px rgba(0,0,0,.25)",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
          transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div
          className="cart-header d-flex justify-content-between align-items-center px-3 py-2"
          style={{ background: "#2c2c2c", color: "#fff" }}
        >
          <h3 id="cart-title" className="m-0">Your Cart</h3>
          <button
            id="close-cart"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
              padding: "0 8px",
            }}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div
          id="cart-items"
          className="cart-items px-3 py-2"
          style={{ 
            overflowY: "auto", 
            flex: 1,
            maxHeight: "calc(100vh - 180px)"
          }}
        >
          {cart.length === 0 ? (
            <p className="empty text-muted text-center py-5">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={String(item.menuItem)}
                className="cart-item"
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="ci-name fw-semibold">{item.name}</div>
                  <button
                    className="remove-btn btn btn-sm btn-outline-danger"
                    onClick={() => onRemove(item.menuItem)}
                    aria-label={`Remove ${item.name} from cart`}
                    style={{
                      padding: "2px 6px",
                      fontSize: "12px",
                    }}
                  >
                    🗑
                  </button>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted">
                    ${Number(item.price).toFixed(2)} each
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="ci-controls d-flex align-items-center border rounded-pill">
                      <button
                        className="qty-btn btn btn-sm"
                        onClick={() => onChangeQty(item.menuItem, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: '4px 10px',
                          fontSize: '16px',
                          lineHeight: '1',
                          color: '#333'
                        }}
                      >
                        −
                      </button>
                      <span 
                        className="qty fw-bold px-2" 
                        style={{ 
                          minWidth: '30px', 
                          textAlign: 'center',
                          fontSize: '16px'
                        }}
                      >
                        {item.qty}
                      </span>
                      <button
                        className="qty-btn btn btn-sm"
                        onClick={() => onChangeQty(item.menuItem, +1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: '4px 10px',
                          fontSize: '16px',
                          lineHeight: '1',
                          color: '#333'
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="ci-total fw-bold ms-3" style={{ minWidth: '70px', textAlign: 'right' }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer px-3 py-3 border-top" style={{ background: '#f8f9fa' }}>
          <div id="cart-total" className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>Tax (8.875%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 pt-2 border-top">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="cart-actions d-flex gap-2">
            <button
              id="clear-cart"
              className="btn btn-outline-secondary flex-grow-1"
              onClick={onClear}
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>

            <button
              className="btn btn-warning flex-grow-1"
              onClick={onCheckout}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ... (Keep the rest of the App component code the same as in previous fix)

// ---------------------
// MAIN APP
// ---------------------

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const [menu, setMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState([]);

  // Load menu
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setMenuLoading(true);
        setMenuError("");

        const res = await fetch(`${API}/api/menu`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Menu fetch failed: ${res.status} ${text}`);
        }

        const data = await res.json();
        if (!alive) return;

        setMenu(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("MENU LOAD ERROR:", err);
        if (!alive) return;
        setMenu([]);
        setMenuError(err?.message || "Failed to load menu");
      } finally {
        if (!alive) return;
        setMenuLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // Cart init/load
  useEffect(() => {
    (async () => {
      try {
        let id = localStorage.getItem("lastbite_cart_id");

        if (!id) {
          const response = await fetch(`${API}/api/carts`, {
            method: "POST",
          });
          
          if (!response.ok) {
            throw new Error("Failed to create cart");
          }
          
          const created = await response.json();
          id = created._id;
          localStorage.setItem("lastbite_cart_id", id);
        }

        setCartId(id);

        // Load cart data
        const response = await fetch(`${API}/api/carts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to load cart");
        }
        
        const cartData = await response.json();
        setCart(cartData.items || []);
      } catch (err) {
        console.error("Cart initialization error:", err);
      }
    })();
  }, []);

  const appetizers = useMemo(
    () => menu.filter((i) => String(i.category) === "appetizer"),
    [menu]
  );
  const entrees = useMemo(
    () => menu.filter((i) => String(i.category) === "entree"),
    [menu]
  );
  const desserts = useMemo(
    () => menu.filter((i) => String(i.category) === "dessert"),
    [menu]
  );

  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  async function addToCart(menuItemId) {
    if (!cartId) return;

    try {
      const response = await fetch(`${API}/api/carts/${cartId}/items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId, qtyDelta: 1 }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Add to cart failed:", error);
        return;
      }

      const updated = await response.json();
      setCart(updated.items || []);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  }

  // In the App component, replace the changeQty function with this improved version:

async function changeQty(menuItemId, delta) {
  if (!cartId) return;

  try {
    // Use strict string comparison for IDs
    const existingItem = cart.find(item => 
      String(item.menuItem) === String(menuItemId)
    );
    
    // If item doesn't exist and we're trying to decrease, do nothing
    if (!existingItem && delta < 0) {
      console.log("Item not found for decreasing quantity");
      return;
    }
    
    console.log("Changing quantity for:", menuItemId, "delta:", delta, "current qty:", existingItem?.qty);
    
    // If quantity would go to 0 or less, remove the item instead
    if (existingItem && existingItem.qty + delta <= 0) {
      console.log("Removing item instead (qty would be 0 or less)");
      await removeItem(menuItemId);
      return;
    }

    const response = await fetch(`${API}/api/carts/${cartId}/items`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        menuItemId: String(menuItemId), 
        qtyDelta: delta 
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Change quantity failed:", error);
      alert("Failed to update quantity. Please try again.");
      return;
    }

    const updated = await response.json();
    console.log("Updated cart:", updated);
    setCart(updated.items || []);
  } catch (err) {
    console.error("Change quantity error:", err);
    alert("Error updating quantity. Please try again.");
  }
}

  async function removeItem(menuItemId) {
    if (!cartId) return;

    try {
      const response = await fetch(
        `${API}/api/carts/${cartId}/items/${menuItemId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Remove item failed:", error);
        return;
      }

      const updated = await response.json();
      setCart(updated.items || []);
    } catch (err) {
      console.error("Remove item error:", err);
    }
  }

  async function clearCart() {
    if (!cartId) return;

    try {
      const response = await fetch(`${API}/api/carts/${cartId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error("Clear cart failed:", error);
        return;
      }

      const updated = await response.json();
      setCart(updated.items || []);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  }

  async function checkout() {
    if (!cartId) return;

    try {
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        alert(err.message || "Checkout failed");
        return;
      }

      const order = await response.json();
      alert(`Order placed! Total: $${Number(order.total).toFixed(2)}`);

      await clearCart();
      setCartOpen(false);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <div style={{ backgroundColor: "#f5f0e6", minHeight: "100vh", paddingTop: '60px' }}>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero />

      <main id="menu" className="menu text-center py-5">
        {menuLoading && <p className="text-muted">Loading menu…</p>}
        {!menuLoading && menuError && (
          <p className="text-danger">
            Menu failed to load: {menuError}
          </p>
        )}

        {!menuLoading && !menuError && menu.length === 0 && (
          <p className="text-muted">
            Menu is empty. (Seed the database, then refresh.)
          </p>
        )}

        <MenuTable title="Appetizers" items={appetizers} onAdd={addToCart} />
        <MenuTable title="Entrees" items={entrees} onAdd={addToCart} />
        <MenuTable title="Desserts" items={desserts} onAdd={addToCart} />

        <Slider />
      </main>

      <About />
      <Contact />
      <Footer />

      <CartPanel
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onClear={clearCart}
        onChangeQty={changeQty}
        onRemove={removeItem}
        onCheckout={checkout}
      />
    </div>
  );
}