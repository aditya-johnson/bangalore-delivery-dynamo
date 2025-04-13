
import React from 'react';
import { Order } from '@/utils/mockData';
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  MapPin, 
  Package,
  User, 
  Phone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: Order['status']) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'preparing': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'picked_up': return 'bg-indigo-500/10 text-indigo-600 border-indigo-200';
      case 'in_transit': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'delivered': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'picked_up': return 'Picked Up';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-bangalore-primary" />
            <h3 className="font-semibold">{order.id}</h3>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(order.status)} border px-2 py-0.5 text-xs font-medium`}
          >
            {getStatusText(order.status)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{order.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatTime(order.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <User className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm">{order.customerName}</span>
        </div>

        <div className="flex items-start gap-2 mb-3">
          <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
          <span className="text-sm text-muted-foreground">{order.deliveryLocation.address}</span>
        </div>

        <Separator className="my-2" />

        <div className="mt-2 space-y-1">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{order.items.length - 2} more items
            </div>
          )}
        </div>

        <Separator className="my-2" />

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <CreditCard className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{order.paymentMethod.toUpperCase()}</span>
          </div>
          <span className="font-semibold">₹{order.total}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button size="sm" variant="outline" className="w-full text-xs">
            <Phone className="h-3 w-3 mr-1" /> Call
          </Button>
          <Button size="sm" variant="default" className="w-full text-xs bg-bangalore-primary hover:bg-bangalore-primary/90">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
