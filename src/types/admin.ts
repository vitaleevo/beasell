
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  popular?: boolean;
  category: 'individual' | 'empresarial' | 'workshop' | 'consultoria';
}

export interface AdminStats {
  totalPosts: number;
  publishedPosts: number;
  totalServices: number;
  monthlyViews: number;
}
