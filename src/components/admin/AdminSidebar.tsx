"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Package } from 'lucide-react'; // Added Settings
import { useLocalization } from '@/contexts/LocalizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
  
  return (
    <Link href={href} passHref>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start text-base h-12 ${isActive ? 'font-semibold text-primary' : 'text-foreground/80 hover:text-foreground'}`}
      >
        <Icon className={`mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
        {label}
      </Button>
    </Link>
  );
};


export default function AdminSidebar() {
  const { t } = useLocalization();
  const { logout } = useAuth();

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, labelKey: 'admin.dashboard' },
    { href: '/admin/products', icon: Package, labelKey: 'admin.products' },
    { href: '/admin/orders', icon: ShoppingBag, labelKey: 'admin.orders' },
    { href: '/admin/users', icon: Users, labelKey: 'admin.users' },
    { href: '/admin/settings', icon: Settings, labelKey: 'admin.settings' }, 
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-card p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-headline font-semibold mb-6 border-b pb-3">{t('admin.title')}</h2>
      <nav className="space-y-2">
        {navItems.map(item => (
          <NavItem key={item.href} href={item.href} icon={item.icon} label={t(item.labelKey)} />
        ))}
      </nav>
      <Button variant="outline" onClick={logout} className="w-full mt-8 h-12 text-base">
        <LogOut className="mr-3 rtl:ml-3 rtl:mr-0 h-5 w-5" />
        {t('nav.logout')}
      </Button>
    </aside>
  );
}
