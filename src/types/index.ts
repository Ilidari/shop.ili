export type Language = 'en' | 'fa';

export type User = {
  id?: string; // Added for NextAuth
  name: string;
  email: string;
  isAdmin: boolean; // Made non-optional, will be set by NextAuth session
  image?: string; // Added for NextAuth
};

export type Product = {
  id: string;
  name: Record<Language, string>;
  slug: string;
  description: Record<Language, string>;
  price: number;
  currency: string;
  image: string;
  dataAiHint?: string;
  category: 'license' | 'vps';
  features?: Record<Language, string[]>;
  screenshots?: string[];
};

export type CartItem = Product & {
  quantity: number;
};

export type HeroSlide = {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  imageUrl: string;
  dataAiHint?: string;
  link: string;
  cta: Record<Language, string>;
};

export type Order = {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  items: CartItem[];
  total: number;
};
