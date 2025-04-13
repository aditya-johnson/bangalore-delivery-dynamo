
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import DeliveryMetrics from '@/components/DeliveryMetrics';
import DeliveryMap from '@/components/DeliveryMap';
import OrdersList from '@/components/OrdersList';
import AgentCard from '@/components/AgentCard';
import { mockMetrics, mockAgents } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bike, Package, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Real-time data has been updated.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <NavBar />

      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button className="bg-bangalore-primary hover:bg-bangalore-primary/90" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Order
            </Button>
          </div>
        </div>

        <DeliveryMetrics
          activeOrders={mockMetrics.activeOrders}
          avgDeliveryTime={mockMetrics.avgDeliveryTime}
          ordersCompleted={mockMetrics.ordersCompleted}
          onTimeRate={mockMetrics.onTimeRate}
          activeAgents={mockMetrics.activeAgents}
          avgRating={mockMetrics.avgRating}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <DeliveryMap />

          <Card className="col-span-1 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Delivery Agents</CardTitle>
                <Button variant="ghost" size="sm" className="text-bangalore-primary h-7 px-2">
                  <span className="text-xs">View All</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="online">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="online">Online</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                </TabsList>
                <TabsContent value="online" className="space-y-4">
                  {mockAgents
                    .filter(agent => agent.isOnline)
                    .slice(0, 5)
                    .map(agent => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                </TabsContent>
                <TabsContent value="all" className="space-y-4">
                  {mockAgents.slice(0, 5).map(agent => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </TabsContent>
                <TabsContent value="nearby" className="space-y-4">
                  {mockAgents
                    .filter(agent => agent.isOnline && !agent.isBusy)
                    .slice(0, 5)
                    .map(agent => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <OrdersList />
        </div>
      </main>
    </div>
  );
};

export default Index;
