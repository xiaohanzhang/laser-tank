import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export interface UIState {
    renderInterval: number,
    animation: boolean,
};

const initialState: UIState = {
    renderInterval: 100,
    animation: true,
};

const uiSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setRenderInterval(state, action: PayloadAction<number>) {
            const interval = action.payload;
            const max_interval = 10 * 1000;
            if (interval >= 0 && interval <= max_interval) {
                state.renderInterval = interval;
            }
        },
        toggleAnimation(state) {
            state.animation = !state.animation;
        },
    },
});

export default uiSlice;
