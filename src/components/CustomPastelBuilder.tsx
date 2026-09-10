import React, { useState, useMemo } from 'react';
import { Sparkles, Check, Plus, AlertCircle, ShoppingBag, MessageCircle, RotateCcw, ChevronRight, Layers, Flame } from 'lucide-react';
import { AVAILABLE_PROTEINS, AVAILABLE_COMPLEMENTS, STORE_INFO } from '../data/menuData';
import { formatCurrency } from '../utils/helpers';
import { CartItem } from '../types';

interface CustomPastelBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onInstantOrderWhatsApp?: (item: CartItem) => void;
}

export const CustomPastelBuilder: React.FC<CustomPastelBuilderProps> = ({ onAddToCart }) => {
  const [baseType, setBaseType] = useState<'tradicional' | 'especial'>('tradicional');
  const [selectedProteins, setSelectedProteins] = useState<string[]>(['carne-moida', 'bacon']);
  const [selectedComplements, setSelectedComplements] = useState<string[]>(['mucarela', 'catupiry', 'oregano']);
  const [extraAddons, setExtraAddons] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [addedToast, setAddedToast] = useState(false);

  // Constants based on business rules
  const BASE_PRICE = baseType === 'tradicional' ? 20.00 : 29.00;
  const TRADICIONAL_MAX_INCLUDED_TOTAL = 4;
  const TRADICIONAL_MAX_INCLUDED_PROTEINS = 2;
  const EXTRA_UNIT_PRICE = 2.00;

  // Calculation for Tradicional base
  const totalStandardIngredientsCount = selectedProteins.length + selectedComplements.length;
  
  // Extra calculation logic
  const calculatedExtraCount = useMemo(() => {
    let extraCount = extraAddons.length;

    if (baseType === 'tradicional') {
      // If user selected more than 4 items between proteins & complements, charge extra for each additional
      if (totalStandardIngredientsCount > TRADICIONAL_MAX_INCLUDED_TOTAL) {
        extraCount += (totalStandardIngredientsCount - TRADICIONAL_MAX_INCLUDED_TOTAL);
      }
    }
    return extraCount;
  }, [baseType, totalStandardIngredientsCount, extraAddons.length]);

  const totalPrice = BASE_PRICE + (calculatedExtraCount * EXTRA_UNIT_PRICE);

  // Toggle Protein selection
  const handleToggleProtein = (proteinId: string) => {
    setSelectedProteins(prev => {
      if (prev.includes(proteinId)) {
        return prev.filter(id => id !== proteinId);
      } else {
        return [...prev, proteinId];
      }
    });
  };

  // Toggle Complement selection
  const handleToggleComplement = (complementId: string) => {
    setSelectedComplements(prev => {
      if (prev.includes(complementId)) {
        return prev.filter(id => id !== complementId);
      } else {
        return [...prev, complementId];
      }
    });
  };

  // Toggle extra add-on
  const handleToggleExtra = (extraName: string) => {
    setExtraAddons(prev => {
      if (prev.includes(extraName)) {
        return prev.filter(item => item !== extraName);
      } else {
        return [...prev, extraName];
      }
    });
  };

  const handleReset = () => {
    setBaseType('tradicional');
    setSelectedProteins(['carne-moida']);
    setSelectedComplements(['mucarela']);
    setExtraAddons([]);
    setCustomNotes('');
    setActiveStep(1);
  };

  // Human-readable names
  const proteinNames = selectedProteins.map(id => AVAILABLE_PROTEINS.find(p => p.id === id)?.name || id);
  const complementNames = selectedComplements.map(id => AVAILABLE_COMPLEMENTS.find(c => c.id === id)?.name || id);

  const handleAddCustomToCart = () => {
    if (selectedProteins.length === 0 && selectedComplements.length === 0) {
      alert('Por favor, selecione pelo menos 1 ingrediente para montar seu pastel!');
      return;
    }

    const customItem: CartItem = {
      id: `custom-30cm-${Date.now()}`,
      name: `Monte Seu Pastel 30cm (${baseType === 'tradicional' ? 'Tradicional' : 'Especial'})`,
      price: totalPrice,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
      isCustomPastel: true,
      customDetails: {
        baseType,
        proteins: proteinNames,
        complements: complementNames,
        extraIngredients: extraAddons,
      },
      notes: customNotes.trim() || undefined,
    };

    onAddToCart(customItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  const handleDirectWhatsAppOrder = () => {
    const allIngredients = [...proteinNames, ...complementNames, ...extraAddons].join(', ');
    const noteText = customNotes ? `\nObs: ${customNotes}` : '';
    const text = `Olá! Gostaria de pedir 1x Monte Seu Pastel 30cm (${baseType === 'tradicional' ? 'Tradicional' : 'Especial'})\nRecheios: ${allIngredients}\nValor: ${formatCurrency(totalPrice)}${noteText}`;
    window.open(`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="monte-seu-pastel" className="py-12 sm:py-16 bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-900 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Módulo Interativo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-['Outfit'] tracking-tight">
            Monte Seu Pastel de 30cm
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Crie a sua própria obra de arte gastronômica com os melhores recheios selecionados e acompanhe o valor em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Builder Controls (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-stone-200/60 border border-amber-200/60 space-y-7">
            
            {/* Steps Tab Tracker */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 overflow-x-auto gap-2">
              <button
                onClick={() => setActiveStep(1)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeStep === 1 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900/10 flex items-center justify-center text-xs">1</span>
                <span>Base & Tamanho</span>
              </button>

              <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />

              <button
                onClick={() => setActiveStep(2)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeStep === 2 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900/10 flex items-center justify-center text-xs">2</span>
                <span>Proteínas ({selectedProteins.length})</span>
              </button>

              <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />

              <button
                onClick={() => setActiveStep(3)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeStep === 3 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900/10 flex items-center justify-center text-xs">3</span>
                <span>Queijos & Extras</span>
              </button>
            </div>

            {/* 1. Base / Categoria */}
            <div id="builder-step-1" className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">1</span>
                  Escolha a Base / Categoria
                </label>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Massa de 30cm
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Tradicional Option */}
                <div
                  id="opt-base-tradicional"
                  onClick={() => setBaseType('tradicional')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    baseType === 'tradicional'
                      ? 'border-amber-500 bg-amber-50/50 shadow-md shadow-amber-500/10'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                        Tradicional 30cm
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Inclui até <strong>4 ingredientes</strong> no total (com até <strong>2 proteínas</strong>).
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-base sm:text-lg font-black text-amber-700">
                        {formatCurrency(20.00)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${baseType === 'tradicional' ? 'bg-amber-500 text-stone-950' : 'border border-stone-300'}`}>
                      {baseType === 'tradicional' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span>Mais pedido para combos</span>
                  </div>
                </div>

                {/* Especial 30cm Option */}
                <div
                  id="opt-base-especial"
                  onClick={() => setBaseType('especial')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    baseType === 'especial'
                      ? 'border-amber-500 bg-amber-50/50 shadow-md shadow-amber-500/10'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
                        Especial 30cm
                        <span className="text-[10px] bg-stone-900 text-amber-300 font-bold px-1.5 py-0.5 rounded">Gourmet</span>
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Para quem quer recheio livre e completo com máxima fartura de recheio.
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-base sm:text-lg font-black text-amber-700">
                        {formatCurrency(29.00)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${baseType === 'especial' ? 'bg-amber-500 text-stone-950' : 'border border-stone-300'}`}>
                      {baseType === 'especial' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span>Recheio ultra generoso</span>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Escolha as Proteínas */}
            <div id="builder-step-2" className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">2</span>
                  Escolha as Proteínas
                </label>
                <div className="text-xs text-stone-500">
                  Selecionadas: <strong className="text-stone-900 font-bold">{selectedProteins.length}</strong>
                  {baseType === 'tradicional' && (
                    <span> (Inclusas até {TRADICIONAL_MAX_INCLUDED_PROTEINS} no pacote base)</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_PROTEINS.map(protein => {
                  const isSelected = selectedProteins.includes(protein.id);
                  return (
                    <button
                      key={protein.id}
                      type="button"
                      id={`btn-protein-${protein.id}`}
                      onClick={() => handleToggleProtein(protein.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-stone-950 font-bold shadow-xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xs sm:text-sm leading-snug">{protein.name}</span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                        isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-400'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Escolha os Queijos e Complementos */}
            <div id="builder-step-3" className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">3</span>
                  Queijos & Complementos
                </label>
                <div className="text-xs text-stone-500">
                  Selecionados: <strong className="text-stone-900 font-bold">{selectedComplements.length}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {AVAILABLE_COMPLEMENTS.map(complement => {
                  const isSelected = selectedComplements.includes(complement.id);
                  return (
                    <button
                      key={complement.id}
                      type="button"
                      id={`btn-complement-${complement.id}`}
                      onClick={() => handleToggleComplement(complement.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-stone-950 font-bold shadow-xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xs sm:text-sm leading-snug">{complement.name}</span>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                        isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 text-stone-400'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Adicionais Extras */}
            <div id="builder-step-4" className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <label className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-black">4</span>
                  Adicionais Extras
                </label>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  + R$ 2,00 por ingrediente adicional
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'Dobro de Queijo Muçarela',
                  'Catupiry Extra no Recheio',
                  'Bacon Crocante Extra',
                  'Ovo Picado Extra',
                  'Batata Palha Crocante',
                  'Alho Frito Dourado'
                ].map(extra => {
                  const isSelected = extraAddons.includes(extra);
                  return (
                    <button
                      key={extra}
                      type="button"
                      onClick={() => handleToggleExtra(extra)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-100/60 text-stone-950 font-bold'
                          : 'border-dashed border-stone-300 bg-stone-50/50 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      <span className="text-xs">{extra}</span>
                      <span className="text-xs text-amber-800 font-extrabold shrink-0 ml-1">
                        {isSelected ? '✓ +R$2' : '+R$ 2'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes input */}
            <div className="pt-2">
              <label htmlFor="custom-notes" className="block text-xs font-semibold text-stone-600 mb-1">
                Observações do seu pastel (opcional):
              </label>
              <input
                id="custom-notes"
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Ex: sem cebola, catupiry bem espalhado, cortar ao meio..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-stone-800"
              />
            </div>

          </div>

          {/* RIGHT: Live 30cm Visualizer & Real-time Bill Summary (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-4">
            
            {/* 30cm Pastel Interactive Visual Graphic */}
            <div className="bg-stone-900 text-white rounded-3xl p-5 shadow-xl border border-stone-800 overflow-hidden relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Visualizador 30cm
                </span>
                <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {baseType === 'tradicional' ? 'Base Tradicional' : 'Base Especial'}
                </span>
              </div>

              {/* Graphic Representation of the 30cm Golden Crust */}
              <div className="relative py-4 my-2 px-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-2xl shadow-inner border border-amber-400/40 overflow-hidden text-stone-900">
                {/* 30cm ruler line */}
                <div className="absolute top-1 left-2 right-2 flex justify-between text-[9px] font-black text-amber-950/60 uppercase tracking-widest border-b border-amber-950/20 pb-0.5">
                  <span>0cm</span>
                  <span className="bg-amber-950/10 px-1 rounded">📏 30 CENTÍMETROS DE CROCÂNCIA</span>
                  <span>30cm</span>
                </div>

                {/* Simulated ingredients layers */}
                <div className="mt-3 flex flex-wrap gap-1.5 min-h-[48px] items-center justify-center p-2 bg-amber-400/30 backdrop-blur-xs rounded-xl border border-amber-300/40">
                  {proteinNames.length === 0 && complementNames.length === 0 ? (
                    <span className="text-xs font-medium text-amber-950 italic">
                      Selecione proteínas e queijos para rechear...
                    </span>
                  ) : (
                    <>
                      {proteinNames.map((name, i) => (
                        <span key={`vis-prot-${i}`} className="bg-amber-900 text-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          🥩 {name}
                        </span>
                      ))}
                      {complementNames.map((name, i) => (
                        <span key={`vis-comp-${i}`} className="bg-amber-100 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          🧀 {name}
                        </span>
                      ))}
                      {extraAddons.map((name, i) => (
                        <span key={`vis-extra-${i}`} className="bg-emerald-800 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          ✨ {name}
                        </span>
                      ))}
                    </>
                  )}
                </div>

                {/* Bottom crust texture */}
                <div className="mt-1 flex justify-center text-[10px] font-extrabold text-amber-950/80">
                  Massa Sequinha • Frito na Hora
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="mt-4 pt-3 border-t border-stone-800 space-y-2 text-xs text-stone-300">
                <div className="flex justify-between items-center">
                  <span>Base ({baseType === 'tradicional' ? 'Tradicional' : 'Especial 30cm'}):</span>
                  <span className="font-semibold text-white">{formatCurrency(BASE_PRICE)}</span>
                </div>

                {calculatedExtraCount > 0 && (
                  <div className="flex justify-between items-center text-amber-400">
                    <span>Adicionais ({calculatedExtraCount}x R$ 2,00):</span>
                    <span className="font-bold">+{formatCurrency(calculatedExtraCount * EXTRA_UNIT_PRICE)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm sm:text-base">
                  <span className="font-bold text-white">Valor do seu Pastel:</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-['Outfit']">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2.5">
                <button
                  id="btn-add-custom-pastel-to-cart"
                  onClick={handleAddCustomToCart}
                  className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar ao Pedido</span>
                </button>

                <button
                  id="btn-direct-custom-pastel-whatsapp"
                  onClick={handleDirectWhatsAppOrder}
                  className="w-full py-2.5 px-4 bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir direto no WhatsApp</span>
                </button>
              </div>

              {/* Reset button */}
              <button
                onClick={handleReset}
                className="mt-3 w-full text-center text-[11px] text-stone-400 hover:text-stone-200 flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Limpar montagem e recomeçar
              </button>

            </div>

            {/* Notification Toast when added */}
            {addedToast && (
              <div className="p-3 bg-emerald-900/90 text-emerald-100 rounded-2xl border border-emerald-700 flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Pastel de 30cm personalizado adicionado com sucesso ao seu carrinho!</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
