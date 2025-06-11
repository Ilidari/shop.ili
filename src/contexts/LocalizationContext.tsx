
"use client";
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useState, useContext, useEffect } from 'react';
import type { Language } from '@/types';

interface LocalizationContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  currencySymbol: string; // Added currency symbol
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "appName": "ili shop",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.licenses": "Software Licenses",
    "nav.vps": "VPS Services",
    "nav.cart": "Cart",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.dashboard": "Dashboard",
    "nav.adminPanel": "Admin Panel",
    "nav.logout": "Logout",
    "hero.mainTitle": "Your Digital Solutions Hub",
    "hero.mainSubtitle": "Discover premium software licenses and high-performance VPS services tailored for you.",
    "popularProducts": "Popular Products",
    "aiRecommendations": "AI Recommendations For You",
    "viewDetails": "View Details",
    "addToCart": "Add to Cart",
    "allProducts": "All Products",
    "filter": "Filter",
    "search": "Search products...",
    "price": "Price",
    "description": "Description",
    "features": "Features",
    "screenshots": "Screenshots",
    "relatedProducts": "Related Products",
    "shoppingCart": "Shopping Cart",
    "product": "Product",
    "quantity": "Quantity",
    "total": "Total",
    "subtotal": "Subtotal",
    "checkout": "Proceed to Checkout",
    "emptyCart": "Your cart is currently empty.",
    "emptyCartSuggestion": "Explore our products and find something you like!",
    "continueShopping": "Continue Shopping",
    "checkout.title": "Checkout",
    "checkout.billingDetails": "Billing Details",
    "checkout.shippingAddress": "Shipping Address",
    "checkout.paymentMethod": "Payment Method",
    "checkout.orderSummary": "Order Summary",
    "checkout.placeOrder": "Place Order",
    "login.title": "Login to your Account",
    "login.email": "Email Address",
    "login.password": "Password",
    "login.button": "Login",
    "login.noAccount": "Don't have an account?",
    "login.registerLink": "Register here",
    "login.errorTitle": "Login Failed",
    "login.invalidCredentials": "Invalid email or password. Please try again.",
    "login.successTitle": "Login Successful",
    "register.title": "Create an Account",
    "register.name": "Full Name",
    "register.email": "Email Address",
    "register.password": "Password",
    "register.confirmPassword": "Confirm Password",
    "register.button": "Create Account",
    "register.hasAccount": "Already have an account?",
    "register.loginLink": "Login here",
    "register.successTitle": "Registration Successful",
    "register.info": "Please proceed to login.",
    "dashboard.title": "My Dashboard",
    "dashboard.welcome": "Welcome, {name}!",
    "dashboard.overview": "Overview",
    "dashboard.orders": "My Orders",
    "dashboard.account": "Account Details",
    "dashboard.licenses": "My Licenses / Services",
    "orders.title": "My Orders",
    "orders.id": "Order ID",
    "orders.date": "Date",
    "orders.status": "Status",
    "orders.total": "Total Amount",
    "orders.action": "Action",
    "orders.view": "View Details",
    "orders.noOrders": "You haven't placed any orders yet.",
    "account.title": "Account Details",
    "account.name": "Name",
    "account.email": "Email",
    "account.currentPassword": "Current Password",
    "account.newPassword": "New Password",
    "account.confirmNewPassword": "Confirm New Password",
    "account.changePassword": "Change Password",
    "account.save": "Save Changes",
    "logout.title": "Logged Out",
    "logout.description": "You have been successfully logged out.",
    "footer.about": "About Us",
    "footer.contact": "Contact Us",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.copyright": "© {year} ili shop. All rights reserved.",
    "lang.en": "English",
    "lang.fa": "فارسی",
    "currencySymbol": "$",
    "comingSoon": "Coming Soon",
    "productNotFound": "Product not found.",
    "admin.title": "Admin Panel",
    "admin.dashboard": "Admin Dashboard",
    "admin.products": "Manage Products",
    "admin.orders": "Manage Orders",
    "admin.users": "Manage Users",
    "admin.settings": "Settings",
    "admin.settingsDescription": "Manage your administrator account settings.",
    "admin.currentPassword": "Current Password",
    "admin.newPassword": "New Password",
    "admin.confirmNewPassword": "Confirm New Password",
    "admin.updatePasswordButton": "Update Password",
    "admin.passwordUpdateSuccess": "Password updated successfully!",
    "admin.passwordUpdateErrorMatch": "New passwords do not match.",
    "admin.passwordUpdateErrorCurrent": "Incorrect current password.",
    "admin.passwordNewInvalid": "New password must be at least 6 characters.",
    "admin.welcome": "Welcome to the Admin Panel, {name}!",
    "admin.accessDenied": "Access Denied. You do not have permission to view this page."
  },
  fa: {
    "appName": "ایلی شاپ",
    "nav.home": "صفحه اصلی",
    "nav.products": "محصولات",
    "nav.licenses": "لایسنس نرم‌افزار",
    "nav.vps": "سرویس‌های VPS",
    "nav.cart": "سبد خرید",
    "nav.login": "ورود",
    "nav.register": "ثبت نام",
    "nav.dashboard": "داشبورد",
    "nav.adminPanel": "پنل مدیریت",
    "nav.logout": "خروج",
    "hero.mainTitle": "مرکز راهکارهای دیجیتال شما",
    "hero.mainSubtitle": "لایسنس‌های نرم‌افزار ویژه و سرویس‌های VPS با عملکرد بالا، مناسب برای شما.",
    "popularProducts": "محصولات پرطرفدار",
    "aiRecommendations": "پیشنهادات هوش مصنوعی برای شما",
    "viewDetails": "مشاهده جزئیات",
    "addToCart": "افزودن به سبد خرید",
    "allProducts": "همه محصولات",
    "filter": "فیلتر",
    "search": "جستجوی محصولات...",
    "price": "قیمت",
    "description": "توضیحات",
    "features": "ویژگی‌ها",
    "screenshots": "تصاویر محصول",
    "relatedProducts": "محصولات مرتبط",
    "shoppingCart": "سبد خرید",
    "product": "محصول",
    "quantity": "تعداد",
    "total": "مجموع کل",
    "subtotal": "جمع جزء",
    "checkout": "ادامه جهت تسویه حساب",
    "emptyCart": "سبد خرید شما در حال حاضر خالی است.",
    "emptyCartSuggestion": "محصولات ما را بررسی کنید و چیزی که دوست دارید پیدا کنید!",
    "continueShopping": "ادامه خرید",
    "checkout.title": "تسویه حساب",
    "checkout.billingDetails": "جزئیات صورتحساب",
    "checkout.shippingAddress": "آدرس ارسال",
    "checkout.paymentMethod": "روش پرداخت",
    "checkout.orderSummary": "خلاصه سفارش",
    "checkout.placeOrder": "ثبت سفارش",
    "login.title": "ورود به حساب کاربری",
    "login.email": "آدرس ایمیل",
    "login.password": "رمز عبور",
    "login.button": "ورود",
    "login.noAccount": "حساب کاربری ندارید؟",
    "login.registerLink": "اینجا ثبت نام کنید",
    "login.errorTitle": "ورود ناموفق",
    "login.invalidCredentials": "ایمیل یا رمز عبور نامعتبر است. لطفا دوباره تلاش کنید.",
    "login.successTitle": "ورود موفقیت آمیز بود",
    "register.title": "ایجاد حساب کاربری",
    "register.name": "نام کامل",
    "register.email": "آدرس ایمیل",
    "register.password": "رمز عبور",
    "register.confirmPassword": "تایید رمز عبور",
    "register.button": "ایجاد حساب",
    "register.hasAccount": "قبلاً حساب کاربری ایجاد کرده‌اید؟",
    "register.loginLink": "اینجا وارد شوید",
    "register.successTitle": "ثبت نام موفقیت آمیز بود",
    "register.info": "لطفا برای ادامه وارد شوید.",
    "dashboard.title": "داشبورد من",
    "dashboard.welcome": "خوش آمدید، {name}!",
    "dashboard.overview": "پیشخوان",
    "dashboard.orders": "سفارشات من",
    "dashboard.account": "جزئیات حساب",
    "dashboard.licenses": "لایسنس‌ها / سرویس‌های من",
    "orders.title": "سفارشات من",
    "orders.id": "شناسه سفارش",
    "orders.date": "تاریخ",
    "orders.status": "وضعیت",
    "orders.total": "مبلغ کل",
    "orders.action": "عملیات",
    "orders.view": "مشاهده جزئیات",
    "orders.noOrders": "شما هنوز هیچ سفارشی ثبت نکرده‌اید.",
    "account.title": "جزئیات حساب",
    "account.name": "نام",
    "account.email": "ایمیل",
    "account.currentPassword": "رمز عبور فعلی",
    "account.newPassword": "رمز عبور جدید",
    "account.confirmNewPassword": "تایید رمز عبور جدید",
    "account.changePassword": "تغییر رمز عبور",
    "account.save": "ذخیره تغییرات",
    "logout.title": "خروج از سیستم",
    "logout.description": "شما با موفقیت از سیستم خارج شدید.",
    "footer.about": "درباره ما",
    "footer.contact": "تماس با ما",
    "footer.terms": "شرایط خدمات",
    "footer.privacy": "سیاست حفظ حریم خصوصی",
    "footer.copyright": "© {year} ایلی شاپ. تمامی حقوق محفوظ است.",
    "lang.en": "English",
    "lang.fa": "فارسی",
    "currencySymbol": "تومان",
    "comingSoon": "به زودی",
    "productNotFound": "محصول یافت نشد.",
    "admin.title": "پنل مدیریت",
    "admin.dashboard": "داشبورد ادمین",
    "admin.products": "مدیریت محصولات",
    "admin.orders": "مدیریت سفارشات",
    "admin.users": "مدیریت کاربران",
    "admin.settings": "تنظیمات",
    "admin.settingsDescription": "تنظیمات حساب کاربری ادمین خود را مدیریت کنید.",
    "admin.currentPassword": "رمز عبور فعلی",
    "admin.newPassword": "رمز عبور جدید",
    "admin.confirmNewPassword": "تکرار رمز عبور جدید",
    "admin.updatePasswordButton": "به‌روزرسانی رمز عبور",
    "admin.passwordUpdateSuccess": "رمز عبور با موفقیت به‌روزرسانی شد!",
    "admin.passwordUpdateErrorMatch": "رمزهای عبور جدید با یکدیگر مطابقت ندارند.",
    "admin.passwordUpdateErrorCurrent": "رمز عبور فعلی نادرست است.",
    "admin.passwordNewInvalid": "رمز عبور جدید باید حداقل ۶ کاراکتر باشد.",
    "admin.welcome": "به پنل مدیریت خوش آمدید، {name}!",
    "admin.accessDenied": "دسترسی غیرمجاز. شما اجازه مشاهده این صفحه را ندارید."
  },
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('ili-shop-lang') as Language | null;
    if (savedLang && ['en', 'fa'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase().startsWith('fa') ? 'fa' : 'en';
      setLanguage(browserLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    localStorage.setItem('ili-shop-lang', language);
  }, [language]);

  const t = (key: string, replacements?: Record<string, string | number>) => {
    let translation = translations[language]?.[key] || translations['en']?.[key] || key; // Fallback to English then key
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    return translation;
  };
  
  const currencySymbol = language === 'fa' ? translations.fa.currencySymbol : translations.en.currencySymbol;


  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t, currencySymbol }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
