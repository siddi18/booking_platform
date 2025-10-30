import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
  category: string;
  minAge: number;
  includes: string;
  slots: Slot[];
}

export interface Slot {
  date: string;
  times: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: number;
  booked: number;
}

export interface Booking {
  experienceId: string;
  experienceName: string;
  fullName: string;
  email: string;
  date: string;
  time: string;
  quantity: number;
  promoCode?: string;
  discount: number;
  subtotal: number;
  taxes: number;
  total: number;
  bookingRef: string;
  status: string;
}

export interface PromoCode {
  valid: boolean;
  code: string;
  discount: number;
  type: string;
  value: number;
}

// Get all experiences with pagination and search
export const getExperiences = async (page = 1, limit = 9, search = '') => {
  const response = await api.get('/experiences', {
    params: { page, limit, search }
  });
  return response.data;
};

// Get single experience by ID
export const getExperience = async (id: string) => {
  const response = await api.get(`/experiences/${id}`);
  return response.data;
};

// Validate promo code
export const validatePromoCode = async (code: string, subtotal: number) => {
  const response = await api.post('/promo/validate', { code, subtotal });
  return response.data;
};

// Create booking
export const createBooking = async (bookingData: Partial<Booking>) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

// Get user bookings
export const getUserBookings = async (email: string) => {
  const response = await api.get(`/bookings/${email}`);
  return response.data;
};

export default api;
