import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, ShoppingBag, Sparkles, Flame, Coffee, Heart, Wine, Star, Utensils } from 'lucide-react';
import { COMBOS_ITEMS, CLASSICOS_ITEMS, ESPECIAIS_ITEMS, DOCES_ITEMS, BEBIDAS_ITEMS } from '../data/menuData';
import { MenuItem, CategoryId, CartItem } from '../types';
import { formatCurrency } from '../utils/helpers';

interface MenuSectionProps {
  onAddToCart: (item: CartItem) => void;
  onOpenBuilder: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onOpenBuilder }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, { label: string; size: string; price: number }>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'todos', name: 'Todos os Itens', icon: '🍽️', count: 24 },
    { id: 'combos', name: 'Combos & Promoções', icon: '🏆', count: COMBOS_ITEMS.length },
    { id: 'classicos', name: 'Pastéis Clássicos', icon: '🥟', count: CLASSICOS_ITEMS.length },
    { id: 'especiais', name: 'Especiais Paulista', icon: '⭐', count: ESPECIAIS_ITEMS.length },
    { id: 'doces', name: 'Pastéis Doces', icon: '🍫', count: DOCES_ITEMS.length },
    { id: 'bebidas', name: 'Bebidas & Caldo de Cana', icon: '🥤', count: BEBIDAS_ITEMS.length },
  ];

  const allItems: MenuItem[] = useMemo(() => {
    return [
      ...COMBOS_ITEMS,
      ...CLASSICOS_ITEMS,
      ...ESPECIAIS_ITEMS,
      ...DOCES_ITEMS,
      ...BEBIDAS_ITEMS,
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(query)));
      return matchesCategory && matchesQuery;
    });
  }, [allItems, activeCategory, searchQuery]);

  const handleSelectSize = (itemId: string, sizeOption: { label: string; size: string; price: number }) => {
    setSelectedSizeMap(prev => ({
      ...prev,
      [itemId]: sizeOption,
    }));
  };

  const handleAddItem = (item: MenuItem) => {
    const selectedSizeOption = item.sizeOptions ? (selectedSizeMap[item.id] || item.sizeOptions[0]) : null;
    const finalPrice = selectedSizeOption ? selectedSizeOption.price : item.price;
    const finalName = selectedSizeOption ? `${item.name} (${selectedSizeOption.size})` : item.name;

    const cartItem: CartItem = {
      id: `${item.id}-${selectedSizeOption ? selectedSizeOption.size : 'default'}-${Date.now()}`,
      name: finalName,
      price: finalPrice,
      quantity: 1,
      image: item.image,
      selectedSize: selectedSizeOption ? selectedSizeOption.size : undefined,
    };

    onAddToCart(cartItem);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="cardapio" className="py-12 sm:py-20 bg-stone-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-500/20 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <span>Cardápio Digital Oficial</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-stone-900 tracking-tight">
              Nosso Cardápio Completo
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Pastéis salgados tradicionais, especiais de 30cm, opções doces e caldo de cana geladinho.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sabor, caldo de cana, combo..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/80 shadow-xs'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-stone-900/15 text-stone-950 font-black' : 'bg-stone-100 text-stone-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Monte seu pastel banner callout */}
        <div className="mb-10 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 rounded-3xl p-5 sm:p-7 text-stone-950 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 text-amber-400 flex items-center justify-center text-2xl font-black shadow-md shrink-0">
              🛠️
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight font-['Outfit']">
                Quer montar o seu pastel de 30cm do seu próprio jeito?
              </h3>
              <p className="text-xs sm:text-sm font-medium text-amber-950 mt-0.5">
                Escolha suas proteínas favoritas, queijos e adicionais com cálculo automático!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBuilder}
            className="shrink-0 w-full sm:w-auto px-5 py-3 bg-stone-950 hover:bg-stone-900 text-amber-400 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Abrir Montador de Pastel 30cm
          </button>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6">
            <p className="text-3xl mb-2">🔍</p>
            <h4 className="font-bold text-stone-800 text-base">Nenhum item encontrado</h4>
            <p className="text-xs text-stone-500 mt-1">Tente buscar por outro termo ou limpar os filtros.</p>
            <button
              onClick={() => { setActiveCategory('todos'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs"
            >
              Ver todo o cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map(item => {
              const selectedSizeOption = item.sizeOptions 
                ? (selectedSizeMap[item.id] || item.sizeOptions[0]) 
                : null;
              const displayPrice = selectedSizeOption ? selectedSizeOption.price : item.price;
              const isJustAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-md shadow-stone-200/40 hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Item Image with Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.badge && (
                        <span className="bg-amber-500 text-stone-950 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
                          {item.badge}
                        </span>
                      )}
                      {item.popular && (
                        <span className="bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-400/20 backdrop-blur-xs">
                          🔥 Destaque
                        </span>
                      )}
                    </div>

                    {/* Price bottom overlay on image */}
                    <div className="absolute bottom-3 right-3 bg-stone-950/90 text-amber-400 px-3 py-1 rounded-xl text-sm sm:text-base font-black border border-stone-700/80 font-['Outfit'] backdrop-blur-xs shadow-md">
                      {formatCurrency(displayPrice)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 group-hover:text-amber-600 transition-colors font-['Outfit']">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Size Selector for drinks/portions if available */}
                    {item.sizeOptions && item.sizeOptions.length > 0 && (
                      <div className="pt-2 border-t border-stone-100">
                        <label className="block text-[11px] font-bold text-stone-700 mb-1.5">
                          Selecione o tamanho / opção:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {item.sizeOptions.map(opt => {
                            const isOptionActive = selectedSizeOption?.size === opt.size;
                            return (
                              <button
                                key={opt.size}
                                type="button"
                                onClick={() => handleSelectSize(item.id, opt)}
                                className={`px-2 py-1.5 rounded-xl text-[11px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                                  isOptionActive
                                    ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-xs'
                                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                                }`}
                              >
                                <span className="truncate">{opt.size}</span>
                                <span className="text-[10px] text-amber-700 font-extrabold ml-1 shrink-0">
                                  {formatCurrency(opt.price)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div className="text-xs text-stone-500">
                        <span className="font-bold text-stone-900 text-sm">{formatCurrency(displayPrice)}</span>
                      </div>

                      <button
                        id={`btn-add-menu-${item.id}`}
                        onClick={() => handleAddItem(item)}
                        className={`flex-1 max-w-[170px] py-2.5 px-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
