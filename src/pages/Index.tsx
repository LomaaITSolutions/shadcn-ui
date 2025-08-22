import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UtensilsCrossed, 
  ChefHat, 
  Settings, 
  QrCode,
  ShoppingCart,
  Clock
} from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <UtensilsCrossed className="h-10 w-10 text-primary" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Restaurant QR Ordering System</h1>
              <p className="text-muted-foreground">Streamline your restaurant operations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Customer Menu</CardTitle>
                  <CardDescription>Browse and order from menu</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                QR code menu access with cart functionality and order tracking.
              </p>
              <Link to="/menu?table=1">
                <Button className="w-full">
                  View Demo Menu
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <ChefHat className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Chef Dashboard</CardTitle>
                  <CardDescription>Manage kitchen orders</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time order management with status updates and kitchen workflow.
              </p>
              <Link to="/chef">
                <Button className="w-full">
                  Chef Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Settings className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Admin Panel</CardTitle>
                  <CardDescription>Restaurant management</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive admin dashboard for menu, orders, and analytics.
              </p>
              <Link to="/admin">
                <Button className="w-full">
                  Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <QrCode className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>QR Generator</CardTitle>
                  <CardDescription>Generate table QR codes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create and download QR codes for each table in your restaurant.
              </p>
              <Link to="/qr-generator">
                <Button className="w-full">
                  Generate QR Codes
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Order Tracking</CardTitle>
                  <CardDescription>Real-time order status</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Track orders from placement to delivery with live updates.
              </p>
              <Button className="w-full" disabled>
                Demo Order Tracking
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Quick Demo</CardTitle>
                  <CardDescription>Try the full workflow</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Experience the complete customer journey from QR scan to delivery.
              </p>
              <Link to="/menu?table=5">
                <Button className="w-full" variant="outline">
                  Start Demo
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">System Features</CardTitle>
            <CardDescription className="text-center">
              Complete restaurant ordering solution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">QR Menu Access</h3>
                <p className="text-sm text-muted-foreground">
                  Customers scan table QR codes to access the digital menu
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Cart & Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  Add items to cart and complete payment with integrated gateway
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Live order status updates from kitchen to customer table
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Management Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive admin and chef dashboards for operations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">How It Works</CardTitle>
            <CardDescription className="text-center">
              Simple 4-step process for seamless ordering
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Customer scans the QR code placed on their table
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Browse & Order</h3>
                <p className="text-sm text-muted-foreground">
                  Browse menu, add items to cart, and complete payment
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Kitchen Prepares</h3>
                <p className="text-sm text-muted-foreground">
                  Chef receives order and updates status through preparation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 text-white">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Order Delivered</h3>
                <p className="text-sm text-muted-foreground">
                  Food is delivered to table with real-time tracking
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}