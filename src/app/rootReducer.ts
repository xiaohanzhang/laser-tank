import { combineReducers } from '@reduxjs/toolkit'

import gameSlice from '../features/game/game';
import uiSlice from '../features/ui/ui';

const rootReducer = combineReducers({
    game: gameSlice.reducer,
    ui: uiSlice.reducer,
});


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
