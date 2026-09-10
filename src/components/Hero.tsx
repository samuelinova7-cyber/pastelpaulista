import React from 'react';
import { MessageCircle, ExternalLink, MapPin, Clock, Star, Sparkles, ChevronRight, ShieldCheck, Flame, UtensilsCrossed } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  return (
    <section id="hero" className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Image with warm coastal & golden pastel tone overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Praia do Francês, Alagoas"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/90"></div>
        {/* Subtle decorative golden glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pastel Gigante de 30cm</span>
          </div>

          <a 
            href={STORE_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border border-stone-700 px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">4.5 ⭐</span>
            <span className="text-stone-300">44 avaliações no Google</span>
          </a>

          <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Massa Sequinha & Crocante</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight leading-[1.1] text-white">
            Pastel Paulista <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              na Praia do Francês
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-stone-300 leading-relaxed font-normal">
            A tradição do verdadeiro pastel paulista de <strong className="text-white font-semibold">30cm recheado de ponta a ponta</strong>, combinado com caldo de cana moído na hora e a brisa do paraíso de Alagoas.
          </p>
        </div>

        {/* Quick Location & Hours info card */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-stone-400 text-xs font-semibold">Localização</p>
              <p className="font-medium text-stone-200">{STORE_INFO.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 backdrop-blur-sm">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-stone-400 text-xs font-semibold">Horário de Funcionamento</p>
              <p className="font-medium text-stone-200">{STORE_INFO.openingHours}</p>
              <p className="text-xs text-amber-400/90 font-medium">({STORE_INFO.closedDays})</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-stone-400 text-xs font-semibold">Destaque da Casa</p>
              <p className="font-medium text-stone-200">Monte seu pastel de 30cm ou escolha nossos combos especiais com caldo de cana.</p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          
          {/* WhatsApp CTA */}
          <a
            id="hero-cta-whatsapp"
            href={`https://wa.me/${STORE_INFO.rawPhone}?text=Olá!%20Estou%20no%20site%20e%20gostaria%20de%20fazer%20um%20pedido%20no%20Pastel%20Paulista%20na%20Praia.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-700/30 hover:shadow-emerald-600/40 text-sm sm:text-base transition-all transform active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Pedir pelo WhatsApp</span>
          </a>

          {/* Monte seu Pastel CTA */}
          <button
            id="hero-cta-builder"
            onClick={() => onScrollToSection('monte-seu-pastel')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 text-sm sm:text-base transition-all transform active:scale-95 cursor-pointer"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>Monte Seu Pastel 30cm</span>
          </button>

          {/* iFood CTA */}
          <a
            id="hero-cta-ifood"
            href={STORE_INFO.ifoodUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-bold px-5 py-3.5 rounded-2xl border border-stone-700 text-sm sm:text-base transition-all"
          >
            <ExternalLink className="w-4 h-4 text-red-500" />
            <span>Pedir no iFood</span>
          </a>

          {/* Google Maps CTA */}
          <a
            id="hero-cta-maps"
            href={STORE_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white font-medium px-4 py-3.5 rounded-2xl border border-stone-700/60 text-xs sm:text-sm transition-all"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Ver no Google Maps</span>
          </a>

        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-10 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-stone-300">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              📏
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-white">Tamanho 30cm</p>
              <p className="text-[11px] text-stone-400">Recheio generoso</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              🥤
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-white">Caldo de Cana</p>
              <p className="text-[11px] text-stone-400">Moído na hora geladinho</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              🏖️
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-white">Praia do Francês</p>
              <p className="text-[11px] text-stone-400">Entrega rápida na pousada</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
              ⭐
            </span>
            <div>
              <p className="font-bold text-xs sm:text-sm text-white">4.5 no Google</p>
              <p className="text-[11px] text-stone-400">44 avaliações positivas</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
