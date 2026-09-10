/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CustomPastelBuilder } from './components/CustomPastelBuilder';
import { MenuSection } from './components/MenuSection';
import { InstagramWidget } from './components/InstagramWidget';
import { LocationReviews } from './components/LocationReviews';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CartItem } from './types';
import { ShoppingBag, MessageCircle, UtensilsCrossed, Phone } from 'lucide-react';
import { STORE_INFO } from './data/menuData';
import { formatCurrency } from './utils/helpers';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pastel_paulista_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pastel_paulista_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      // If same item already exists and not a unique custom pastel, bump quantity
      const existingIndex = prev.findIndex(i => 
        i.name === item.name && 
        i.selectedSize === item.selectedSize && 
        !i.isCustomPastel
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity
        };
        return next;
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItemsCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onScrollToSection={scrollToSection}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 30cm Interactive Builder */}
        <CustomPastelBuilder
          onAddToCart={handleAddToCart}
        />

        {/* Full Menu with Categories & Filters */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenBuilder={() => scrollToSection('monte-seu-pastel')}
        />

        {/* Instagram Widget with Feed & Highlights */}
        <InstagramWidget />

        {/* Google Maps Location & Google Reviews */}
        <LocationReviews />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenMenu={() => scrollToSection('cardapio')}
      />

      {/* Mobile Sticky Floating Quick Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
        <button
          id="mobile-float-builder-btn"
          onClick={() => scrollToSection('monte-seu-pastel')}
          className="flex-1 py-2.5 px-2 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-stone-700 active:scale-95 transition-all"
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Montar 30cm</span>
        </button>

        <a
          id="mobile-float-wa-btn"
          href={`https://wa.me/${STORE_INFO.rawPhone}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Pastel%20Paulista%20na%20Praia.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl active:scale-95 transition-all flex items-center justify-center shadow-md"
          aria-label="Pedir pelo WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>

        <button
          id="mobile-float-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold rounded-xl text-xs flex items-center justify-between shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Pedido</span>
          </div>
          {totalItemsCount > 0 && (
            <span className="bg-stone-950 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full font-black">
              {totalItemsCount} • {formatCurrency(cartSubtotal)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
