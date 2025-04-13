import React from 'react';
import { DeliveryAgent } from '@/utils/mockData';
import { 
  Bike, 
  Phone,
  Star,
  Truck, 
  Package,
  MapPin,
  Car
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AgentCardProps {
  agent: DeliveryAgent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getVehicleIcon = (type: DeliveryAgent['vehicleType']) => {
    switch(type) {
      case 'bike': return <Bike className="h-3 w-3" />;
      case 'cycle': return <Bike className="h-3 w-3" />;
      case 'scooter': return <Bike className="h-3 w-3" />;
      case 'car': return <Car className="h-3 w-3" />;
      default: return <Truck className="h-3 w-3" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={agent.photo} alt={agent.name} />
            <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="font-medium truncate">{agent.name}</h3>
              <Badge 
                variant="outline" 
                className={`${agent.isOnline ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-gray-500/10 text-gray-600 border-gray-200'} shrink-0 ml-1`}
              >
                {agent.isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
              <div className="flex items-center gap-1">
                {getVehicleIcon(agent.vehicleType)}
                <span className="capitalize">{agent.vehicleType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{agent.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{agent.currentLocation.area || agent.currentLocation.address}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex items-center text-muted-foreground gap-1">
            <Package className="h-3 w-3" />
            <span>{agent.totalDeliveries} deliveries</span>
          </div>
          <div className={`flex items-center gap-1 ${agent.isBusy ? 'text-orange-500' : 'text-green-500'}`}>
            <div className="h-2 w-2 rounded-full bg-current" />
            <span>{agent.isBusy ? 'Busy' : 'Available'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button size="sm" variant="outline" className="w-full text-xs">
            <Phone className="h-3 w-3 mr-1" /> Call
          </Button>
          <Button size="sm" variant="default" className="w-full text-xs bg-bangalore-primary hover:bg-bangalore-primary/90">
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
