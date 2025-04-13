
// Mock data for development purposes

export type DeliveryStatus = 'pending' | 'preparing' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'wallet';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  area?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: DeliveryStatus;
  createdAt: Date;
  estimatedDelivery: Date;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  deliveryLocation: Location;
  pickupLocation: Location;
  agentId?: string;
  specialInstructions?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DeliveryAgent {
  id: string;
  name: string;
  phone: string;
  photo: string;
  vehicleType: 'bike' | 'cycle' | 'scooter' | 'car';
  vehicleNumber?: string;
  isOnline: boolean;
  isBusy: boolean;
  currentLocation: Location;
  currentOrderId?: string;
  rating: number;
  totalDeliveries: number;
}

// Random locations in Bangalore
const bangaloreAreas = [
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'Koramangala', lat: 12.9279, lng: 77.6271 },
  { name: 'HSR Layout', lat: 12.9116, lng: 77.6741 },
  { name: 'Whitefield', lat: 12.9698, lng: 77.7499 },
  { name: 'Jayanagar', lat: 12.9299, lng: 77.5933 },
  { name: 'MG Road', lat: 12.9716, lng: 77.6201 },
  { name: 'Electronic City', lat: 12.8399, lng: 77.6770 },
  { name: 'BTM Layout', lat: 12.9166, lng: 77.6101 },
  { name: 'JP Nagar', lat: 12.9077, lng: 77.5906 },
  { name: 'Marathahalli', lat: 12.9591, lng: 77.6980 },
];

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate a random location near a central point
function generateNearbyLocation(centralLat: number, centralLng: number): Location {
  const area = getRandomItem(bangaloreAreas);
  // Generate a location within ~2km of the central point
  const lat = area.lat + (Math.random() - 0.5) * 0.02;
  const lng = area.lng + (Math.random() - 0.5) * 0.02;
  return {
    lat,
    lng,
    address: `${Math.floor(Math.random() * 300) + 1}, ${getRandomItem(['Main Road', 'Cross', 'Avenue', 'Street', 'Layout'])}, ${area.name}`,
    area: area.name
  };
}

// Generate mock orders
export function generateMockOrders(count: number = 10): Order[] {
  const statuses: DeliveryStatus[] = ['pending', 'preparing', 'picked_up', 'in_transit', 'delivered', 'cancelled'];
  const paymentMethods: PaymentMethod[] = ['cash', 'card', 'upi', 'wallet'];
  const foodItems = [
    'Masala Dosa', 'Butter Chicken', 'Paneer Tikka', 'Veg Biryani', 'Chicken Biryani',
    'Idli Sambar', 'Chole Bhature', 'Palak Paneer', 'Mysore Pak', 'Vada Pav',
    'Filter Coffee', 'Mango Lassi', 'Tandoori Roti', 'Gulab Jamun', 'Rasgulla'
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = `ORD-${(10000 + i).toString()}`;
    const area = getRandomItem(bangaloreAreas);
    const pickupLocation = generateNearbyLocation(area.lat, area.lng);
    const deliveryLocation = generateNearbyLocation(area.lat, area.lng);
    const status = getRandomItem(statuses);
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const items: OrderItem[] = Array.from({ length: itemCount }, (_, j) => ({
      id: `ITEM-${id}-${j}`,
      name: getRandomItem(foodItems),
      quantity: Math.floor(Math.random() * 3) + 1,
      price: Math.floor(Math.random() * 300) + 50
    }));

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const now = new Date();
    const createdAt = new Date(now.getTime() - Math.random() * 3600000 * 6); // Random time in last 6 hours
    const estimatedMinutes = Math.floor(Math.random() * 45) + 15;
    const estimatedDelivery = new Date(createdAt.getTime() + estimatedMinutes * 60000);

    return {
      id,
      customerId: `CUST-${(1000 + i).toString()}`,
      customerName: `Customer ${i + 1}`,
      customerPhone: `+91 ${9800000000 + Math.floor(Math.random() * 999999)}`,
      items,
      total,
      status,
      createdAt,
      estimatedDelivery,
      paymentMethod: getRandomItem(paymentMethods),
      paymentStatus: Math.random() > 0.2 ? 'paid' : 'pending',
      deliveryLocation,
      pickupLocation,
      agentId: status !== 'pending' && status !== 'preparing' ? `AGENT-${(100 + Math.floor(Math.random() * 20)).toString()}` : undefined,
      specialInstructions: Math.random() > 0.7 ? 'Please deliver to the security gate.' : undefined
    };
  });
}

// Generate mock delivery agents
export function generateMockAgents(count: number = 15): DeliveryAgent[] {
  const vehicleTypes = ['bike', 'cycle', 'scooter', 'car'] as const;
  const names = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Deepak Singh', 'Raj Verma',
    'Kavita Gupta', 'Manish Joshi', 'Ananya Reddy', 'Suresh Nair', 'Divya Rao',
    'Vikram Malhotra', 'Neha Kapoor', 'Sanjay Mehta', 'Arun Kumar', 'Pooja Iyer',
    'Ravi Mishra', 'Anjali Das', 'Arjun Nair', 'Kiran Menon', 'Meera Sharma'
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = `AGENT-${(100 + i).toString()}`;
    const name = names[i % names.length];
    const isOnline = Math.random() > 0.2;
    const isBusy = isOnline && Math.random() > 0.4;
    const area = getRandomItem(bangaloreAreas);
    const location = generateNearbyLocation(area.lat, area.lng);
    // Create a non-readonly copy of the vehicleTypes array to use with getRandomItem
    const vehicleTypesCopy = [...vehicleTypes];

    return {
      id,
      name,
      phone: `+91 ${9900000000 + Math.floor(Math.random() * 999999)}`,
      photo: `https://randomuser.me/api/portraits/${Math.random() > 0.7 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
      vehicleType: getRandomItem(vehicleTypesCopy),
      vehicleNumber: `KA-${Math.floor(Math.random() * 50) + 1}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${1000 + Math.floor(Math.random() * 9000)}`,
      isOnline,
      isBusy,
      currentLocation: location,
      currentOrderId: isBusy ? `ORD-${(10000 + Math.floor(Math.random() * 10)).toString()}` : undefined,
      rating: (3 + Math.random() * 2).toFixed(1) as unknown as number,
      totalDeliveries: Math.floor(Math.random() * 500) + 20
    };
  });
}

// Generate delivery metrics
export function generateDeliveryMetrics() {
  return {
    activeOrders: Math.floor(Math.random() * 30) + 10,
    avgDeliveryTime: Math.floor(Math.random() * 10) + 25,
    ordersCompleted: Math.floor(Math.random() * 100) + 150,
    onTimeRate: Math.floor(Math.random() * 20) + 80,
    activeAgents: Math.floor(Math.random() * 15) + 5,
    avgRating: (4 + Math.random()).toFixed(1)
  };
}

// Export pre-generated data
export const mockOrders = generateMockOrders(20);
export const mockAgents = generateMockAgents(15);
export const mockMetrics = generateDeliveryMetrics();
