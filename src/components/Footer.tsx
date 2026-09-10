import React from 'react';
import { MessageCircle, Instagram, MapPin, Phone, Clock, Star, ExternalLink, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenCart }) => {
  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-md">
                🥟
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-['Outfit'] block">
                  Pastel Paulista
                </span>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Na Praia do Francês
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              O autêntico sabor do pastel paulista de 30 centímetros, crocante, sequinho e com recheio farto de ponta a ponta na Praia do Francês, Alagoas.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800 w-fit">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>4.5 ⭐ (44 avaliações no Google)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Cardápio & Acesso Rápido
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onScrollToSection('monte-seu-pastel')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🛠️ Monte Seu Pastel 30cm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cardapio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🥟 Cardápio Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('cardapio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🏆 Combos & Promoções
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('instagram')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  📸 Feed @pastelpaulistanapraia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('localizacao')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  📍 Localização & Avaliações
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Atendimento & Horários
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-200 font-semibold">{STORE_INFO.openingHours}</p>
                  <p className="text-xs text-amber-400/80">Segunda-feira fechado</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${STORE_INFO.rawPhone}`} className="hover:text-amber-400 text-stone-200 font-bold block">
                    {STORE_INFO.phone}
                  </a>
                  <span className="text-[11px] text-stone-500">WhatsApp para pedidos rápidos</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs">{STORE_INFO.shortAddress}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Social & Direct Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Canais Oficiais
            </h4>
            <div className="space-y-2.5">
              <a
                id="footer-whatsapp-btn"
                href={`https://wa.me/${STORE_INFO.rawPhone}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp ({STORE_INFO.phone})</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              </a>

              <a
                id="footer-instagram-btn"
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-rose-400" />
                  <span>Instagram ({STORE_INFO.followers})</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              </a>

              <a
                id="footer-ifood-btn"
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center">
                    iF
                  </span>
                  <span>Pedir no iFood</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Pastel Paulista na Praia • R. Maresia, 381 - Praia do Francês, Marechal Deodoro - AL.
          </p>
          <p className="flex items-center gap-1">
            Feito com carinho para os amantes de pastel crocante e caldo de cana 🌊🥟
          </p>
        </div>
      </div>
    </footer>
  );
};
