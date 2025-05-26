import { createSelector } from "@ngrx/store";
import { PomodoroTimerState } from "../pomodoro-timer-state.interface";

export const selectTimerState = (state: PomodoroTimerState) => state.timerState;

export const selectTimer = createSelector(
    selectTimerState,
    (state) => state
)