
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, CheckCircle, Users, BarChart3, Star } from 'lucide-react';

interface MetricsProps {
  activeOrders: number;
  avgDeliveryTime: number;
  ordersCompleted: number;
  onTimeRate: number;
  activeAgents: number;
  avgRating: string | number;
}

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}> = ({ title, value, icon, trend }) => (
  <Card className="overflow-hidden border-none shadow-sm">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          {trend && (
            <p className={`text-xs mt-1 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-muted-foreground ml-1">vs yesterday</span>
            </p>
          )}
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const DeliveryMetrics: React.FC<MetricsProps> = ({
  activeOrders,
  avgDeliveryTime,
  ordersCompleted,
  onTimeRate,
  activeAgents,
  avgRating
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard
        title="Active Orders"
        value={activeOrders}
        icon={<Truck className="h-5 w-5 text-bangalore-primary" />}
        trend={{ value: 8, isPositive: true }}
      />
      <MetricCard
        title="Avg Delivery Time"
        value={`${avgDeliveryTime} min`}
        icon={<Clock className="h-5 w-5 text-bangalore-secondary" />}
        trend={{ value: 3, isPositive: false }}
      />
      <MetricCard
        title="Orders Completed"
        value={ordersCompleted}
        icon={<CheckCircle className="h-5 w-5 text-green-600" />}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="On-time Rate"
        value={`${onTimeRate}%`}
        icon={<BarChart3 className="h-5 w-5 text-bangalore-accent" />}
        trend={{ value: 5, isPositive: true }}
      />
      <MetricCard
        title="Active Agents"
        value={activeAgents}
        icon={<Users className="h-5 w-5 text-bangalore-muted" />}
        trend={{ value: 2, isPositive: false }}
      />
      <MetricCard
        title="Avg. Rating"
        value={avgRating}
        icon={<Star className="h-5 w-5 text-yellow-500" />}
      />
    </div>
  );
};

export default DeliveryMetrics;
