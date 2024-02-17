const { MENU_ITEMS } = require("@/shared/constants");
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick(state, action) {
      state.activeMenuItem = action.payload;
    },
  },
});

const { actions, reducer } = menuSlice;

export const { menuItemClick } = actions;

export default reducer;
