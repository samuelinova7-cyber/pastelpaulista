import { MenuItem, ProteinOption, ComplementOption, InstagramPost, GoogleReview } from '../types';

export const STORE_INFO = {
  name: 'Pastel Paulista na Praia',
  tagline: 'O autêntico pastel paulista de 30cm no paraíso de Alagoas',
  address: 'R. Maresia, 381 - Praia do Francês, Marechal Deodoro - AL, 57160-000',
  shortAddress: 'R. Maresia, 381 - Praia do Francês, AL',
  phone: '(82) 98815-5970',
  rawPhone: '5582988155970',
  instagram: '@pastelpaulistanapraia',
  instagramUrl: 'https://instagram.com/pastelpaulistanapraia',
  ifoodUrl: 'https://www.ifood.com.br/delivery/marechal-deodoro-al/pastel-paulista-na-praia',
  mapsUrl: 'https://maps.google.com/?q=Pastel+Paulista+na+Praia+R.+Maresia,+381+-+Praia+do+Franc%C3%AAs,+Marechal+Deodoro+-+AL,+57160-000',
  wazeUrl: 'https://waze.com/ul?q=R.+Maresia,+381+-+Praia+do+Franc%C3%AAs,+Marechal+Deodoro+-+AL',
  rating: 4.5,
  reviewCount: 44,
  followers: '+20.9k',
  openingHours: 'Terça a Domingo: 17:00 às 23:00',
  closedDays: 'Segunda-feira fechado',
  deliveryTime: '30 - 50 min',
  sizeHighlights: '30cm de crocância e recheio de ponta a ponta',
};

export const AVAILABLE_PROTEINS: ProteinOption[] = [
  { id: 'bacon', name: 'Bacon Crocante' },
  { id: 'carne-moida', name: 'Carne Moída Especial' },
  { id: 'carne-de-sol', name: 'Carne de Sol Desfiada' },
  { id: 'frango', name: 'Frango Desfiado Temperado' },
  { id: 'presunto', name: 'Presunto Fatiado' },
  { id: 'ovo', name: 'Ovo Picado' },
];

export const AVAILABLE_COMPLEMENTS: ComplementOption[] = [
  { id: 'mucarela', name: 'Queijo Muçarela', category: 'queijo' },
  { id: 'queijo-coalho', name: 'Queijo Coalho Grelhado', category: 'queijo' },
  { id: 'catupiry', name: 'Catupiry Original', category: 'queijo' },
  { id: 'tomate', name: 'Tomate Fresco', category: 'vegetal' },
  { id: 'azeitona', name: 'Azeitona Fatiada', category: 'vegetal' },
  { id: 'cebola', name: 'Cebola', category: 'vegetal' },
  { id: 'oregano', name: 'Orégano Selecionado', category: 'tempero' },
];

export const COMBOS_ITEMS: MenuItem[] = [
  {
    id: 'promo-paulista',
    name: 'Promoção do Paulista',
    category: 'combos',
    description: '1 Pastel Clássico (Carne ou Queijo) + 1 Caldo de Cana Geladinho (300ml). A combinação perfeita tradicional de feira com o clima da praia!',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    badge: 'Mais Vendido',
    popular: true,
    tags: ['Econômico', 'Combo Clássico', 'Feira na Praia']
  },
  {
    id: 'combo-1',
    name: 'Combo 1: Pastel 30cm + Refri',
    category: 'combos',
    description: '1 Monte Seu Pastel Tradicional (30cm com até 4 ingredientes, máx. 2 proteínas) + 1 Refrigerante Lata 350ml bem gelado.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    badge: 'Super Oferta',
    popular: true,
    tags: ['30cm', 'Completo', 'Personalizável']
  },
];

