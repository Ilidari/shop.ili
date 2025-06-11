import type { Product, HeroSlide } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: { en: 'Ultimate OS License', fa: 'لایسنس سیستم عامل نهایی' },
    slug: 'ultimate-os-license',
    description: {
      en: 'A lifetime license for the Ultimate OS, packed with features for professionals. Experience top-tier performance and security.',
      fa: 'لایسنس دائمی سیستم عامل نهایی، با امکانات فراوان برای حرفه‌ای‌ها. عملکرد و امنیت سطح بالا را تجربه کنید.'
    },
    price: 99.99,
    currency: 'USD',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'modern OS',
    category: 'license',
    features: {
      en: ['Advanced productivity tools', 'Regular security updates', '24/7 premium support', 'Cross-platform compatibility'],
      fa: ['ابزارهای بهره‌وری پیشرفته', 'به‌روزرسانی‌های امنیتی منظم', 'پشتیبانی ویژه ۲۴/۷', 'سازگاری بین پلتفرمی']
    },
    screenshots: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png']
  },
  {
    id: 'prod_002',
    name: { en: 'Pro Design Suite', fa: 'مجموعه طراحی حرفه‌ای' },
    slug: 'pro-design-suite',
    description: {
      en: '1-year subscription to the Pro Design Suite, including all premium tools for graphic design, video editing, and web development.',
      fa: 'اشتراک یک‌ساله مجموعه طراحی حرفه‌ای، شامل تمامی ابزارهای ویژه برای طراحی گرافیک، ویرایش ویدئو و توسعه وب.'
    },
    price: 149.50,
    currency: 'USD',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'design software',
    category: 'license',
    features: {
      en: ['Vector editing powerhouse', 'Photo manipulation magic', 'Intuitive typography tools', 'Cloud asset library'],
      fa: ['قدرت ویرایش وکتور', 'جادوی دستکاری عکس', 'ابزارهای تایپوگرافی بصری', 'کتابخانه دارایی‌های ابری']
    },
  },
  {
    id: 'vps_001',
    name: { en: 'Basic VPS Plan', fa: 'پلن VPS پایه' },
    slug: 'basic-vps-plan',
    description: {
      en: 'Reliable and affordable VPS hosting for small projects, blogs, and personal websites. Get started quickly with our easy setup.',
      fa: 'هاستینگ VPS قابل اعتماد و مقرون‌به‌صرفه برای پروژه‌های کوچک، وبلاگ‌ها و وب‌سایت‌های شخصی. با راه‌اندازی آسان ما به سرعت شروع کنید.'
    },
    price: 10.00,
    currency: 'USD',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cloud server',
    category: 'vps',
    features: {
      en: ['1 Core CPU', '2GB RAM', '50GB NVMe SSD Storage', '1TB Premium Bandwidth', '99.9% Uptime Guarantee'],
      fa: ['۱ هسته CPU', '۲ گیگابایت رم', '۵۰ گیگابایت حافظه NVMe SSD', '۱ ترابایت ترافیک ویژه', 'تضمین آپتایم ۹۹.۹٪']
    }
  },
  {
    id: 'vps_002',
    name: { en: 'Developer VPS Plan', fa: 'پلن VPS توسعه‌دهنده' },
    slug: 'developer-vps-plan',
    description: {
      en: 'Powerful VPS for developers with more resources, root access, and a dedicated IP. Ideal for staging and application development.',
      fa: 'VPS قدرتمند برای توسعه‌دهندگان با منابع بیشتر، دسترسی روت و IP اختصاصی. ایده‌آل برای محیط‌های آزمایشی و توسعه برنامه‌ها.'
    },
    price: 25.00,
    currency: 'USD',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'coding screen',
    category: 'vps',
    features: {
      en: ['2 Core CPU', '4GB RAM', '100GB NVMe SSD Storage', '3TB Premium Bandwidth', 'Full Root Access', 'Dedicated IP'],
      fa: ['۲ هسته CPU', '۴ گیگابایت رم', '۱۰۰ گیگابایت حافظه NVMe SSD', '۳ ترابایت ترافیک ویژه', 'دسترسی کامل روت', 'IP اختصاصی']
    }
  },
  {
    id: 'prod_003',
    name: { en: 'Security Toolkit License', fa: 'لایسنس جعبه ابزار امنیتی' },
    slug: 'security-toolkit-license',
    description: {
      en: 'Comprehensive security software to protect your digital assets. Includes antivirus, firewall, VPN, and more.',
      fa: 'نرم‌افزار امنیتی جامع برای محافظت از دارایی‌های دیجیتال شما. شامل آنتی‌ویروس، فایروال، VPN و موارد دیگر.'
    },
    price: 79.99,
    currency: 'USD',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cyber security',
    category: 'license',
    features: {
      en: ['Real-time Antivirus', 'Advanced Firewall', 'Secure VPN Access', 'Encrypted Password Manager'],
      fa: ['آنتی‌ویروس بلادرنگ', 'فایروال پیشرفته', 'دسترسی VPN امن', 'مدیریت رمز عبور رمزنگاری شده']
    },
  },
  {
    id: 'vps_003',
    name: { en: 'Business VPS Plan', fa: 'پلن VPS تجاری' },
    slug: 'business-vps-plan',
    description: {
      en: 'High-performance VPS for business applications, e-commerce stores, and high-traffic websites. Includes daily backups.',
      fa: 'VPS با عملکرد بالا برای برنامه‌های تجاری، فروشگاه‌های تجارت الکترونیک و وب‌سایت‌های پربازدید. شامل پشتیبان‌گیری روزانه.'
    },
    price: 50.00,
    currency: 'USD',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'business server',
    category: 'vps',
    features: {
      en: ['4 Core CPU', '8GB RAM', '200GB NVMe SSD Storage', '5TB Premium Bandwidth', 'Automated Daily Backups', 'Priority Support'],
      fa: ['۴ هسته CPU', '۸ گیگابایت رم', '۲۰۰ گیگابایت حافظه NVMe SSD', '۵ ترابایت ترافیک ویژه', 'پشتیبان‌گیری خودکار روزانه', 'پشتیبانی اولویت‌دار']
    }
  }
];

