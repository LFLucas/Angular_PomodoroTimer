import { PomodoroTimerState } from "./pomodoro-timer-state.interface"
import { RawTimer, Timer } from "./services/timer-service/timer.interface"
import { Duration } from 'luxon'


export const initialTimerState : Timer = {
    workTime: Duration.fromObject({ minutes:30 }),
    shortBreakTime: Duration.fromObject({ minutes: 5 }),
    longBreakTime: Duration.fromObject({ minutes: 15 }),
    cycles: 1,
} 

export const rawInitialTimerState: RawTimer = {
    workTime: 30,
    shortBreakTime: 5,
    longBreakTime: 15,
    cycles: 1,
} 

export const AppState: PomodoroTimerState = {  
    timerState: initialTimerState
}
