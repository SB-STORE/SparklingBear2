import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Image, MessageSquare, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useOpenTicketCount } from '@/hooks/use-admin';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/tickets', label: 'Tickets', icon: Bell },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { data: openTickets } = useOpenTicketCount();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/admin" className="text-xl font-bold text-gradient-chrome">
            SB Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.href ||
              (link.href !== '/admin' && location.pathname.startsWith(link.href));
            const isTickets = link.href === '/admin/tickets';
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  active
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
                {isTickets && openTickets && openTickets > 0 && (
                  <Badge className="ml-auto bg-red-600 text-white text-[10px] px-1.5 py-0 h-5 min-w-5 flex items-center justify-center">
                    {openTickets}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</p>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
