import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./floatingCart.css";

const CART_STORAGE_KEY = "ak-aqua-cart";
const WHATSAPP_PHONE_NUMBER = "918977304704"; // Configured business number from Contact.jsx

const getSavedCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const formatPrice = (price) => {
  const num = Number(price);
  return Number.isNaN(num) || price === null || price === ""
    ? null
    : `₹${num.toLocaleString("en-IN")}`;
};

export default function FloatingCart() {
  const [cart, setCart] = useState(getSavedCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Listen for cart changes (from Collection.jsx, Plants&Accessories.jsx, and Cart.jsx)
  useEffect(() => {
    const handleCartUpdated = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        setCart(event.detail);
      } else {
        setCart(getSavedCart());
      }
    };

    const handleStorageChange = (event) => {
      if (event.key === CART_STORAGE_KEY) {
        setCart(getSavedCart());
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Track scroll on Home page to show cart only from Collection section onwards
  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/home") {
      setIsPastHero(true);
      return;
    }

    const checkScroll = () => {
      // Find collection section on homepage
      const collectionSection =
        document.getElementById("fish-collection") ||
        document.getElementById("collection");

      if (collectionSection) {
        const rect = collectionSection.getBoundingClientRect();
        // Visible when collection top enters the viewport
        setIsPastHero(rect.top <= window.innerHeight * 0.75);
      } else {
        // Fallback: If hero is typically ~500-700px high
        setIsPastHero(window.scrollY > 450);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [location.pathname]);

  // Hide completely on Cart page and Admin panel
  const isExcludedPage =
    location.pathname === "/cart" || location.pathname === "/admin";
  const shouldShow = !isExcludedPage && isPastHero;

  const updateCartAndNotify = (newCart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: newCart })
    );
  };

  const updateQuantity = (id, delta) => {
    const updated = cart
      .map((item) => {
        if (String(item.id) === String(id)) {
          const newQty = (Number(item.quantity) || 1) + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    updateCartAndNotify(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => String(item.id) !== String(id));
    updateCartAndNotify(updated);
  };

  const clearCart = () => {
    updateCartAndNotify([]);
  };

  const totalItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  }, [cart]);

  const { totalPrice, hasUnpricedItems } = useMemo(() => {
    let sum = 0;
    let unpriced = false;
    cart.forEach((item) => {
      const priceNum = Number(item.price);
      const qty = Number(item.quantity) || 1;
      if (item.price !== null && item.price !== "" && !Number.isNaN(priceNum)) {
        sum += priceNum * qty;
      } else {
        unpriced = true;
      }
    });
    return { totalPrice: sum, hasUnpricedItems: unpriced };
  }, [cart]);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message =
      "Hello AK Aqua Telugu! I would like to enquire about/order these items:\n\n";

    cart.forEach((item, index) => {
      const qty = Number(item.quantity) || 1;
      const formatted = formatPrice(item.price);
      message += `${index + 1}. *${item.name || "Item"}* x ${qty}`;
      if (formatted) {
        message += ` - ${formatted} each`;
      }
      message += "\n";
    });

    message += `\n*Total Items:* ${totalItemCount}\n`;
    if (totalPrice > 0) {
      message += `*Estimated Subtotal:* ₹${totalPrice.toLocaleString("en-IN")}\n`;
    }
    if (hasUnpricedItems) {
      message += `_(Note: Final price will be confirmed on WhatsApp)_\n`;
    }

    message += "\nPlease confirm availability and shipping details.";

    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        className="ak-floating-cart-btn"
        onClick={() => setIsOpen(true)}
        aria-label="View Shopping Cart"
      >
        <span className="ak-floating-cart-icon" aria-hidden="true">
          🛒
        </span>
        {totalItemCount > 0 && (
          <span className="ak-floating-cart-badge">{totalItemCount}</span>
        )}
      </button>

      {/* Slide-out Backdrop & Drawer */}
      {isOpen && (
        <div className="ak-cart-backdrop" onClick={() => setIsOpen(false)}>
          <aside
            className="ak-cart-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Your Cart"
          >
            <div className="ak-cart-drawer-header">
              <div className="ak-cart-drawer-title">
                <span className="ak-cart-title-eyebrow">AK AQUA TELUGU</span>
                <h3>Shopping Cart ({totalItemCount})</h3>
              </div>
              <button
                type="button"
                className="ak-cart-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="ak-cart-drawer-body">
              {cart.length === 0 ? (
                <div className="ak-cart-empty">
                  <span className="ak-cart-empty-icon" aria-hidden="true">
                    ◌
                  </span>
                  <p>Your cart is empty.</p>
                  <small>
                    Add items from the collection or plants & accessories.
                  </small>
                </div>
              ) : (
                <div className="ak-cart-item-list">
                  {cart.map((item) => (
                    <div key={item.id} className="ak-cart-item">
                      <div className="ak-cart-item-main">
                        <h4>{item.name || "Aquarium Product"}</h4>
                        <span className="ak-cart-item-price">
                          {formatPrice(item.price) || "Price on request"}
                        </span>
                      </div>

                      <div className="ak-cart-item-controls">
                        <div className="ak-cart-qty-pill">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="ak-cart-delete-btn"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="ak-cart-drawer-footer">
                <div className="ak-cart-subtotal-row">
                  <span>Estimated Total</span>
                  <strong>
                    {totalPrice > 0
                      ? `₹${totalPrice.toLocaleString("en-IN")}`
                      : "Price on request"}
                  </strong>
                </div>

                <button
                  type="button"
                  className="ak-cart-whatsapp-btn"
                  onClick={handleWhatsAppCheckout}
                >
                  <span className="ak-whatsapp-icon" aria-hidden="true">
                    💬
                  </span>
                  Enquire / Order on WhatsApp
                </button>

                <div className="ak-cart-secondary-actions">
                  <button
                    type="button"
                    className="ak-cart-view-page-btn"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/cart");
                    }}
                  >
                    View Full Cart Page
                  </button>

                  <button
                    type="button"
                    className="ak-cart-clear-btn"
                    onClick={clearCart}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}