import { Link } from 'react-router';
import { BarChart, Home, Users, Vote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Elections',
    href: '/admin/elections',
    icon: Vote,
  },
  {
    title: 'Voters',
    href: '/admin/verify-voters',
    icon: Users,
  },
  {
    title: 'Results',
    href: '/admin/results',
    icon: BarChart,
  },
];

export function AdminSidebar() {
  return (
    <div className="hidden md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin Panel</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  item.href === '/admin/verify-voters' && 'bg-accent text-accent-foreground'
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
