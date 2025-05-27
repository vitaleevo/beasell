import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AdminUser, ServicePackage, AdminStats } from '@/types/admin';
import { ContactSettings, ContactSubmission } from '@/types/contact';

interface AdminState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  services: ServicePackage[];
  stats: AdminStats;
  loading: boolean;
  contactSettings: ContactSettings | null;
  contactSubmissions: ContactSubmission[];
}

type AdminAction =
  | { type: 'LOGIN'; payload: AdminUser }
  | { type: 'LOGOUT' }
  | { type: 'SET_SERVICES'; payload: ServicePackage[] }
  | { type: 'UPDATE_SERVICE'; payload: ServicePackage }
  | { type: 'SET_STATS'; payload: AdminStats }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_CONTACT_SETTINGS'; payload: ContactSettings }
  | { type: 'ADD_CONTACT_SUBMISSION'; payload: ContactSubmission };

const initialState: AdminState = {
  user: null,
  isAuthenticated: false,
  services: [],
  stats: { totalPosts: 0, publishedPosts: 0, totalServices: 0, monthlyViews: 0 },
  loading: false,
  contactSettings: {
    emailDestination: 'info@beasell.ao',
    whatsappNumber: '+244926238518',
    businessHours: {
      weekdays: '8h00 - 17h00',
      saturday: '8h00 - 12h00',
      sunday: 'Fechado'
    },
    autoReplyMessage: 'Obrigado pelo seu contacto! Responderemos em breve.'
  },
  contactSubmissions: []
};

const mockServices: ServicePackage[] = [
  {
    id: '1',
    name: 'Formação Básica em Vendas',
    description: 'Curso fundamental para iniciantes em vendas',
    price: 150000,
    currency: 'AOA',
    duration: '2 semanas',
    features: ['Técnicas básicas', 'Atendimento ao cliente', 'Certificado'],
    category: 'individual',
  },
  {
    id: '2',
    name: 'Vendas Avançadas',
    description: 'Para profissionais com experiência',
    price: 250000,
    currency: 'AOA',
    duration: '1 mês',
    features: ['Técnicas avançadas', 'Negociação', 'Gestão de território'],
    popular: true,
    category: 'individual',
  },
  {
    id: '3',
    name: 'Formação Empresarial',
    description: 'Capacitação para equipas',
    price: 500000,
    currency: 'AOA',
    duration: '2 meses',
    features: ['Formação in-company', 'Material personalizado', 'Follow-up'],
    category: 'empresarial',
  },
];

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload.id ? action.payload : service
        ),
      };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'UPDATE_CONTACT_SETTINGS':
      return { ...state, contactSettings: action.payload };
    case 'ADD_CONTACT_SUBMISSION':
      return { 
        ...state, 
        contactSubmissions: [action.payload, ...state.contactSubmissions] 
      };
    default:
      return state;
  }
};

const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
} | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    // Check for saved authentication
    const savedUser = localStorage.getItem('beasell-admin-user');
    if (savedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(savedUser) });
    }

    // Load services
    const savedServices = localStorage.getItem('beasell-services');
    if (savedServices) {
      dispatch({ type: 'SET_SERVICES', payload: JSON.parse(savedServices) });
    } else {
      dispatch({ type: 'SET_SERVICES', payload: mockServices });
    }
  }, []);

  useEffect(() => {
    // Save services to localStorage
    localStorage.setItem('beasell-services', JSON.stringify(state.services));
  }, [state.services]);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
