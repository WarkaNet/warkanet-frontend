// Environment configuration helper
export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    merchantId: import.meta.env.VITE_MERCHANT_ID || 'default-merchant-id',
};
