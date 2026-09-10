import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, MapPin, Clock, Star, ExternalLink, Menu, X, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { isStoreOpen, formatCurrency } from '../utils/helpers';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItems, onOpenCart, onScrollToSection }) => {
  const [storeStatus, setStoreStatus] = useState(isStoreOpen());
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Refresh status every minute
    const interval = setInterval(() => {
      setStoreStatus(isStoreOpen());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div id="top-announcement-bar" className="bg-amber-600 text-amber-50 text-xs sm:text-sm font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-800 text-amber-100">
              🥟 30cm
            </span>
            <span>O autêntico pastel paulista com recheio de ponta a ponta na Praia do Francês!</span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-xs">
            <span className="flex items-center gap-1 text-amber-100">
              <Clock className="w-3.5 h-3.5" />
              {STORE_INFO.openingHours}
            </span>
            <a 
              href={`tel:${STORE_INFO.phone.replace(/\D/g, '')}`} 
              className="flex items-center gap-1 hover:underline text-amber-100"
            >
              <Phone className="w-3.5 h-3.5" />
              {STORE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header 
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled 
            ? 'bg-stone-900/95 backdrop-blur-md text-white shadow-xl shadow-stone-950/20 py-2.5' 
            : 'bg-stone-900 text-white py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Status */}
            <div className="flex items-center gap-3">
              <button 
                id="logo-brand-button"
                onClick={() => onScrollToSection('hero')} 
                className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/30 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center text-amber-400 font-black text-xl">
                    🥟
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-['Outfit'] group-hover:text-amber-400 transition-colors">
                      Pastel Paulista
                    </span>
                    <span className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                      Na Praia
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-300">
                    <span className={`inline-flex items-center gap-1 font-semibold ${storeStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                      {storeStatus.isOpen ? 'Aberto agora' : 'Fechado'}
                    </span>
                    <span className="text-stone-500">•</span>
                    <span className="flex items-center gap-0.5 text-amber-300 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      4.5 (44)
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-200">
              <button 
                id="nav-btn-builder"
                onClick={() => onScrollToSection('monte-seu-pastel')}
                className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-stone-800"
              >
                <span className="text-amber-400">✨</span>
                Monte Seu Pastel 30cm
              </button>
              <button 
                id="nav-btn-menu"
                onClick={() => onScrollToSection('cardapio')}
                className="hover:text-amber-400 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-800"
              >
                Cardápio Completo
              </button>
              <button 
                id="nav-btn-instagram"
                onClick={() => onScrollToSection('instagram')}
                className="hover:text-amber-400 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-800"
              >
                Instagram
              </button>
              <button 
                id="nav-btn-location"
                onClick={() => onScrollToSection('localizacao')}
                className="hover:text-amber-400 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-stone-800"
              >
                Localização & Avaliações
              </button>
            </nav>

            {/* Header Actions & Cart Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* WhatsApp Direct Link */}
              <a
                id="header-whatsapp-btn"
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Pastel%20Paulista%20na%20Praia.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Cart Button */}
              <button
                id="header-cart-toggle-btn"
                onClick={onOpenCart}
                aria-label="Abrir carrinho de pedidos"
                className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Pedido</span>
                {totalItems > 0 && (
                  <span className="bg-stone-900 text-amber-300 text-xs px-2 py-0.5 rounded-full font-extrabold min-w-[20px] text-center">
                    {totalItems}
                  </span>
                )}
                {cartSubtotal > 0 && (
                  <span className="hidden md:inline text-xs font-black border-l border-amber-600/40 pl-2">
                    {formatCurrency(cartSubtotal)}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
                aria-label="Menu de navegação"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden bg-stone-900 border-t border-stone-800 px-4 pt-3 pb-5 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-stone-800/80 mb-3 border border-stone-700/60">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-stone-400">Horário:</span>
                <span className="text-amber-300 font-semibold">{STORE_INFO.openingHours}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Status:</span>
                <span className={`font-bold ${storeStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {storeStatus.message} • {storeStatus.nextOpenText}
                </span>
              </div>
            </div>

            <button
              id="mobile-nav-builder"
              onClick={() => {
                onScrollToSection('monte-seu-pastel');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-amber-400 hover:bg-stone-800 font-semibold flex items-center gap-2"
            >
              <span>🛠️</span> Monte Seu Pastel de 30cm
            </button>
            <button
              id="mobile-nav-menu-btn"
              onClick={() => {
                onScrollToSection('cardapio');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center gap-2"
            >
              <span>🥟</span> Cardápio Completo
            </button>
            <button
              id="mobile-nav-instagram"
              onClick={() => {
                onScrollToSection('instagram');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center gap-2"
            >
              <span>📸</span> Feed Instagram @pastelpaulistanapraia
            </button>
            <button
              id="mobile-nav-location"
              onClick={() => {
                onScrollToSection('localizacao');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-stone-200 hover:bg-stone-800 font-medium flex items-center gap-2"
            >
              <span>📍</span> Localização & Avaliações Google
            </button>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                id="mobile-wa-direct-btn"
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                id="mobile-ifood-direct-btn"
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-red-600 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                <ExternalLink className="w-4 h-4" />
                iFood
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
