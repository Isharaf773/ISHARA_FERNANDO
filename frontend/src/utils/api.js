export const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return '';
  }

  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const getApiUrl = (path) => `${getApiBaseUrl()}${path}`;
