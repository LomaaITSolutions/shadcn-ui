import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefHat, Clock, Utensils, CheckCircle } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Order, OrderStatus } from '@/types';
import { toast } from 'sonner';

export default function ChefDashboardPage() {
  const [orders, setOrders] = useLocalStorage<Order[]>('restaurant-orders', []);
  const [activeTab, setActiveTab] = useState('pending');

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally come from a WebSocket connection
      // For demo purposes, we'll just refresh from localStorage
      const currentOrders = JSON.parse(localStorage.getItem('restaurant-orders') || '[]');
      setOrders(currentOrders);
    }, 5000);

    return () => clearInterval(interval);
  }, [setOrders]);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
          : order
      )
    );
    toast.success(`Order #${orderId} status updated to ${newStatus}`);
  };

  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <Utensils className="h-4 w-4" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>
              Table {order.table_number} • {order.customer_name} • ${order.total_amount.toFixed(2)}
            </CardDescription>
          </div>
          <Badge variant="outline" className={`text-white ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status}</span>
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date(order.created_at).toLocaleString()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span>{item.menu_item_name} × {item.quantity}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <Separator className="mb-4" />
        
        <div className="flex gap-2">
          {order.status === 'pending' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'preparing')}
              size="sm"
              className="flex-1"
            >
              Start Preparing
            </Button>
          )}
          {order.status === 'preparing' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'ready')}
              size="sm"
              className="flex-1"
            >
              Mark as Ready
            </Button>
          )}
          {order.status === 'ready' && (
            <Button
              onClick={() => updateOrderStatus(order.id, 'delivered')}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              Mark as Delivered
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const pendingOrders = getOrdersByStatus('pending');
  const preparingOrders = getOrdersByStatus('preparing');
  const readyOrders = getOrdersByStatus('ready');
  const deliveredOrders = getOrdersByStatus('delivered');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chef Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage kitchen orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Preparing</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{preparingOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{readyOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredOrders.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="preparing">Preparing ({preparingOrders.length})</TabsTrigger>
            <TabsTrigger value="ready">Ready ({readyOrders.length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({deliveredOrders.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-6">
            {pendingOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">No pending orders</p>
                  <p className="text-muted-foreground">New orders will appear here</p>
                </CardContent>
              </Card>
            ) : (
              pendingOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
          
          <TabsContent value="preparing" className="mt-6">
            {preparingOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Utensils className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">No orders in preparation</p>
                  <p className="text-muted-foreground">Orders being prepared will appear here</p>
                </CardContent>
              </Card>
            ) : (
              preparingOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
          
          <TabsContent value="ready" className="mt-6">
            {readyOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">No orders ready</p>
                  <p className="text-muted-foreground">Ready orders will appear here</p>
                </CardContent>
              </Card>
            ) : (
              readyOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
          
          <TabsContent value="delivered" className="mt-6">
            {deliveredOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">No delivered orders</p>
                  <p className="text-muted-foreground">Delivered orders will appear here</p>
                </CardContent>
              </Card>
            ) : (
              deliveredOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}