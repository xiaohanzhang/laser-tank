import { combineReducers } from '@reduxjs/toolkit'

import gameSlice from '../features/game/game';

const rootReducer = combineReducers({
    game: gameSlice.reducer,
});


export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