export const mockHeroSlides: HeroSlide[] = [
  {
    id: 'slide1',
    title: { en: 'Powerful VPS Hosting', fa: 'هاستینگ VPS قدرتمند' },
    subtitle: { en: 'Scalable solutions for your growing needs. Experience unmatched speed and reliability.', fa: 'راهکارهای مقیاس‌پذیر برای نیازهای رو به رشد شما. سرعت و پایداری بی‌نظیر را تجربه کنید.' },
    imageUrl: 'https://placehold.co/1200x400.png',
    dataAiHint: 'cloud computing',
    link: '/products?category=vps',
    cta: { en: 'Explore VPS Plans', fa: 'مشاهده پلن‌های VPS' }
  },
  {
    id: 'slide2',
    title: { en: 'Essential Software Licenses', fa: 'لایسنس‌های نرم‌افزار ضروری' },
    subtitle: { en: 'Get the tools you need to succeed, from OS to design suites.', fa: 'ابزارهایی که برای موفقیت نیاز دارید را دریافت کنید، از سیستم‌عامل تا مجموعه‌های طراحی.' },
    imageUrl: 'https://placehold.co/1200x400.png',
    dataAiHint: 'digital software',
    link: '/products?category=license',
    cta: { en: 'Discover Licenses', fa: 'کشف لایسنس‌ها' }
  },
  {
    id: 'slide3',
    title: { en: 'Secure Your Digital World', fa: 'دنیای دیجیتال خود را ایمن کنید' },
    subtitle: { en: 'Top-tier security software and reliable VPS infrastructure.', fa: 'نرم‌افزارهای امنیتی برتر و زیرساخت VPS قابل اعتماد.' },
    imageUrl: 'https://placehold.co/1200x400.png',
    dataAiHint: 'digital security',
    link: '/products',
    cta: { en: 'Shop All Products', fa: 'خرید همه محصولات' }
  }
];
