
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderCard from './OrderCard';
import { Order, mockOrders } from '@/utils/mockData';

const OrdersList: React.FC = () => {
  const [tab, setTab] = useState<string>('active');

  // Filter orders based on the active tab
  const getFilteredOrders = (): Order[] => {
    switch (tab) {
      case 'active':
        return mockOrders.filter(order => 
          ['pending', 'preparing', 'picked_up', 'in_transit'].includes(order.status)
        );
      case 'pending':
        return mockOrders.filter(order => order.status === 'pending');
      case 'preparing':
        return mockOrders.filter(order => order.status === 'preparing');
      case 'in_transit':
        return mockOrders.filter(order => 
          ['picked_up', 'in_transit'].includes(order.status)
        );
      case 'completed':
        return mockOrders.filter(order => order.status === 'delivered');
      case 'cancelled':
        return mockOrders.filter(order => order.status === 'cancelled');
      default:
        return mockOrders;
    }
  };

  const filteredOrders = getFilteredOrders();

  return (
    <Card className="shadow-sm w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="active" onValueChange={setTab} className="w-full">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-6">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="in_transit">In Transit</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={tab} className="mt-0">
            <div className="px-6 py-4">
              {filteredOrders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredOrders.map(order => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">No orders in this category</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrdersList;
