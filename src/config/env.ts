export const API_URL = import.meta.env.VITE_API_URL as string ?? 'http://localhost:5000';
export const IS_PRODUCTION = import.meta.env.MODE === 'production';
