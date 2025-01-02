import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ArticleState {
  id: string;
}

const initialState: ArticleState = {
  id: "",
}

const ArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setSelectedArticleId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    }
  },
})

export const { setSelectedArticleId } = ArticleSlice.actions

export default ArticleSlice.reducer
