import { create } from "zustand";
import {
  createPostApi,
  deletePostApi,
  getPostApi,
  updatePostApi,
} from "../api/post";

const usePostStore = create((set) => ({
  posts: [],
  post: null,
  actionFetchPost: async (userId) => {
    try {
      const res = await getPostApi(userId);
      console.log("res", res);
      set({ posts: res.data.posts });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  actionCreatePost: async (userId, input) => {
    try {
      const res = await createPostApi(userId, input);
      set((state) => ({ posts: [...state.posts, res.data.post] }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  actionUpdatePost: async (userId, input) => {
    console.log("input", input);
    try {
      const res = await updatePostApi(userId, input);
      console.log("res actionUpdatePost", res);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === input.id ? { ...post, ...res.data.updatePost } : post
        ),
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  actionDeletePost: async (userId, postId) => {
    try {
      await deletePostApi(userId, postId);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

export default usePostStore;
