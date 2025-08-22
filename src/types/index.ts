export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  availability: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  table_number: number;
  customer_name?: string;
  total_amount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  menu_item_name: string;
  quantity: number;
  price: number;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  qr_code_url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'chef';
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';