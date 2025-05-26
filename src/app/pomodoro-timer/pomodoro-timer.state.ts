import { PomodoroTimerState } from "./pomodoro-timer-state.interface"
import { Timer } from "./timer/timer.interface"
import { timerStatus } from "./timer/timer.status"


export const initialTimerState : Timer = {
    workTime: 30,
    shortBreakTime: 5,
    longBreakTime: 15,
    cycles: 1,
    status: timerStatus.STOPPED
} 

export const AppState: PomodoroTimerState = {  
    timerState: initialTimerState
}
