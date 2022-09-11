import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    status: "all",
    colors: []
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
        state.status = action.payload;
    },

    updateColors: (state, action) => {
        const { color, updateType } = action.payload;
        switch (updateType) {
            case "added":
                state.colors.push(color);
                break;

            case "removed":
                const findIndex = state.colors.indexOf(color);
                if (findIndex > -1) {
                    state.colors.splice(findIndex, 1);
                };
                break;

            default:
                break;
        };
    },
  },
});

export const { updateStatus, updateColors } = filtersSlice.actions;
export default filtersSlice.reducer;