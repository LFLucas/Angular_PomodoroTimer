import { createReducer, on } from '@ngrx/store';
import { resetConfigAction, setConfigAction } from './config.actions';
import { initialTimerState } from '../pomodoro-timer.state';

export const timerReducer = createReducer(
    initialTimerState,
    
    on(setConfigAction, (state, {timer}) => ({
        ...state,
        ...timer
    })),

    on(resetConfigAction, (state) => ({
        ...state,
        ...initialTimerState
    }))

)