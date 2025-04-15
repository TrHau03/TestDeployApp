import { createSlice } from '@reduxjs/toolkit';

interface ArticlesState {
  articles: any[];
  tagId: string[];
  categoryName: string[];
  authorName: string[];
  tagName: string[];
}

const initialState: ArticlesState = {
  articles: [],
  authorName: [],
  categoryName: [],
  tagId: [],
  tagName: [],
};

const articlesSLice = createSlice({
  name: 'articles',
  initialState: initialState,
  reducers: {
    updateAuthorName: (state, action) => {
      const authorName =
        state.authorName.findIndex((val) => val === action.payload) === -1 // payload is not in array yet
          ? [...state.authorName, action.payload]
          : state.authorName.filter((val) => val !== action.payload);
      return {
        ...state,
        authorName,
      };
    },
    updateCategoryName: (state, action) => {
      const categoryName =
        state.categoryName.findIndex((val) => val === action.payload) === -1 // payload is not in array yet
          ? [...state.categoryName, action.payload]
          : state.categoryName.filter((val) => val !== action.payload);
      return {
        ...state,
        categoryName,
      };
    },
    updateTagName: (state, action) => {
      const tagName =
        state.tagName.findIndex((val) => val === action.payload) === -1 // payload is not in array yet
          ? [...state.tagName, action.payload]
          : state.tagName.filter((val) => val !== action.payload);
      return {
        ...state,
        tagName,
      };
    },
    updateTagId: (state, action) => {
      const tagId =
        state.tagId.findIndex((val) => val === action.payload) === -1 // payload is not in array yet
          ? [...state.tagId, action.payload]
          : state.tagId.filter((val) => val !== action.payload);
      return {
        ...state,
        tagId,
      };
    },
  },
});

export const { updateAuthorName, updateCategoryName, updateTagId, updateTagName } = articlesSLice.actions;

export default articlesSLice.reducer;
