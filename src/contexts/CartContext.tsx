"use client";
import type { Product, CartItem } from '@/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLocalization } from './LocalizationContext';


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { t, language } = useLocalization();


  useEffect(() => {
    const storedCart = localStorage.getItem('ili-shop-cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('ili-shop-cart')) { // only update if cart had items or was cleared
        localStorage.setItem('ili-shop-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);


  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    toast({
      title: language === 'en' ? "Added to cart" : "به سبد خرید اضافه شد",
      description: `${product.name[language]} (${quantity})`,
      variant: 'default',
    });
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    if (itemToRemove) {
      toast({
        title: language === 'en' ? "Removed from cart" : "از سبد خرید حذف شد",
        description: itemToRemove.name[language],
        variant: 'destructive',
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
        title: language === 'en' ? "Cart cleared" : "سبد خرید خالی شد",
        variant: 'default',
      });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
