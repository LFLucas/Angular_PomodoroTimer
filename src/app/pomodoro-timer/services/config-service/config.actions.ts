import { createAction, props } from '@ngrx/store';
import { Timer } from '../timer-service/timer.interface';

export const resetConfigAction = createAction(
    '[Config Component] Reset Pomodoro Duration',
    props<{timer: Partial<Timer>}>()
)

export const setConfigAction = createAction(
    '[Config Component] Set Pomodoro Duration', 
    props<{timer: Partial<Timer>}>()
)