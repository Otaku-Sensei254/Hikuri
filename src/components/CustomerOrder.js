import React, { useState, useEffect } from 'react';
import './CustomerOrder.css';

const CustomerOrder = () => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    orderType: 'pickup'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Coffee seed packaging products
  const coffeeProducts = [
    {
      id: 'house-250g',
      name: 'Hikuri House Blend',
      description: 'Our signature medium roast with notes of chocolate and caramel',
      price: 850,
      category: 'coffee-seeds',
      sizes: [
        { size: '250g', price: 850 },
        { size: '500g', price: 1650 },
        { size: '1kg', price: 3200 }
      ]
    },
    {
      id: 'ethiopia-250g',
      name: 'Single Origin Ethiopia',
      description: 'Bright and fruity with floral notes and citrus finish',
      price: 950,
      category: 'coffee-seeds',
      sizes: [
        { size: '250g', price: 950 },
        { size: '500g', price: 1850 },
        { size: '1kg', price: 3600 }
      ]
    },
    {
      id: 'colombia-250g',
      name: 'Colombian Supremo',
      description: 'Rich, full-bodied with chocolate and nutty notes',
      price: 900,
      category: 'coffee-seeds',
      sizes: [
        { size: '250g', price: 900 },
        { size: '500g', price: 1750 },
        { size: '1kg', price: 3400 }
      ]
    }
  ];

  const drinksProducts = [
    {
      id: 'house-blend-coffee',
      name: 'Hikuri House Blend Coffee',
      description: 'Our signature medium roast brewed fresh',
      price: 450,
      category: 'drinks'
    },
    {
      id: 'vanilla-latte',
      name: 'Vanilla Latte',
      description: 'Smooth espresso with vanilla syrup and steamed milk',
      price: 480,
      category: 'drinks'
    },
    {
      id: 'cold-brew',
      name: 'Cold Brew',
      description: '24-hour steeped coffee concentrate served over ice',
      price: 420,
      category: 'drinks'
    },
    {
      id: 'cappuccino',
      name: 'Cappuccino',
      description: 'Classic Italian espresso with equal parts steamed milk and foam',
      price: 400,
      category: 'drinks'
    }
  ];

  const foodProducts = [
    {
      id: 'croissant',
      name: 'Croissant',
      description: 'Buttery, flaky French pastry baked fresh daily',
      price: 280,
      category: 'food'
    },
    {
      id: 'blueberry-muffin',
      name: 'Blueberry Muffin',
      description: 'Moist muffin bursting with fresh blueberries',
      price: 320,
      category: 'food'
    },
    {
      id: 'cinnamon-roll',
      name: 'Cinnamon Roll',
      description: 'Sweet roll with cinnamon filling and cream cheese frosting',
      price: 350,
      category: 'food'
    },
    {
      id: 'avocado-toast',
      name: 'Avocado Toast',
      description: 'Sourdough bread with mashed avocado, poached egg, and herbs',
      price: 550,
      category: 'food'
    }
  ];

  const allProducts = [...coffeeProducts, ...drinksProducts, ...foodProducts];
  const [selectedCategory, setSelectedCategory] = useState('coffee-seeds');

  // eslint-disable-next-line no-unused-vars
  const addToCart = (product, size = null) => {
    const cartItem = {
      ...product,
      quantity: 1,
      selectedSize: size || product.sizes?.[0]?.size || 'Standard',
      actualPrice: size ? product.sizes.find(s => s.size === size)?.price : product.price
    };
    
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === cartItem.id && item.selectedSize === cartItem.selectedSize
      );
      
      if (existing) {
        return prev.map(item =>
          item.id === cartItem.id && item.selectedSize === cartItem.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, cartItem];
    });
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => 
        !(item.id === itemId && item.selectedSize === size)
      ));
    } else {
      setCart(prev => prev.map(item =>
        item.id === itemId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.actualPrice * item.quantity), 0);
  };

  const placeOrder = () => {
    const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const orderData = {
      id: newOrderId,
      customer: customerInfo,
      items: cart,
      total: getTotalPrice(),
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('hikuriOrders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('hikuriOrders', JSON.stringify(existingOrders));
    
    // Debug: Log what was saved
    console.log('Order saved:', orderData);
    console.log('Current localStorage:', JSON.stringify(existingOrders));
    
    setOrderId(newOrderId);
    setOrderPlaced(true);
    
    // Debug: Alert user
    alert(`Order placed! Order ID: ${newOrderId}`);
  };

  const resetOrder = () => {
    setCart([]);
    setCustomerInfo({
      name: '',
      phone: '',
      orderType: 'pickup'
    });
    setCurrentStep(1);
    setOrderPlaced(false);
    setOrderId('');
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your order ID: <strong>{orderId}</strong></p>
          <p>We'll send you updates on your order status.</p>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <span>{item.quantity}x {item.name} ({item.selectedSize})</span>
                <span>Ksh {item.actualPrice * item.quantity}</span>
              </div>
            ))}
            <div className="summary-total">
              <strong>Total: Ksh {getTotalPrice()}</strong>
            </div>
          </div>
          <button onClick={resetOrder} className="new-order-btn">
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-order">
      <div className="order-header">
        <h1>Order from Hikuri Coffee</h1>
        <div className="progress-bar">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>1. Menu</div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>2. Cart</div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>3. Details</div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>4. Confirm</div>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="menu-selection">
          <div className="category-tabs">
            <button 
              className={`tab-btn ${selectedCategory === 'coffee-seeds' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('coffee-seeds')}
            >
              Coffee Seeds
            </button>
            <button 
              className={`tab-btn ${selectedCategory === 'drinks' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('drinks')}
            >
              Drinks
            </button>
            <button 
              className={`tab-btn ${selectedCategory === 'food' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('food')}
            >
              Food
            </button>
          </div>

          <div className="products-grid">
            {allProducts
              .filter(product => product.category === selectedCategory)
              .map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-pricing">
                      {product.sizes ? (
                        <div className="size-options">
                          {product.sizes.map((size, index) => (
                            <button 
                              key={index}
                              onClick={() => addToCart(product, size.size)}
                              className="size-btn"
                            >
                              {size.size} - Ksh {size.price}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="price-add">
                          <span className="price">Ksh {product.price}</span>
                          <button 
                            onClick={() => addToCart(product)}
                            className="add-btn"
                          >
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {cart.length > 0 && (
            <div className="cart-preview">
              <div className="cart-summary">
                <span>Cart ({cart.length} items)</span>
                <span>Ksh {getTotalPrice()}</span>
              </div>
              <button 
                onClick={() => setCurrentStep(2)}
                className="proceed-btn"
              >
                Proceed to Cart
              </button>
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className="cart-review">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={() => setCurrentStep(1)} className="back-btn">
                Back to Menu
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.selectedSize}</p>
                      <p>Ksh {item.actualPrice} each</p>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <span className="item-total">Ksh {item.actualPrice * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: Ksh {getTotalPrice()}</strong>
                </div>
                <div className="cart-actions">
                  <button onClick={() => setCurrentStep(1)} className="back-btn">
                    Back to Menu
                  </button>
                  <button onClick={() => setCurrentStep(3)} className="proceed-btn">
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div className="customer-details">
          <h2>Your Information</h2>
          <form className="details-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Order Type *</label>
              <div className="order-type-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="pickup"
                    checked={customerInfo.orderType === 'pickup'}
                    onChange={(e) => setCustomerInfo({...customerInfo, orderType: e.target.value})}
                  />
                  <span>Pickup</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    value="delivery"
                    checked={customerInfo.orderType === 'delivery'}
                    onChange={(e) => setCustomerInfo({...customerInfo, orderType: e.target.value})}
                  />
                  <span>Delivery</span>
                </label>
              </div>
            </div>
          </form>
          <div className="form-actions">
            <button onClick={() => setCurrentStep(2)} className="back-btn">
              Back to Cart
            </button>
            <button 
              onClick={() => setCurrentStep(4)}
              className="proceed-btn"
              disabled={!customerInfo.name || !customerInfo.phone}
            >
              Review Order
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="order-confirmation-review">
          <h2>Confirm Your Order</h2>
          <div className="confirmation-content">
            <div className="customer-info-review">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Phone:</strong> {customerInfo.phone}</p>
              <p><strong>Order Type:</strong> {customerInfo.orderType}</p>
            </div>
            
            <div className="order-items-review">
              <h3>Order Items</h3>
              {cart.map((item, index) => (
                <div key={index} className="review-item">
                  <span>{item.quantity}x {item.name} ({item.selectedSize})</span>
                  <span>Ksh {item.actualPrice * item.quantity}</span>
                </div>
              ))}
              <div className="review-total">
                <strong>Total: Ksh {getTotalPrice()}</strong>
              </div>
            </div>
          </div>
          
          <div className="confirmation-actions">
            <button onClick={() => setCurrentStep(3)} className="back-btn">
              Back to Details
            </button>
            <button onClick={placeOrder} className="place-order-btn">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrder;
