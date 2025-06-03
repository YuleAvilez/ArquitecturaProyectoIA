const getApiUrl = () => {
  const env = import.meta.env.NODE_ENV;

  if (env === "development") {
    return "http://localhost:5000/docs";
  } else if (env === "production") {
    return "https://mi-api-en-produccion.com/docs";
  } else if (env === "test") {
    return "http://localhost:5000/docs";
  } else {
    return "http://localhost:5000";
  }
};

export const API_URL = getApiUrl();
