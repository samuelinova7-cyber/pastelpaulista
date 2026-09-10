import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, MapPin, CreditCard, Banknote, QrCode, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/menuData';
import { formatCurrency, generateWhatsAppOrderUrl, CustomerOrderData } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu,
}) => {
  const [customerData, setCustomerData] = useState<CustomerOrderData>({
    name: '',
    phone: '',
    orderType: 'delivery',
    address: '',
    referencePoint: '',
    paymentMethod: 'pix',
    changeFor: '',
    notes: '',
  });

  const [step, setStep] = useState<'items' | 'checkout'>('items');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryFee = customerData.orderType === 'delivery' ? 0.00 : 0; // standard / free local
  const grandTotal = subtotal + deliveryFee;

  const handleSendToWhatsApp = () => {
    if (items.length === 0) return;

    if (customerData.orderType === 'delivery' && !customerData.address.trim()) {
      alert('Por favor, informe o endereço de entrega ou o nome da pousada na Praia do Francês!');
      return;
    }

    const url = generateWhatsAppOrderUrl(items, customerData, deliveryFee);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-['Outfit']">Seu Pedido</h3>
                <p className="text-[11px] text-stone-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} no carrinho
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-3xl">
                  🥟
                </div>
                <h4 className="text-lg font-bold text-stone-800 font-['Outfit']">Seu carrinho está vazio</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Que tal montar seu pastel de 30cm recheado de ponta a ponta ou experimentar um combo com caldo de cana?
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMenu();
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-all shadow-md"
                >
                  Explorar o Cardápio
                </button>
              </div>
            ) : (
              <>
                {/* Step Switcher if multiple items */}
                <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-600">
                  <button
                    onClick={() => setStep('items')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      step === 'items' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                    }`}
                  >
                    1. Itens ({totalItemsCount})
                  </button>
                  <button
                    onClick={() => setStep('checkout')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      step === 'checkout' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                    }`}
                  >
                    2. Dados & Entrega
                  </button>
                </div>

                {step === 'items' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                      <span>Itens Selecionados</span>
                      <button
                        onClick={onClearCart}
                        className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Esvaziar
                      </button>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col gap-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                                {item.name}
                              </h5>
                              
                              {/* Custom pastel details */}
                              {item.isCustomPastel && item.customDetails && (
                                <div className="mt-1 text-[11px] text-stone-600 space-y-0.5 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                                  {item.customDetails.proteins.length > 0 && (
                                    <p>🥩 <strong>Proteínas:</strong> {item.customDetails.proteins.join(', ')}</p>
                                  )}
                                  {item.customDetails.complements.length > 0 && (
                                    <p>🧀 <strong>Queijos:</strong> {item.customDetails.complements.join(', ')}</p>
                                  )}
                                  {item.customDetails.extraIngredients.length > 0 && (
                                    <p>✨ <strong>Extras:</strong> {item.customDetails.extraIngredients.join(', ')}</p>
                                  )}
                                </div>
                              )}

                              {item.selectedSize && (
                                <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
                                  Tamanho: {item.selectedSize}
                                </p>
                              )}

                              {item.notes && (
                                <p className="text-[11px] text-stone-500 italic mt-0.5">
                                  Obs: {item.notes}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                              title="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-stone-200">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded-md hover:bg-stone-100 flex items-center justify-center text-stone-600 font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-stone-900 w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded-md hover:bg-stone-100 flex items-center justify-center text-stone-600 font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Item total price */}
                            <span className="text-xs sm:text-sm font-black text-stone-900 font-['Outfit']">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all mt-4"
                    >
                      <span>Avançar para Dados de Entrega</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Step 2: Checkout / Delivery Form */
                  <div className="space-y-4">
                    {/* Order Type Toggle */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Tipo de Pedido:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCustomerData(prev => ({ ...prev, orderType: 'delivery' }))}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                            customerData.orderType === 'delivery'
                              ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <span>🛵 Entrega (Delivery)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomerData(prev => ({ ...prev, orderType: 'retirada' }))}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                            customerData.orderType === 'retirada'
                              ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <span>🏪 Retirada no Balcão</span>
                        </button>
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div>
                      <label htmlFor="customer-name" className="block text-xs font-bold text-stone-700 mb-1">
                        Seu Nome:
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        value={customerData.name}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Samuel Silva"
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-800"
                      />
                    </div>

                    {/* Customer Phone */}
                    <div>
                      <label htmlFor="customer-phone" className="block text-xs font-bold text-stone-700 mb-1">
                        WhatsApp / Telefone para contato:
                      </label>
                      <input
                        id="customer-phone"
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Ex: (82) 99999-9999"
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-800"
                      />
                    </div>

                    {/* Delivery Address if delivery */}
                    {customerData.orderType === 'delivery' && (
                      <div className="space-y-3 p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/60">
                        <div>
                          <label htmlFor="delivery-address" className="block text-xs font-bold text-stone-800 mb-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            Endereço de Entrega / Pousada:
                          </label>
                          <input
                            id="delivery-address"
                            type="text"
                            value={customerData.address}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Ex: Rua das Conchas, 120 ou Pousada Maresia, Quarto 4"
                            className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800"
                          />
                        </div>

                        <div>
                          <label htmlFor="delivery-ref" className="block text-xs font-semibold text-stone-600 mb-1">
                            Ponto de Referência (Praia do Francês):
                          </label>
                          <input
                            id="delivery-ref"
                            type="text"
                            value={customerData.referencePoint}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, referencePoint: e.target.value }))}
                            placeholder="Ex: Próximo à praça de eventos / em frente à padaria"
                            className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800"
                          />
                        </div>
                      </div>
                    )}

                    {/* Payment Method */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Forma de Pagamento:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'pix', label: 'Pix', icon: <QrCode className="w-3.5 h-3.5" /> },
                          { id: 'cartao_credito', label: 'Cartão Crédito', icon: <CreditCard className="w-3.5 h-3.5" /> },
                          { id: 'cartao_debito', label: 'Cartão Débito', icon: <CreditCard className="w-3.5 h-3.5" /> },
                          { id: 'dinheiro', label: 'Dinheiro', icon: <Banknote className="w-3.5 h-3.5" /> },
                        ].map((pay) => (
                          <button
                            key={pay.id}
                            type="button"
                            onClick={() => setCustomerData(prev => ({ ...prev, paymentMethod: pay.id as any }))}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-1.5 ${
                              customerData.paymentMethod === pay.id
                                ? 'bg-stone-900 text-amber-400 border-stone-900 shadow-xs'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {pay.icon}
                            <span>{pay.label}</span>
                          </button>
                        ))}
                      </div>

                      {customerData.paymentMethod === 'dinheiro' && (
                        <div className="mt-2.5">
                          <label htmlFor="change-for" className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Precisa de troco para quanto?
                          </label>
                          <input
                            id="change-for"
                            type="text"
                            value={customerData.changeFor}
                            onChange={(e) => setCustomerData(prev => ({ ...prev, changeFor: e.target.value }))}
                            placeholder="Ex: Troco para R$ 50,00"
                            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                          />
                        </div>
                      )}
                    </div>

                    {/* General order notes */}
                    <div>
                      <label htmlFor="general-notes" className="block text-xs font-semibold text-stone-600 mb-1">
                        Observações gerais para o restaurante:
                      </label>
                      <input
                        id="general-notes"
                        type="text"
                        value={customerData.notes}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Ex: caldo de cana com limão / enviar sachês de pimenta"
                        className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Final WhatsApp CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-stone-900">{formatCurrency(subtotal)}</span>
                </div>
                {customerData.orderType === 'delivery' && (
                  <div className="flex justify-between text-stone-500">
                    <span>Taxa de Entrega:</span>
                    <span className="font-semibold text-emerald-700">A calcular / Grátis na região</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-black text-stone-950 pt-1 border-t border-stone-200">
                  <span>Total:</span>
                  <span className="text-xl font-black text-amber-600 font-['Outfit']">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp submit button */}
              <button
                id="btn-submit-cart-whatsapp"
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg shadow-emerald-700/25 active:scale-98 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enviar Pedido para o WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Atendimento direto pelo WhatsApp oficial {STORE_INFO.phone}</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
