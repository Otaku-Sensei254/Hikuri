import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [notifications, setNotifications] = useState([]);

  // Simple admin login system
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Check login credentials
  const checkLogin = (username, password) => {
    // Demo credentials: admin/admin or hikuri/1234
    if ((username === 'admin' && password === 'admin') || (username === 'hikuri' && password === '1234')) {
      setIsLoggedIn(true);
      setLoginError('');
      // Store login session
      sessionStorage.setItem('hikuriAdminLoggedIn', 'true');
      return true;
    }
    setLoginError('Invalid credentials');
    return false;
  };

  // Check for existing login session
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('hikuriAdminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  // eslint-disable-next-line no-unused-vars

  // Load orders from localStorage on mount and set up interval to check for new orders
  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('hikuriOrders') || '[]');
      
      // If no orders, add demo orders
      if (savedOrders.length === 0) {
        const demoOrders = [
          {
            id: 'ORD-DEMO-001',
            customer: { name: 'Demo Customer', phone: '+254 712 345 678' },
            items: [
              { name: 'Hikuri House Blend (250g)', quantity: 1, price: 850 }
            ],
            total: 850,
            status: 'pending',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            type: 'pickup'
          },
          {
            id: 'ORD-DEMO-002',
            customer: { name: 'Test User', phone: '+254 734 567 890' },
            items: [
              { name: 'Vanilla Latte', quantity: 2, price: 480 }
            ],
            total: 960,
            status: 'preparing',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            type: 'delivery'
          }
        ];
        const allOrders = [...savedOrders, ...demoOrders];
        localStorage.setItem('hikuriOrders', JSON.stringify(allOrders));
        setOrders(allOrders);
      } else {
        setOrders(savedOrders);
      }
    };
    
    // Initial load
    loadOrders();
    
    // Set up interval to check for new orders every 2 seconds
    const interval = setInterval(loadOrders, 2000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // Update localStorage
    const savedOrders = JSON.parse(localStorage.getItem('hikuriOrders') || '[]');
    const updatedSavedOrders = savedOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('hikuriOrders', JSON.stringify(updatedSavedOrders));
    
    // Add notification
    const order = orders.find(o => o.id === orderId);
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        message: `Order ${orderId} status updated to ${newStatus}`,
        timestamp: new Date(),
        type: 'success'
      }
    ]);
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f39c12';
      case 'preparing': return '#3498db';
      case 'ready': return '#27ae60';
      case 'completed': return '#2c3e50';
      default: return '#95a5a6';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    if (checkLogin(username, password)) {
      // Login successful - will be handled by useEffect
    } else {
      setLoginError('Invalid credentials');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('hikuriAdminLoggedIn');
    setLoginError('');
  };

  return (
    <>
      {/* If not logged in, show login form */}
      {!isLoggedIn && (
        <div className="admin-login">
          <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Username:</label>
                <input type="text" name="username" autoComplete="username" />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" autoComplete="current-password" />
              </div>
              {loginError && <div className="login-error">{loginError}</div>}
              <button type="submit" className="login-btn">Login</button>
            </form>
            <div className="demo-credentials">
              <p>Demo Credentials:</p>
              <p><strong>Username:</strong> admin / hikuri</p>
              <p><strong>Password:</strong> admin / 1234</p>
            </div>
          </div>
        </div>
      )}

      {/* If logged in, show dashboard */}
      {isLoggedIn && (
        <div className="admin-dashboard">
          {/* Logout button */}
          <div className="logout-section">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>

          <div className="dashboard-header">
            <h1>Hikuri Admin Dashboard</h1>
            <div className="header-stats">
              <div className="stat-card">
                <h3>{orders.filter(o => o.status === 'pending').length}</h3>
                <p>Pending Orders</p>
              </div>
              <div className="stat-card">
                <h3>{orders.filter(o => o.status === 'preparing').length}</h3>
                <p>Preparing</p>
              </div>
              <div className="stat-card">
                <h3>{orders.filter(o => o.status === 'ready').length}</h3>
                <p>Ready</p>
              </div>
              <div className="stat-card">
                <h3>Ksh {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="notifications-panel">
            <h3>Notifications</h3>
            <div className="notifications-list">
              {notifications.slice(-3).map(notif => (
                <div key={notif.id} className={`notification ${notif.type}`}>
                  <span className="notification-time">{formatTime(notif.timestamp)}</span>
                  <span className="notification-message">{notif.message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="orders-section">
            <div className="orders-tabs">
              <button 
                className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending ({orders.filter(o => o.status === 'pending').length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'preparing' ? 'active' : ''}`}
                onClick={() => setActiveTab('preparing')}
              >
                Preparing ({orders.filter(o => o.status === 'preparing').length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'ready' ? 'active' : ''}`}
                onClick={() => setActiveTab('ready')}
              >
                Ready ({orders.filter(o => o.status === 'ready').length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed ({orders.filter(o => o.status === 'completed').length})
              </button>
            </div>

            <div className="orders-grid">
              {filteredOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>{order.id}</h3>
                      <p>{order.customer.name}</p>
                      <p>{order.customer.phone}</p>
                    </div>
                    <div className="order-status">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status.toUpperCase()}
                      </span>
                      <span className="order-type">{order.type}</span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <span>{item.quantity}x {item.name}</span>
                        <span>Ksh {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <strong>Total: Ksh {order.total}</strong>
                    </div>
                    <div className="order-time">
                      {formatTime(order.timestamp)}
                    </div>
                  </div>

                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="action-btn preparing"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="action-btn ready"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="action-btn completed"
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
