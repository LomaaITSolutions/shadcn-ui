import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, Eye } from 'lucide-react';
import { mockTables } from '@/data/mockData';

export default function QRGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState('https://restaurant.com');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const generateQRCode = (tableNumber: number) => {
    const url = `${baseUrl}/menu?table=${tableNumber}`;
    // In a real app, you would use a QR code library like qrcode
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
  };

  const downloadQRCode = (tableNumber: number) => {
    const qrUrl = generateQRCode(tableNumber);
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `table-${tableNumber}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const previewUrl = (tableNumber: number) => {
    window.open(`${baseUrl}/menu?table=${tableNumber}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <QrCode className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
              <p className="text-sm text-muted-foreground">Generate QR codes for your tables</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Settings</CardTitle>
            <CardDescription>Configure your restaurant's base URL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://your-restaurant.com"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              QR codes will redirect to: <code>{baseUrl}/menu?table=[TABLE_NUMBER]</code>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Preview */}
        {selectedTable && (
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview - Table {selectedTable}</CardTitle>
              <CardDescription>Preview and download QR code</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <img
                src={generateQRCode(selectedTable)}
                alt={`QR Code for Table ${selectedTable}`}
                className="w-64 h-64 border rounded-lg"
              />
              <div className="flex space-x-2">
                <Button onClick={() => downloadQRCode(selectedTable)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
                <Button variant="outline" onClick={() => previewUrl(selectedTable)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview URL
                </Button>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                URL: {baseUrl}/menu?table={selectedTable}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tables Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Tables</CardTitle>
            <CardDescription>Select a table to generate its QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockTables.map((table) => (
                <Card
                  key={table.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTable === table.number
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedTable(table.number)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-2">Table {table.number}</div>
                    <Badge variant="outline">{table.seats} seats</Badge>
                    <div className="mt-4 space-y-2">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadQRCode(table.number);
                        }}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download QR
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          previewUrl(table.number);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use QR Codes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Generate QR Codes</h3>
                <p className="text-sm text-muted-foreground">
                  Download QR codes for each table in your restaurant
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Print & Place</h3>
                <p className="text-sm text-muted-foreground">
                  Print the QR codes and place them on each table
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Customers Scan</h3>
                <p className="text-sm text-muted-foreground">
                  Customers scan to access the menu and place orders
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}