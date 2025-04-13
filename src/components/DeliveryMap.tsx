
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bike, Package, FileSearch, MapPin } from 'lucide-react';
import { DeliveryAgent, Order, mockAgents, mockOrders } from '@/utils/mockData';

const DeliveryMap: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'agents' | 'pickups' | 'deliveries'>('all');

  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Live Delivery Map</CardTitle>
          <div className="flex space-x-1 text-sm">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2 py-1 rounded-md ${selectedType === 'all' ? 'bg-bangalore-primary text-white' : 'hover:bg-muted'}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('agents')}
              className={`px-2 py-1 rounded-md flex items-center gap-1 ${selectedType === 'agents' ? 'bg-bangalore-primary text-white' : 'hover:bg-muted'}`}
            >
              <Bike className="h-3 w-3" /> Agents
            </button>
            <button
              onClick={() => setSelectedType('pickups')}
              className={`px-2 py-1 rounded-md flex items-center gap-1 ${selectedType === 'pickups' ? 'bg-bangalore-primary text-white' : 'hover:bg-muted'}`}
            >
              <Package className="h-3 w-3" /> Pickups
            </button>
            <button
              onClick={() => setSelectedType('deliveries')}
              className={`px-2 py-1 rounded-md flex items-center gap-1 ${selectedType === 'deliveries' ? 'bg-bangalore-primary text-white' : 'hover:bg-muted'}`}
            >
              <MapPin className="h-3 w-3" /> Deliveries
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative w-full h-[400px] rounded-md overflow-hidden border border-muted bg-card">
          {/* Map placeholder - in a real app, this would be replaced with a proper map integration */}
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=12.9716,77.5946&zoom=11&size=800x400&scale=2&maptype=roadmap&style=element:labels|visibility:on&style=element:geometry.stroke|visibility:on&style=feature:road|element:geometry|color:0xffffff&style=feature:landscape|element:geometry.fill|color:0xf5f5f5&key=YOUR_API_KEY')] bg-cover bg-center opacity-70">
            {/* Delivery agents */}
            {(selectedType === 'all' || selectedType === 'agents') && mockAgents.map((agent, index) => (
              <div
                key={agent.id}
                className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
                style={{ 
                  top: `${150 + (agent.currentLocation.lat - 12.90) * 5000}px`,
                  left: `${150 + (agent.currentLocation.lng - 77.60) * 5000}px`
                }}
                title={`${agent.name} - ${agent.vehicleType}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${agent.isBusy ? 'bg-orange-500' : 'bg-green-500'} shadow-md`}>
                  <Bike className="h-3 w-3" />
                </div>
              </div>
            ))}
            
            {/* Pickup locations */}
            {(selectedType === 'all' || selectedType === 'pickups') && mockOrders
              .filter(order => ['pending', 'preparing'].includes(order.status))
              .map((order, index) => (
                <div
                  key={`pickup-${order.id}`}
                  className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
                  style={{ 
                    top: `${150 + (order.pickupLocation.lat - 12.90) * 5000}px`,
                    left: `${150 + (order.pickupLocation.lng - 77.60) * 5000}px`
                  }}
                  title={`Pickup: ${order.id} at ${order.pickupLocation.address}`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white bg-blue-500 shadow-md">
                    <Package className="h-3 w-3" />
                  </div>
                </div>
            ))}
            
            {/* Delivery locations */}
            {(selectedType === 'all' || selectedType === 'deliveries') && mockOrders
              .filter(order => ['picked_up', 'in_transit'].includes(order.status))
              .map((order, index) => (
                <div
                  key={`delivery-${order.id}`}
                  className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
                  style={{ 
                    top: `${150 + (order.deliveryLocation.lat - 12.90) * 5000}px`,
                    left: `${150 + (order.deliveryLocation.lng - 77.60) * 5000}px`
                  }}
                  title={`Delivery: ${order.id} to ${order.deliveryLocation.address}`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white bg-red-500 shadow-md">
                    <MapPin className="h-3 w-3" />
                  </div>
                </div>
            ))}
          </div>
          
          {/* Map overlay with shadow gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
          
          {/* Map info panel */}
          <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 dark:bg-card/90 rounded-md shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-x-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs">Available Agents</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-xs">Busy Agents</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs">Pickup Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs">Delivery Points</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <FileSearch className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Click on markers for details</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;
