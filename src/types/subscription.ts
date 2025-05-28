
export interface Subscription {
  id: string;
  studentId: string;
  planType: 'basico' | 'premium' | 'empresarial';
  status: 'ativo' | 'expirado' | 'suspenso' | 'cancelado';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string;
  amount: number;
  currency: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // em dias
  features: string[];
  maxCourses: number;
  supportLevel: 'basico' | 'premium' | 'vip';
}
