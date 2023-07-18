import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  technology:[],
  posts: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setTech: (state, action) => {
      state.technology = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  }
});

export const {
  setProjects,
  setTech,
  setPosts
} = projectSlice.actions;

export default projectSlice.reducer;