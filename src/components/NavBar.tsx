
import React from 'react';
import { Bell, Menu, Package, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NavBar: React.FC = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Package className="h-6 w-6 text-bangalore-primary" />
          <span className="hidden md:inline-block">Bangalore Delivery Dynamo</span>
          <span className="md:hidden">BDD</span>
        </div>
        
        <Button variant="outline" size="icon" className="md:hidden ml-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex items-center ml-auto gap-4">
          <div className="relative hidden md:flex items-center w-full max-w-sm">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders, agents..."
              className="pl-8 bg-muted/40 border-0 w-full"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 rounded-full bg-bangalore-primary w-4 h-4 text-xs text-white flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User account</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
