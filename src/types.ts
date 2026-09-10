export type CategoryId = 
  | 'combos'
  | 'monte-seu'
  | 'classicos'
  | 'especiais'
  | 'doces'
  | 'bebidas';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number;
  image: string;
  badge?: string;
  popular?: boolean;
  sizeOptions?: { label: string; size: string; price: number }[];
  tags?: string[];
}

export interface ProteinOption {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface ComplementOption {
  id: string;
  name: string;
  category: 'queijo' | 'vegetal' | 'tempero';
}

export interface CustomPastelBuild {
  id: string;
  baseType: 'tradicional' | 'especial';
  basePrice: number;
  proteins: string[];
  complements: string[];
  extraIngredients: string[];
  notes?: string;
  totalPrice: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isCustomPastel?: boolean;
  customDetails?: {
    baseType: 'tradicional' | 'especial';
    proteins: string[];
    complements: string[];
    extraIngredients: string[];
  };
  selectedSize?: string;
  notes?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  isReel?: boolean;
}

export interface GoogleReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  verifiedLocal: boolean;
}