export const CLASSICOS_ITEMS: MenuItem[] = [
  {
    id: 'classico-carne',
    name: 'Pastel de Carne',
    category: 'classicos',
    description: 'Carne moída temperada no ponto ideal, azeitona fatiada e milho verde crocante.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    tags: ['Tradicional', 'Carne']
  },
  {
    id: 'classico-carne-queijo',
    name: 'Pastel de Carne e Queijo',
    category: 'classicos',
    description: 'Carne moída especial suculenta com generosa camada de muçarela derretida.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    badge: 'Favorito',
    popular: true,
    tags: ['Mais Pedido', 'Carne', 'Queijo']
  },
  {
    id: 'classico-carne-queijo-ovos',
    name: 'Pastel de Carne com Queijo + Ovos',
    category: 'classicos',
    description: 'Carne moída temperada, muçarela, ovo picado e azeitonas pretas.',
    price: 17.00,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    tags: ['Completo', 'Carne']
  },
  {
    id: 'classico-carne-sol',
    name: 'Pastel de Carne de Sol',
    category: 'classicos',
    description: 'Autêntica carne de sol desfiada artesanalmente, muçarela e tomate picado fresco.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    badge: 'Alagoano',
    popular: true,
    tags: ['Sabor Regional', 'Carne de Sol']
  },
  {
    id: 'classico-calabresa',
    name: 'Pastel de Calabresa',
    category: 'classicos',
    description: 'Calabresa moída/fatiada dourada com muçarela farta e orégano.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    tags: ['Calabresa', 'Queijo']
  },
  {
    id: 'classico-frango',
    name: 'Pastel de Frango com Queijo',
    category: 'classicos',
    description: 'Frango desfiado macio e bem temperadinho, queijo derretido e milho verde.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Frango', 'Cremoso']
  },
  {
    id: 'classico-misto',
    name: 'Pastel Misto',
    category: 'classicos',
    description: 'Dupla infalível: fatias de presunto de primeira com muita muçarela derretida.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    tags: ['Clássico', 'Kids']
  },
  {
    id: 'classico-queijo',
    name: 'Pastel de Queijo',
    category: 'classicos',
    description: 'Muçarela pura derretida, puxa-puxa inconfundível e massa crocante sequinha.',
    price: 13.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetariano', 'Simples & Perfeito']
  },
  {
    id: 'classico-pizza',
    name: 'Pastel de Pizza',
    category: 'classicos',
    description: 'Muçarela farta, presunto, tomate fresco fatiado, azeitonas e toque de orégano.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    tags: ['Pizza', 'Saboroso']
  },
];

export const ESPECIAIS_ITEMS: MenuItem[] = [
  {
    id: 'especial-carne',
    name: 'Carne Especial Paulista',
    category: 'especiais',
    description: 'Carne moída nobre, bacon crocante, ovos, muçarela derretida e azeitona.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
    badge: 'Gigante 30cm',
    popular: true,
    tags: ['Chef', 'Completo', 'Bacon']
  },
  {
    id: 'especial-costela',
    name: 'Pastel de Costela Desfiada',
    category: 'especiais',
    description: 'Costela bovina desfiada marinada lentamente, queijo, tomate, Catupiry original e toque de alho frito.',
    price: 23.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'Premium',
    popular: true,
    tags: ['Costela', 'Catupiry', 'Gourmet']
  },
  {
    id: 'especial-camarao',
    name: 'Pastel de Camarão & Catupiry',
    category: 'especiais',
    description: 'Camarões selecionados suculentos salteados na manteiga com cremoso Catupiry original.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    badge: 'Sabor da Praia',
    popular: true,
    tags: ['Frutos do Mar', 'Camarão', 'Praia do Francês']
  },
  {
    id: 'especial-frango',
    name: 'Frango Especial Paulista',
    category: 'especiais',
    description: 'Frango desfiado, muçarela, batata palha fininha e crocante, milho, Catupiry e pedaços de bacon.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    badge: 'Crocante',
    tags: ['Frango', 'Batata Palha', 'Bacon']
  },
];

