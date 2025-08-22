import { MenuItem, Order, Table } from '@/types';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella cheese, basil, and olive oil',
    price: 12.99,
    category: 'Pizza',
    image_url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
    availability: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
    price: 15.99,
    category: 'Pizza',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    availability: true,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
    price: 8.99,
    category: 'Salads',
    image_url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400',
    availability: true,
  },
  {
    id: '4',
    name: 'Grilled Chicken Burger',
    description: 'Juicy grilled chicken breast with lettuce, tomato, and mayo',
    price: 11.99,
    category: 'Burgers',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    availability: true,
  },
  {
    id: '5',
    name: 'Fish and Chips',
    description: 'Beer-battered cod with golden fries and tartar sauce',
    price: 14.99,
    category: 'Main Course',
    image_url: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400',
    availability: true,
  },
  {
    id: '6',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie served with vanilla ice cream',
    price: 6.99,
    category: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
    availability: true,
  },
  {
    id: '7',
    name: 'Coca Cola',
    description: 'Refreshing cola drink',
    price: 2.99,
    category: 'Beverages',
    image_url: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400',
    availability: true,
  },
  {
    id: '8',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
    price: 13.99,
    category: 'Pasta',
    image_url: '/images/PastaCarbonara.jpg',
    availability: true,
  },
];

export const mockTables: Table[] = [
  { id: '1', number: 1, seats: 2, qr_code_url: 'https://restaurant.com/menu?table=1' },
  { id: '2', number: 2, seats: 4, qr_code_url: 'https://restaurant.com/menu?table=2' },
  { id: '3', number: 3, seats: 6, qr_code_url: 'https://restaurant.com/menu?table=3' },
  { id: '4', number: 4, seats: 2, qr_code_url: 'https://restaurant.com/menu?table=4' },
  { id: '5', number: 5, seats: 4, qr_code_url: 'https://restaurant.com/menu?table=5' },
];

// Initialize with some mock orders for demonstration
export const initializeMockOrders = (): Order[] => [
  {
    id: '1',
    table_number: 3,
    customer_name: 'John Doe',
    total_amount: 28.98,
    status: 'preparing',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    items: [
      {
        id: '1',
        order_id: '1',
        menu_item_id: '1',
        menu_item_name: 'Margherita Pizza',
        quantity: 1,
        price: 12.99,
      },
      {
        id: '2',
        order_id: '1',
        menu_item_id: '2',
        menu_item_name: 'Pepperoni Pizza',
        quantity: 1,
        price: 15.99,
      },
    ],
  },
  {
    id: '2',
    table_number: 1,
    customer_name: 'Jane Smith',
    total_amount: 20.98,
    status: 'ready',
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    items: [
      {
        id: '3',
        order_id: '2',
        menu_item_id: '4',
        menu_item_name: 'Grilled Chicken Burger',
        quantity: 1,
        price: 11.99,
      },
      {
        id: '4',
        order_id: '2',
        menu_item_id: '3',
        menu_item_name: 'Caesar Salad',
        quantity: 1,
        price: 8.99,
      },
    ],
  },
];