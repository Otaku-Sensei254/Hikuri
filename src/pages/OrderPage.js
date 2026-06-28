import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomerOrder from '../components/CustomerOrder';

function OrderPage() {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem || null;

  return <CustomerOrder selectedItem={selectedItem} />;
}

export default OrderPage;
