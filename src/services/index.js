import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://62d5368fd4406e5235558a46.mockapi.io",
  headers: {
    "Content-type": "application/json",
  },
});

export const getBanners = async () => {
  const { data } = await apiClient.get(`/banners`);
  return data;
};

export const getArticles = async (limit) => {
  const { data } = await apiClient.get(`/articles?page=1&limit=${limit}`);
  return data;
};

export const singleArticle = async (id) => {
  const { data } = await apiClient.get(`/articles/${id}`);
  return data;
};

export const deleteArticle = async (id) => {
  const { data } = await apiClient.delete(`/articles/${id}`);
  return data;
};

export const addArticle = async (obj) => {
  const { data } = await apiClient.post(`/articles`, obj);
  return data;
};
