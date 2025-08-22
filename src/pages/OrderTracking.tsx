import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, CheckCircle, Utensils, Truck } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Order, OrderStatus } from '@/types';

export default function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [orders] = useLocalStorage<Order[]>('restaurant-orders', []);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId, orders]);

  // Simulate real-time order status updates
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      const currentOrders = JSON.parse(localStorage.getItem('restaurant-orders') || '[]');
      const updatedOrder = currentOrders.find((o: Order) => o.id === orderId);
      if (updatedOrder) {
        setOrder(updatedOrder);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [order, orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>The order you're looking for doesn't exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/menu')} className="w-full">
              Back to Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'preparing':
        return <Utensils className="h-5 w-5" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5" />;
      case 'delivered':
        return <Truck className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-green-500';
      case 'delivered':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusDescription = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Your order has been received and is waiting to be prepared';
      case 'preparing':
        return 'Your order is being prepared by our kitchen staff';
      case 'ready':
        return 'Your order is ready for pickup/delivery';
      case 'delivered':
        return 'Your order has been delivered to your table';
      default:
        return '';
    }
  };

  const statusSteps = [
    { status: 'pending', label: 'Order Received' },
    { status: 'preparing', label: 'Preparing' },
    { status: 'ready', label: 'Ready' },
    { status: 'delivered', label: 'Delivered' },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.status === order.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/menu')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <div className="space-y-6">
          {/* Order Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Table {order.table_number} • {order.customer_name}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Order Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>{getStatusDescription(order.status)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {statusSteps.map((step, index) => (
                  <div key={step.status} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${
                        index <= currentStepIndex ? getStatusColor(step.status as OrderStatus) : 'bg-gray-300'
                      }`}
                    >
                      {getStatusIcon(step.status as OrderStatus)}
                    </div>
                    <span className={`text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                    {index < statusSteps.length - 1 && (
                      <div className={`hidden sm:block w-full h-0.5 mt-2 ${
                        index < currentStepIndex ? getStatusColor(order.status) : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Order placed: {new Date(order.created_at).toLocaleString()}</p>
                <p>Last updated: {new Date(order.updated_at).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.menu_item_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${order.total_amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}