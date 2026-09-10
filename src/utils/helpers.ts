import { STORE_INFO } from '../data/menuData';
import { CartItem } from '../types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function isStoreOpen(): { isOpen: boolean; message: string; nextOpenText: string } {
  // Opening hours: Tuesday to Sunday from 17:00 to 23:00 (Monday closed)
  const now = new Date();
  // Get time in Brazil standard time (UTC-3)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const brDate = new Date(utc + (3600000 * -3));
  
  const day = brDate.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, ..., 6 = Saturday
  const hours = brDate.getHours();
  const minutes = brDate.getMinutes();
  const currentDecimalTime = hours + minutes / 60;

  // Monday is closed (day === 1)
  if (day === 1) {
    return {
      isOpen: false,
      message: 'Fechado hoje (Segunda-feira)',
      nextOpenText: 'Abre terça-feira às 17h00'
    };
  }

  // Tuesday to Sunday: 17:00 (17.0) to 23:00 (23.0)
  if (currentDecimalTime >= 17 && currentDecimalTime < 23) {
    return {
      isOpen: true,
      message: 'Aberto agora',
      nextOpenText: 'Fecha às 23h00'
    };
  } else if (currentDecimalTime < 17) {
    return {
      isOpen: false,
      message: 'Fechado no momento',
      nextOpenText: `Abre hoje às 17h00`
    };
  } else {
    // After 23h
    const nextDayName = day === 0 ? 'terça-feira' : 'amanhã';
    return {
      isOpen: false,
      message: 'Fechado no momento',
      nextOpenText: `Abre ${nextDayName} às 17h00`
    };
  }
}

export interface CustomerOrderData {
  name: string;
  phone: string;
  orderType: 'delivery' | 'retirada';
  address: string;
  referencePoint?: string;
  paymentMethod: 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';
  changeFor?: string;
  notes?: string;
}

export function generateWhatsAppOrderUrl(items: CartItem[], customer: CustomerOrderData, deliveryFee: number = 0): string {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + (customer.orderType === 'delivery' ? deliveryFee : 0);

  let text = `🥟 *NOVO PEDIDO - PASTEL PAULISTA NA PRAIA*\n`;
  text += `📍 *Praia do Francês - Marechal Deodoro/AL*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  text += `👤 *Cliente:* ${customer.name || 'Cliente'}\n`;
  if (customer.phone) {
    text += `📱 *Telefone:* ${customer.phone}\n`;
  }
  text += `🛵 *Tipo:* ${customer.orderType === 'delivery' ? 'Entrega (Delivery)' : 'Retirada no Balcão'}\n`;

  if (customer.orderType === 'delivery') {
    text += `🏠 *Endereço:* ${customer.address || 'Não informado'}\n`;
    if (customer.referencePoint) {
      text += `📍 *Ponto de Ref.:* ${customer.referencePoint}\n`;
    }
  }

  text += `\n🛒 *ITENS DO PEDIDO:*\n`;

  items.forEach((item, index) => {
    text += `\n*${item.quantity}x ${item.name}* — ${formatCurrency(item.price * item.quantity)}\n`;

    if (item.isCustomPastel && item.customDetails) {
      text += `   • *Base:* ${item.customDetails.baseType === 'tradicional' ? 'Tradicional (30cm)' : 'Especial Completo (30cm)'}\n`;
      if (item.customDetails.proteins.length > 0) {
        text += `   • *Proteínas:* ${item.customDetails.proteins.join(', ')}\n`;
      }
      if (item.customDetails.complements.length > 0) {
        text += `   • *Queijos e Complementos:* ${item.customDetails.complements.join(', ')}\n`;
      }
      if (item.customDetails.extraIngredients.length > 0) {
        text += `   • *Extras:* ${item.customDetails.extraIngredients.join(', ')}\n`;
      }
    }

    if (item.selectedSize) {
      text += `   • *Opção:* ${item.selectedSize}\n`;
    }

    if (item.notes) {
      text += `   • *Obs:* ${item.notes}\n`;
    }
  });

  text += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💵 *Subtotal:* ${formatCurrency(subtotal)}\n`;
  if (customer.orderType === 'delivery') {
    text += `🛵 *Taxa de Entrega:* ${deliveryFee > 0 ? formatCurrency(deliveryFee) : 'A calcular / Grátis na região'}\n`;
  }
  text += `💰 *TOTAL A PAGAR:* ${formatCurrency(total)}\n`;

  const paymentMap = {
    pix: 'Pix',
    cartao_credito: 'Cartão de Crédito',
    cartao_debito: 'Cartão de Débito',
    dinheiro: `Dinheiro${customer.changeFor ? ` (Troco para ${customer.changeFor})` : ''}`,
  };

  text += `💳 *Forma de Pagamento:* ${paymentMap[customer.paymentMethod]}\n`;

  if (customer.notes) {
    text += `📝 *Observações Gerais:* ${customer.notes}\n`;
  }

  text += `\n_Pedido gerado pelo Cardápio Digital Pastel Paulista na Praia_ ✨`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${STORE_INFO.rawPhone}?text=${encoded}`;
}
