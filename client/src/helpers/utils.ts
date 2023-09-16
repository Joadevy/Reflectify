export const isEmpty = <T extends object>(obj: T) => {
  return Object.keys(obj).length === 0;
};

export const getBackendURL = () => {
  if (import.meta.env.MODE === "production") {
    return import.meta.env.VITE_backendURL_PROD;
  }

  return import.meta.env.VITE_backendURL_DEV;
};