export const DOCES_ITEMS: MenuItem[] = [
  {
    id: 'doce-cartola',
    name: 'Pastel Cartola',
    category: 'doces',
    description: 'Banana caramelizada, queijo derretido, açúcar e canela salpicada.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    badge: 'Tradição Nordestina',
    popular: true,
    tags: ['Doce Regional', 'Banana', 'Canela']
  },
  {
    id: 'doce-churros',
    name: 'Pastel de Churros',
    category: 'doces',
    description: 'Doce de leite cremoso artesanal, queijo e cobertura de canela com açúcar.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    tags: ['Doce de Leite', 'Crocante']
  },
  {
    id: 'doce-nutella',
    name: 'Pastel de Nutella & Leite em Pó',
    category: 'doces',
    description: 'Pura Nutella aveludada com generosa cobertura de leite em pó Ninho.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Queridinho',
    popular: true,
    tags: ['Nutella', 'Leite Ninho', 'Sobremesa']
  },
  {
    id: 'doce-galak',
    name: 'Pastel de Chocolate Galak',
    category: 'doces',
    description: 'Barra de chocolate branco Galak derretida na hora dentro da massa crocante.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    tags: ['Chocolate Branco', 'Galak']
  },
  {
    id: 'doce-triduo',
    name: 'Pastel Triduo Especial',
    category: 'doces',
    description: 'Exclusiva combinação doce em três camadas harmoniosas acompanhadas de farta Nutella.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusivo',
    tags: ['Especial', 'Nutella']
  },
];

