import axios from "axios";

const BASE_URL = "https://api-post-ts.onrender.com/api/v1";

export const createPostApi = async (userId, input) => {
  return await axios.post(`${BASE_URL}/posts/${userId}`, input);
};

export const getPostApi = async (userId) => {
  return await axios.get(`${BASE_URL}/posts/${userId}`);
};

export const updatePostApi = async (userId, input) => {
  return await axios.put(`${BASE_URL}/posts/${userId}`, input);
};

export const deletePostApi = async (userId, postId) => {
  return await axios.delete(`${BASE_URL}/posts/${userId}/${postId}`);
};
