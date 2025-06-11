
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X, ShieldCheck } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; // This now uses NextAuth session via useSession
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from 'react';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const { t, language } = useLocalization();
  const { getItemCount } = useCart();
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/products', labelKey: 'nav.products' },
    { href: '/products?category=license', labelKey: 'nav.licenses' },
    { href: '/products?category=vps', labelKey: 'nav.vps' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const renderNavLinks = (isMobile = false) => (
    navItems.map(item => (
      <NavLink key={item.href} href={item.href} onClick={isMobile ? closeMobileMenu : undefined}>
        {t(item.labelKey)}
      </NavLink>
    ))
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {renderNavLinks()}
          </nav>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <LanguageSwitcher />
            <Link href="/cart" className="relative p-2 rounded-md hover:bg-muted transition-colors" aria-label={t('nav.cart')}>
              <ShoppingCart className="h-5 w-5 text-foreground/70" />
              {getItemCount() > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {getItemCount()}
                </Badge>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link href="/admin/dashboard" className="p-2 rounded-md hover:bg-muted transition-colors" aria-label={t('nav.adminPanel')}>
                    <ShieldCheck className="h-5 w-5 text-accent" />
                  </Link>
                ) : (
                  <Link href="/dashboard" className="p-2 rounded-md hover:bg-muted transition-colors" aria-label={t('nav.dashboard')}>
                    <LayoutDashboard className="h-5 w-5 text-foreground/70" />
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={() => logout()} aria-label={t('nav.logout')}>
                  <LogOut className="h-5 w-5 text-foreground/70" />
                </Button>
              </>
            ) : (
              <Link href="/login" className="p-2 rounded-md hover:bg-muted transition-colors" aria-label={t('nav.login')}>
                <User className="h-5 w-5 text-foreground/70" />
              </Link>
            )}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side={language === 'fa' ? 'right' : 'left'} className="w-[280px] p-0">
                  <div className="p-4 border-b">
                    <Logo onClick={closeMobileMenu}/>
                  </div>
                  <nav className="flex flex-col space-y-2 p-4">
                    {renderNavLinks(true)}
                     {isAuthenticated && (
                        isAdmin ? (
                            <NavLink href="/admin/dashboard" onClick={closeMobileMenu}>{t('nav.adminPanel')}</NavLink>
                        ) : (
                            <NavLink href="/dashboard" onClick={closeMobileMenu}>{t('nav.dashboard')}</NavLink>
                        )
                    )}
                  </nav>
                   <div className="p-4 mt-auto border-t">
                     {isAuthenticated ? (
                        <Button variant="outline" onClick={() => { logout(); closeMobileMenu();}} className="w-full">
                            <LogOut className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                            {t('nav.logout')}
                        </Button>
                    ) : (
                         <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={closeMobileMenu}>
                            <Link href="/login">{t('nav.login')}</Link>
                        </Button>
                    )}
                   </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
