import { PomodoroTimerState } from "./pomodoro-timer-state.interface"
import { Timer } from "./timer/timer.interface"
import { timerStatus } from "./timer/timer.status"
import { Duration } from 'luxon'


export const initialTimerState : Timer = {
    workTime: Duration.fromObject({ minutes:30 }),
    shortBreakTime: Duration.fromObject({ minutes: 5 }),
    longBreakTime: Duration.fromObject({ minutes: 15 }),
    cycles: 1,
    status: timerStatus.STOPPED
} 

export const AppState: PomodoroTimerState = {  
    timerState: initialTimerState
}
