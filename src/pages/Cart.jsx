import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CART_STORAGE_KEY = "ak-aqua-cart";
const WHATSAPP_NUMBER = "918977304704"; // Verified AK Aqua Telugu phone number from Contact.jsx

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

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(getSavedCart);

  // Sync cart state across all components and windows
  useEffect(() => {
    const handleCartUpdated = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        setItems(event.detail);
      } else {
        setItems(getSavedCart());
      }
    };

    const handleStorageChange = (event) => {
      if (event.key === CART_STORAGE_KEY) {
        setItems(getSavedCart());
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateCartAndNotify = (newCart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    setItems(newCart);
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: newCart })
    );
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;

    const updated = items.map((item) =>
      String(item.id) === String(id) ? { ...item, quantity: newQty } : item
    );

    updateCartAndNotify(updated);
  };

  const removeFromCart = (id) => {
    const updated = items.filter((item) => String(item.id) !== String(id));
    updateCartAndNotify(updated);
  };

  const clearCart = () => {
    updateCartAndNotify([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  }, [items]);

  const { totalPrice, hasUnpricedItems } = useMemo(() => {
    let sum = 0;
    let unpriced = false;
    items.forEach((item) => {
      const priceNum = Number(item.price);
      const qty = Number(item.quantity) || 1;
      if (item.price !== null && item.price !== "" && !Number.isNaN(priceNum)) {
        sum += priceNum * qty;
      } else {
        unpriced = true;
      }
    });
    return { totalPrice: sum, hasUnpricedItems: unpriced };
  }, [items]);

  // Navigate to Home section or direct page
  const goToSection = (sectionId) => {
    navigate("/", {
      state: { scrollToSection: sectionId },
    });
  };

  const handleEnquiry = () => {
    if (!items.length) return;

    const productDetails = items
      .map((item, index) => {
        const qty = Number(item.quantity) || 1;
        const formatted = formatPrice(item.price);
        return (
          `${index + 1}. *${item.name || "Item"}*\n` +
          `   Quantity: ${qty}\n` +
          `   Price: ${formatted ? `${formatted} each` : "Price on request"}`
        );
      })
      .join("\n\n");

    let message =
      `Hello AK Aqua Telugu! I would like to enquire about these products:\n\n` +
      `${productDetails}\n\n` +
      `Total items: ${totalItems}\n`;

    if (totalPrice > 0) {
      message += `Estimated total: ₹${totalPrice.toLocaleString("en-IN")}\n\n`;
    } else {
      message += `\n`;
    }

    if (hasUnpricedItems) {
      message += `(Note: Please confirm prices for items listed on request)\n\n`;
    }

    message += `Please confirm availability and delivery details.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="cart-page">
      <div className="cart-container">
        <header className="cart-heading">
          <p className="cart-eyebrow">AK AQUA TELUGU</p>
          <h1>Your Shopping Cart</h1>
          <p>Review your selected fishes, plants and accessories.</p>
        </header>

        {items.length === 0 ? (
          <section className="cart-empty">
            <div className="cart-empty-icon" aria-hidden="true">
              ♧
            </div>

            <h2>Your cart is empty</h2>
            <p>Add products from the collection or plants and accessories.</p>

            <div className="cart-empty-actions">
              <button
                type="button"
                className="cart-primary-button"
                onClick={() => goToSection("collection")}
              >
                Explore Fishes
              </button>

              <button
                type="button"
                className="cart-secondary-button"
                onClick={() => goToSection("plants-accessories")}
              >
                Plants &amp; Accessories
              </button>
            </div>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items-panel">
              <div className="cart-items-header">
                <h2>Selected Products ({totalItems})</h2>

                <button
                  type="button"
                  className="cart-clear-button"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              </div>

              <div className="cart-items-list">
                {items.map((item) => {
                  const itemImage =
                    item.image_url || item.image || item.imageUrl || "";

                  return (
                    <article className="cart-item" key={item.id}>
                      <div className="cart-item-image">
                        {itemImage ? (
                          <img
                            src={itemImage}
                            alt={item.name || "Product"}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </div>

                      <div className="cart-item-details">
                        <h3>{item.name || "Unnamed Product"}</h3>

                        <p className="cart-item-price">
                          {formatPrice(item.price) || "Price on request"}
                        </p>

                        <div className="cart-item-actions">
                          <div
                            className="cart-quantity"
                            aria-label={`Quantity for ${item.name}`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, (Number(item.quantity) || 1) - 1)
                                )
                              }
                              aria-label="Decrease quantity"
                              disabled={(Number(item.quantity) || 1) <= 1}
                            >
                              −
                            </button>

                            <span>{item.quantity || 1}</span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (Number(item.quantity) || 1) + 1
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="cart-remove-button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-subtotal">
                        {item.price !== null &&
                        item.price !== undefined &&
                        item.price !== "" &&
                        !Number.isNaN(Number(item.price))
                          ? `₹${(
                              Number(item.price) * (Number(item.quantity) || 1)
                            ).toLocaleString("en-IN")}`
                          : "On request"}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="cart-summary-row">
                <span>Total products</span>
                <span>{totalItems}</span>
              </div>

              <div className="cart-summary-row">
                <span>Estimated total</span>
                <strong>
                  {totalPrice > 0
                    ? `₹${totalPrice.toLocaleString("en-IN")}`
                    : "Price on request"}
                </strong>
              </div>

              <p className="cart-summary-note">
                This is an enquiry, not an automated payment. Availability,
                delivery and final pricing will be confirmed on WhatsApp.
              </p>

              <button
                type="button"
                className="cart-whatsapp-button"
                onClick={handleEnquiry}
              >
                Enquire on WhatsApp
              </button>

              <button
                type="button"
                className="cart-continue-link"
                onClick={() => goToSection("collection")}
              >
                Continue shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}