export const BEBIDAS_ITEMS: MenuItem[] = [
  {
    id: 'bebida-caldo-cana',
    name: 'Caldo de Cana Fresquinho',
    category: 'bebidas',
    description: 'Moído na hora, puro e super gelado! O par clássico do melhor pastel.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    badge: 'Feito na Hora',
    popular: true,
    sizeOptions: [
      { label: 'Copo 300ml', size: '300ml', price: 5.00 },
      { label: 'Copo 550ml', size: '550ml', price: 8.00 },
      { label: 'Copo 770ml', size: '770ml', price: 11.00 },
    ],
    tags: ['Natural', 'Clássico da Feira', 'Refrescante']
  },
  {
    id: 'bebida-suco-laranja',
    name: 'Suco Natural de Laranja',
    category: 'bebidas',
    description: '100% natural, espremido na hora, sem conservantes e cheio de vitamina C.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    sizeOptions: [
      { label: 'Copo 300ml', size: '300ml', price: 8.00 },
      { label: 'Copo 550ml', size: '550ml', price: 11.00 },
      { label: 'Copo 770ml', size: '770ml', price: 14.00 },
      { label: 'Jarra 1 Litro', size: '1 Litro', price: 18.00 },
    ],
    tags: ['100% Fruta', 'Gelado']
  },
  {
    id: 'bebida-refrigerantes',
    name: 'Refrigerantes',
    category: 'bebidas',
    description: 'Coca-Cola, Guaraná Antarctica, Fanta, Sprite ou H2OH! bem trincando de gelados.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    sizeOptions: [
      { label: 'Lata 350ml (Coca / Guaraná / Zero)', size: 'Lata 350ml', price: 7.00 },
      { label: 'H2OH! Limão 500ml', size: 'H2OH! 500ml', price: 9.00 },
      { label: 'Garrafa 1 Litro', size: 'Garrafa 1L', price: 12.00 },
    ],
    tags: ['Refrigerante', 'Gelado']
  },
  {
    id: 'bebida-cervejas',
    name: 'Cervejas Geladas',
    category: 'bebidas',
    description: 'Amstel, Heineken e Eisenbahn no ponto certo para curtir a brisa da Praia do Francês.',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    sizeOptions: [
      { label: 'Amstel Lata 350ml', size: 'Amstel Lata 350ml', price: 8.00 },
      { label: 'Heineken Lata 350ml', size: 'Heineken Lata 350ml', price: 9.00 },
      { label: 'Long Neck Heineken / Eisenbahn', size: 'Long Neck', price: 13.00 },
    ],
    tags: ['Alcoólica', 'Praia', 'Trincando']
  },
  {
    id: 'bebida-agua',
    name: 'Água Mineral (500ml)',
    category: 'bebidas',
    description: 'Água mineral natural pura ou com gás bem gelada.',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    sizeOptions: [
      { label: 'Água sem gás 500ml', size: 'Sem Gás', price: 4.00 },
      { label: 'Água com gás 500ml', size: 'Com Gás', price: 4.00 },
    ],
    tags: ['Hidratação', 'Sem Açúcar']
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    caption: 'Aquele pastel de 30cm com recheio de ponta a ponta e massa super crocante! 🔥🥟 Já pediu o seu hoje na Praia do Francês? #PastelPaulista #PraiaDoFrances #Pastel30cm',
    likes: 1420,
    comments: 89,
    date: 'Há 2 dias',
    isReel: true,
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    caption: 'Caldo de cana moído na hora + pastel quentinho = o combo perfeito pós-praia 🌊🥤 Vem que a partir das 17h estamos a todo vapor!',
    likes: 980,
    comments: 42,
    date: 'Há 4 dias',
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    caption: 'Camarão fresco com Catupiry de verdade! O favorito de quem visita Marechal Deodoro 🦐💛 #PastelariaGourmet #Alagoas',
    likes: 2150,
    comments: 134,
    date: 'Há 6 dias',
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    caption: 'Para fechar a noite com chave de ouro: Pastel de Nutella com Leite Ninho! 🍫✨ Quem não resiste marca o @ aqui!',
    likes: 1840,
    comments: 95,
    date: 'Há 1 semana',
  },
  {
    id: 'post-5',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    caption: 'Costela desfiada que desmancha na boca com alho frito e queijo derretido. Já montou seu pastel de 30cm?',
    likes: 1620,
    comments: 77,
    date: 'Há 1 semana',
    isReel: true,
  },
  {
    id: 'post-6',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Pôr do sol incrível na Praia do Francês e a porta abrindo para matar a fome da galera! Terça a Domingo a partir das 17h. 🌅📍 R. Maresia, 381',
    likes: 2340,
    comments: 110,
    date: 'Há 2 semanas',
  },
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Rodrigo Mendonça',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 2 semanas',
    text: 'Simplesmente o melhor pastel de Alagoas! A massa é sequinha, crocante e o recheio é generoso de ponta a ponta. O de Carne com Queijo e o Especial de Costela são imperdíveis. Atendimento nota 10!',
    verifiedLocal: true
  },
  {
    id: 'rev-2',
    author: 'Camila Vasconcelos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 1 mês',
    text: 'A opção de montar seu pastel de 30cm é maravilhosa! Coloquei carne de sol, queijo coalho e bacon, ficou surreal. O caldo de cana é geladinho e puro. Virou parada obrigatória toda vez que vou ao Francês.',
    verifiedLocal: true
  },
  {
    id: 'rev-3',
    author: 'Lucas Silveira',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    rating: 4.5,
    date: 'Há 3 semanas',
    text: 'Pastel gigante de verdade! O de camarão com Catupiry tem camarão farto e fresco. Pedimos pelo WhatsApp para entregar na pousada e chegou super rápido e quentinho.',
    verifiedLocal: true
  },
  {
    id: 'rev-4',
    author: 'Juliana Pimentel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Há 1 mês',
    text: 'O pastel doce de Cartola e o de Nutella fecharam o dia perfeitamente! Lugar agradável na Rua Maresia, pertinho da praia. Recomendo demais!',
    verifiedLocal: true
  }
];

export const STORY_HIGHLIGHTS = [
  { id: 'h-1', title: 'Pastel 30cm', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
  { id: 'h-2', title: 'Caldo de Cana', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
  { id: 'h-3', title: 'Praia do Francês', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
  { id: 'h-4', title: 'Especiais', image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=300&q=80' },
  { id: 'h-5', title: 'Clientes', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=300&q=80' },
];
