import { createSlice, createSelector } from "@reduxjs/toolkit";
import { message as messageStorage } from "utils/storageManager";
import selectRoot from "./selector";

const initialState = messageStorage.getItem() || {
  draft: "",
  list: []
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    typingDraft: (state, action) => {
      state.draft = action.payload;
    },

    cleanDraft: state => {
      state.draft = "";
    },

    add: (state, action) => {
      const { id, text } = action.payload;
      state.list.push({
        id,
        text,
        unread: true,
        createTime: new Date().getTime()
      });
    },

    markRead: (state, action) => {
      const id = action.payload;

      state.list.forEach((item, i) => {
        if (item.id === id) {
          state.list[i].unread = false;
        }
      });
    },

    delMessage: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter(item => item.id !== id);
    },
    delMultipleMessages: (state, action) => {
      const ids = action.payload;

      ids.forEach(id => {
        state.list = state.list.filter(item => item.id !== id);
      });
    }
  }
});

export const {
  add,
  typingDraft,
  cleanDraft,
  markRead,
  delMultipleMessages
} = slice.actions;

export const selectMessage = createSelector(
  selectRoot,
  state => state.message || initialState
);

export const selectMessageDraft = createSelector(
  selectMessage,
  state => state.draft
);

export const selectMessageList = createSelector(
  selectMessage,
  state => state.list
);

export const selectUnreadMessageList = createSelector(
  selectMessageList,
  state => state.filter(({ unread }) => unread)
);

export const selectUnreadMessageCount = createSelector(
  selectUnreadMessageList,
  state => state.length
);

export default slice.reducer;
