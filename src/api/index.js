import axios from 'axios';
const url = process.env.REACT_APP_SERVER_URL;
const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('profile'))?.token;
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export const getPostBySearch = async (searchQuery) =>
  await API(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPosts = async (page) => await API(`/posts?page=${page}`);
export const fetchPost = async (id) => await API(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const siginin = (user) => API.post('/auth/user/signin', user);
export const comment = (value, id) =>
  API.post(`/posts/${id}/comments`, { value });
